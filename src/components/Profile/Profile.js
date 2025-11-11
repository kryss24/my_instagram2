import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../utils/client';
import { getUser, postsByOwnerAndCreatedAt } from '../../graphql/queries';
import { updateUser } from '../../graphql/mutations';
import PostGridItem from './PostGridItem';
import './Profile.css';

function Profile({ loggedInUser }) {
  const [viewedUser, setViewedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    preferred_username: '',
    name: '',
    bio: '',
    birthdate: '',
    gender: '',
    phone_number: '',
  });

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const userData = await client.graphql({ query: getUser, variables: { id: userId } });
        const user = userData.data.getUser;
        setViewedUser(user);
        setFormData({
          preferred_username: user.preferred_username || '',
          name: user.name || '',
          bio: user.bio || '',
          birthdate: user.birthdate || '',
          gender: user.gender || '',
          phone_number: user.phone_number || '',
        });

        if (user) {
          const postData = await client.graphql({ 
            query: postsByOwnerAndCreatedAt, 
            variables: { owner: user.id, sortDirection: 'DESC' } 
          });
          setPosts(postData.data.postsByOwnerAndCreatedAt.items);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const input = {
        id: viewedUser.id,
        ...formData
      };
      const result = await client.graphql({ 
        query: updateUser, 
        variables: { input }
      });
      setViewedUser(result.data.updateUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const isOwnProfile = loggedInUser?.id === viewedUser?.id;

  if (loading) return <p>Loading...</p>;
  if (!viewedUser) return <p>User not found.</p>;

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={viewedUser.avatar || '/default-avatar.png'} alt={`${viewedUser.preferred_username}'s avatar`} className="profile-avatar" />
        <div className="profile-info">
          {isEditing ? (
            <>
              <label>Username</label>
              <input type="text" name="preferred_username" value={formData.preferred_username} onChange={handleInputChange} className="profile-edit-input" />
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="profile-edit-input" />
            </>
          ) : (
            <>
              <h2>{viewedUser.preferred_username}</h2>
              <p className="profile-name">{viewedUser.name}</p>
            </>
          )}
          
          <div className="profile-stats">
            <span><b>{posts.length}</b> posts</span>
            <span><b>0</b> followers</span>
            <span><b>0</b> following</span>
          </div>

          {isEditing ? (
            <>
              <label>Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="profile-edit-textarea" />
              <label>Birthdate</label>
              <input type="date" name="birthdate" value={formData.birthdate} onChange={handleInputChange} className="profile-edit-input" />
              <label>Gender</label>
              <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} className="profile-edit-input" />
              <label>Phone</label>
              <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleInputChange} className="profile-edit-input" />
            </>
          ) : (
            <p>{viewedUser.bio}</p>
          )}

          {isOwnProfile && (
            <div className="profile-edit-buttons">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="profile-button">Save</button>
                  <button onClick={() => setIsEditing(false)} className="profile-button secondary">Cancel</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="profile-button">Edit Profile</button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="profile-posts-grid">
        {posts.map(post => (
          <PostGridItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
