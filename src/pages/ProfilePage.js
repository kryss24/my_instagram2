import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from '@aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { getUserWithFollows, getConversation, listConversationsByMember } from '../graphql/custom-queries';
import { createFollow, deleteFollow, createNotification, createConversation } from '../graphql/mutations';
import EditProfile from '../components/EditProfile/EditProfile';
import '../styles/ProfilePage.css';

const client = generateClient();

const ProfilePage = () => {
  const [user, setUser] = useState(null); // The user whose profile is being viewed
  const [currentUser, setCurrentUser] = useState(null); // The logged-in user
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { username: profileUsername } = useParams();
  const navigate = useNavigate();

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    try {
      const cognitoUser = await getCurrentUser();
      setCurrentUser(cognitoUser);

      const targetUsername = profileUsername || cognitoUser.username;

      const userData = await client.graphql({
        query: getUserWithFollows,
        variables: { username: targetUsername },
      });

      const profileData = userData.data.getUser;
      if (profileData) {
        setUser(profileData);

        if (profileUsername && cognitoUser.username !== profileUsername) {
          const followRelationship = profileData.followers.items.find(
            (item) => item.follower.username === cognitoUser.username
          );
          if (followRelationship) {
            setIsFollowing(true);
            setFollowId(followRelationship.id);
          } else {
            setIsFollowing(false);
            setFollowId(null);
          }
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  }, [profileUsername]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleFollow = async () => {
    if (!currentUser || !user) return;
    try {
      const followInput = {
        followerId: currentUser.username,
        followedId: user.username,
      };
      const newFollowData = await client.graphql({
        query: createFollow,
        variables: { input: followInput },
      });
      const newFollow = newFollowData.data.createFollow;
      setIsFollowing(true);
      setFollowId(newFollow.id);
      
      setUser(prevUser => ({
        ...prevUser,
        followers: {
          ...prevUser.followers,
          items: [...prevUser.followers.items, { __typename: "Follow", id: newFollow.id, follower: { username: currentUser.username } }]
        }
      }));

      // Create notification
      await client.graphql({
        query: createNotification,
        variables: {
          input: {
            userId: user.username, // The user being followed
            type: 'NEW_FOLLOWER',
            actorId: currentUser.username, // The user who followed
            read: false,
          }
        }
      });
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    if (!followId) return;
    try {
      await client.graphql({
        query: deleteFollow,
        variables: { input: { id: followId } },
      });
      setIsFollowing(false);
      setFollowId(null);

      setUser(prevUser => ({
        ...prevUser,
        followers: {
          ...prevUser.followers,
          items: prevUser.followers.items.filter(item => item.id !== followId)
        }
      }));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleMessage = async () => {
    if (!currentUser || !user) return;

    const members = [currentUser.username, user.username].sort();
    const conversationId = members.join('_'); // Deterministic ID for 1-on-1 chats

    try {
      // Try to get existing conversation
      const existingConversation = await client.graphql({
        query: getConversation,
        variables: { id: conversationId },
      });

      let convId = existingConversation.data?.getConversation?.id;

      if (!convId) {
        // If no existing conversation, create a new one
        const newConversation = await client.graphql({
          query: createConversation,
          variables: {
            input: {
              id: conversationId, // Use deterministic ID
              members: members,
            },
          },
        });
        convId = newConversation.data.createConversation.id;
      }
      navigate(`/inbox/${convId}`);
    } catch (error) {
      console.error('Error handling message:', error);
      alert('Failed to start conversation: ' + error.message);
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error-container">User not found.</div>;
  }

  const isCurrentUserProfile = currentUser && currentUser.username === user.username;

  return (
    <div className="profile-page">
      {isEditing && isCurrentUserProfile ? (
        <EditProfile
          user={user}
          onUpdate={handleProfileUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar-container">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="profile-avatar" />
              ) : (
                <div className="profile-avatar-placeholder">
                  {(user.preferred_username || user.username || '?')[0].toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="profile-info">
              <div className="profile-info-header">
                <h2 className="profile-username">{user.preferred_username || user.username}</h2>
                {isCurrentUserProfile ? (
                  <>
                    <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                    <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
                  </>
                ) : (
                  <>
                    {isFollowing ? (
                      <button className="unfollow-button" onClick={handleUnfollow}>Unfollow</button>
                    ) : (
                      <button className="follow-button" onClick={handleFollow}>Follow</button>
                    )}
                    <button className="message-button" onClick={handleMessage}>Message</button>
                  </>
                )}
              </div>

              <ul className="profile-stats">
                <li className="profile-stat-item">
                  <span className="profile-stat-value">{user.posts?.items?.length || 0}</span> posts
                </li>
                <li className="profile-stat-item">
                  <span className="profile-stat-value">{user.followers?.items?.length || 0}</span> followers
                </li>
                <li className="profile-stat-item">
                  <span className="profile-stat-value">{user.following?.items?.length || 0}</span> following
                </li>
              </ul>

              <div className="profile-bio">
                {user.bio || 'No bio yet'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
