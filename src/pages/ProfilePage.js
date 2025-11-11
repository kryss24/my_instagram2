import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut, fetchUserAttributes } from '@aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { getUser } from '../graphql/queries';
import { createUser, updateUser } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../components/EditProfile/EditProfile';
import '../styles/ProfilePage.css';

const client = generateClient();

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userAttributes, setUserAttributes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get current user from Cognito
        const cognitoUser = await getCurrentUser();
        console.log('1. Cognito user:', cognitoUser);
        
        if (!cognitoUser) {
          throw new Error('No authenticated user found');
        }

        // Fetch complete user attributes from Cognito
        const userAttributes = await fetchUserAttributes();
        console.log('2. User attributes from Cognito:', userAttributes);
        setUserAttributes(userAttributes);

        if (!userAttributes.email) {
          throw new Error('Email not found in user attributes');
        }

        // Try to get user from GraphQL database using email
        const userData = await client.graphql({ 
          query: getUser, 
          variables: { username: userAttributes.email } 
        });
        console.log('3. GraphQL user data:', userData);

        if (!userData.data.getUser) {
          console.log('4. Creating new user profile...');
          try {
            // Create new user with only the fields that exist in our schema
            const userInput = {
              input: {
                username: userAttributes.email,
                email: userAttributes.email,
                phone_number: userAttributes.phone_number || null,
                gender: userAttributes.gender || null,
                bio: '',
                accountType: "public",
                avatar: null,
                preferred_username: userAttributes.preferred_username,
              }
            };
            
            console.log('5. Creating user with input:', userInput);
            const newUserData = await client.graphql({
              query: createUser,
              variables: userInput
            });
            
            setUser(newUserData.data.createUser);
            console.log('6. User create:', user);
          } catch (createError) {
            console.error('Error creating user profile:', createError);
            throw createError;
          }
        } else {
          // Update existing user with only the fields that exist in our schema
          const updateInput = {
            input: {
              username: userData.data.getUser.username,
              email: userAttributes.email,
              phone_number: userAttributes.phone_number || null,
              gender: userAttributes.gender || null
            }
          };

          const updatedUserData = await client.graphql({
            query: updateUser,
            variables: updateInput
          });
          
          setUser(updatedUserData.data.updateUser);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error.message === 'No authenticated user found' || 
            error.message.includes('not authenticated')) {
          await signOut();
          navigate('/login');
        } else {
          // Handle other types of errors
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

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
    return <div className="error-container">User not found. Please log in again.</div>;
  }

  return (
    <div className="profile-page">
      {isEditing ? (
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
                  {(userAttributes.preferred_username || user.username || '?')[0].toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="profile-info">
              <div className="profile-info-header">
                <h2 className="profile-username">{userAttributes.preferred_username || user.username}</h2>
                <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
                <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
              </div>

              <ul className="profile-stats">
                <li className="profile-stat-item">
                  <span className="profile-stat-value">{user.posts?.items?.length || 0}</span> posts
                </li>
                <li className="profile-stat-item">
                  <span className="profile-stat-value">0</span> followers
                </li>
                <li className="profile-stat-item">
                  <span className="profile-stat-value">0</span> following
                </li>
              </ul>

              <div className="profile-bio">
                {user.bio || 'No bio yet'}
              </div>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-detail-item">
              <span className="profile-detail-label">Email</span>
              <span className="profile-detail-value">{user.email}</span>
            </div>

            <div className="profile-detail-item">
              <span className="profile-detail-label">Phone</span>
              <span className="profile-detail-value">
                {user.phone_number || 'Not provided'}
              </span>
            </div>

            <div className="profile-detail-item">
              <span className="profile-detail-label">Gender</span>
              <span className="profile-detail-value">
                {user.gender || 'Not specified'}
              </span>
            </div>

            <div className="profile-detail-item">
              <span className="profile-detail-label">Account Type</span>
              <span className="profile-detail-value">
                {user.accountType || 'Public'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
