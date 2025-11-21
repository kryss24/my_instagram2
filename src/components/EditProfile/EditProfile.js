import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { updateUser } from '../../graphql/mutations';
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
    accountType: user.accountType || 'public'
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      let avatarKey = user.avatar;
      if (avatarFile) {
        const { identityId } = await fetchAuthSession();
        if (!identityId) {
            throw new Error("User is not authenticated.");
        }
        const sanitizedName = avatarFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const fileName = `${Date.now()}-${sanitizedName}`;
        // The path should be relative to the access level, 'protected/{identityId}/' is added by Amplify
        const path = `${identityId}/avatars/${fileName}`;
        
        const uploadResult = await uploadData({
          path: path,
          data: avatarFile,
          options: {
            accessLevel: 'protected', // Specify the access level
          },
        }).result;
        avatarKey = uploadResult.path;
      }

      const updateInput = {
        input: {
          id: user.id,
          username: user.username, // required field
          ...formData,
          avatar: avatarKey,
        }
      };

      const response = await client.graphql({
        query: updateUser,
        variables: updateInput
      });

      if (response.data?.updateUser) {
        onUpdate(response.data.updateUser);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
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
          <label htmlFor="accountType">Account Type</label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;