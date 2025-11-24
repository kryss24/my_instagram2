import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { updateUser, updatePost } from '../../graphql/mutations';
import { listPosts } from '../../graphql/queries';
import { uploadData } from 'aws-amplify/storage';
import { fetchAuthSession } from '@aws-amplify/auth';
import './EditProfile.css';

const client = generateClient();

function EditProfile({ user, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    preferred_username: user.preferred_username || '',
    bio: user.bio || '',
    gender: user.gender || '',
    phone_number: user.phone_number || '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accountType, setAccountType] = useState(user.accountType || 'public');
  const [syncingPosts, setSyncingPosts] = useState(false); // Nouveau state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Upload avatar si nécessaire
      let avatarKey = user.avatar;
      if (avatarFile) {
        const { identityId } = await fetchAuthSession();
        if (!identityId) {
          throw new Error("User is not authenticated.");
        }
        const sanitizedName = avatarFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const fileName = `${Date.now()}-${sanitizedName}`;
        const path = `public/${identityId}/avatars/${fileName}`;
        
        const uploadResult = await uploadData({
          path: path,
          data: avatarFile,
        }).result;
        avatarKey = uploadResult.path;
      }

      // 2. Vérifier si accountType a changé
      const accountTypeChanged = accountType !== user.accountType;
    
      if (accountTypeChanged) {
        const confirmMessage = `Switching to a ${accountType} account will update all your posts. Continue?`;
        if (!window.confirm(confirmMessage)) {
          setLoading(false);
          return;
        }
      }

      // 3. Mettre à jour l'utilisateur
      const updateInput = {
        input: {
          id: user.id,
          username: user.username,
          accountType: accountType,
          ...formData,
          avatar: avatarKey,
        }
      };

      const response = await client.graphql({
        query: updateUser,
        variables: updateInput
      });

      // 4. Si accountType a changé, synchroniser tous les posts
      if (accountTypeChanged && response.data?.updateUser) {
        setSyncingPosts(true);
        await syncAllPostsPrivacy(user, accountType); // ← Passez l'objet user complet
      }

      if (response.data?.updateUser) {
        onUpdate(response.data.updateUser);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
      setSyncingPosts(false);
    }
  };

  // Nouvelle fonction pour synchroniser les posts
const syncAllPostsPrivacy = async (user, newAccountType) => {
  try {
    // Utilisez le bon identifiant - essayez preferred_username en premier
    const userIdentifier = user.preferred_username || user.username;
    
    console.log(`Syncing posts for user:`, {
      username: user.username,
      preferred_username: user.preferred_username,
      using: userIdentifier
    });
    
    // Récupérer tous les posts de l'utilisateur
    const postsResult = await client.graphql({
      query: listPosts,
      variables: {
        filter: { userId: { eq: userIdentifier } }
      }
    });

    const posts = postsResult.data.listPosts.items;
    console.log(`Found ${posts.length} posts:`, posts);

    if (posts.length === 0) {
      console.warn('No posts found. Check if userId in posts matches:', userIdentifier);
      return;
    }

    const isPublic = newAccountType === 'public';
    console.log(`Updating posts to isPublic=${isPublic}`);

    // Mettre à jour tous les posts en parallèle
    const updatePromises = posts.map(post => {
      console.log(`Updating post ${post.id} to isPublic=${isPublic}`);
      return client.graphql({
        query: updatePost,
        variables: {
          input: {
            id: post.id,
            isPublic: isPublic
          }
        }
      });
    });

    await Promise.all(updatePromises);
    
    console.log(`Successfully updated ${posts.length} posts to isPublic=${isPublic}`);
  } catch (error) {
    console.error('Error syncing posts:', error);
    throw new Error('Failed to sync posts with new privacy setting');
  }
};
  return (
    <div className="edit-profile">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferred_username">Username</label>
          <input
            type="text"
            id="preferred_username"
            name="preferred_username"
            value={formData.preferred_username}
            onChange={handleChange}
            placeholder="Enter your display username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>Account Privacy</label>
          <div className="account-type-selector">
            <label className={`account-type-option ${accountType === 'public' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="accountType"
                value="public"
                checked={accountType === 'public'}
                onChange={(e) => setAccountType(e.target.value)}
                disabled={loading}
              />
              <div className="account-type-content">
                <span className="account-type-icon">🌐</span>
                <div>
                  <strong>Public Account</strong>
                  <p>Anyone can see your posts</p>
                </div>
              </div>
            </label>

            <label className={`account-type-option ${accountType === 'private' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="accountType"
                value="private"
                checked={accountType === 'private'}
                onChange={(e) => setAccountType(e.target.value)}
                disabled={loading}
              />
              <div className="account-type-content">
                <span className="account-type-icon">🔒</span>
                <div>
                  <strong>Private Account</strong>
                  <p>Only your followers can see your posts</p>
                </div>
              </div>
            </label>
          </div>
          
          {/* Message d'information si le type change */}
          {accountType !== user.accountType && (
            <p className="account-type-warning">
              ⚠️ Changing to {accountType} will update all your existing posts
            </p>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Indicateur de synchronisation */}
        {syncingPosts && (
          <div className="syncing-message">
            <div className="spinner"></div>
            <p>Syncing posts with new privacy setting...</p>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading || syncingPosts}>
            {loading ? 'Saving...' : syncingPosts ? 'Syncing Posts...' : 'Save Changes'}
          </button>
          <button type="button" onClick={onCancel} disabled={loading || syncingPosts}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;