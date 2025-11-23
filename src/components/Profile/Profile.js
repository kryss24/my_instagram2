import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../utils/client';
import { getUserWithFollows } from '../../graphql/custom-queries';
import { createFollow, deleteFollow, updateUser } from '../../graphql/mutations';
import { getUrl } from 'aws-amplify/storage';
import PostGridItem from './PostGridItem';
import './Profile.css';

function Profile({ loggedInUser }) {
  const [viewedUser, setViewedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [formData, setFormData] = useState({
    preferred_username: '',
    name: '',
    bio: '',
    birthdate: '',
    gender: '',
    phone_number: '',
  });

  const { userId } = useParams();

  console.log(loggedInUser);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const userData = await client.graphql({ query: getUserWithFollows, variables: { username: userId } });
        const user = userData.data.getUser;
        setViewedUser(user);
        
        if (user) {
          if (user.avatar) {
            let avatarPath = user.avatar;
            if (!avatarPath.startsWith('public/')) {
            avatarPath = `public/${avatarPath}`;
          }
            const url = await getUrl({ key: avatarPath });
            setAvatarUrl(url.url.toString());
          }

          setPosts(user.posts.items);
          const followersList = user.followers.items;
          const followingList = user.following.items;
          setFollowers(followersList);
          setFollowing(followingList);

          // Check if loggedInUser is following viewedUser
          const followRelationship = followersList.find(
            (follow) => follow.follower.username === loggedInUser?.username
          );

          if (followRelationship) {
            setIsFollowing(true);
            setFollowId(followRelationship.id);
          } else {
            setIsFollowing(false);
            setFollowId(null);
          }

          setFormData({
            preferred_username: user.preferred_username || '',
            name: user.name || '',
            bio: user.bio || '',
            birthdate: user.birthdate || '',
            gender: user.gender || '',
            phone_number: user.phone_number || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, loggedInUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const input = {
        username: viewedUser.username,
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

  const handleFollow = async () => {
    try {
      const input = {
        followerId: loggedInUser.username,
        followedId: viewedUser.username,
      };
      const result = await client.graphql({
        query: createFollow,
        variables: { input },
      });
      setIsFollowing(true);
      setFollowId(result.data.createFollow.id);
      setFollowers([...followers, { id: result.data.createFollow.id, follower: loggedInUser }]); // Optimistic update
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await client.graphql({
        query: deleteFollow,
        variables: { input: { id: followId } },
      });
      setIsFollowing(false);
      setFollowId(null);
      setFollowers(followers.filter(f => f.follower.username !== loggedInUser.username)); // Optimistic update
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const isOwnProfile = loggedInUser?.username === viewedUser?.username;

  if (loading) return <p>Loading...</p>;
  if (!viewedUser) return <p>User not found.</p>;

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={avatarUrl || '/default-avatar.png'} alt={`${viewedUser.preferred_username}'s avatar`} className="profile-avatar" />
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
              {!isOwnProfile && (
                isFollowing ? (
                  <button onClick={handleUnfollow} className="profile-button secondary">Unfollow</button>
                ) : (
                  <button onClick={handleFollow} className="profile-button">Follow</button>
                )
              )}
              <p className="profile-name">{viewedUser.name}</p>
            </>
          )}
          
          <div className="profile-stats">
            <span><b>{posts.length}</b> posts</span>
            <span><b>{followers.length}</b> followers</span>
            <span><b>{following.length}</b> following</span>
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
