import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { updateUser } from '../../graphql/mutations';
import { listPosts } from '../../graphql/queries';
import { updatePost } from '../../graphql/mutations';
import './PrivacySettings.css';

const client = generateClient();

function PrivacySettings({ user, onUserUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleAccountTypeChange = async (newAccountType) => {
    if (window.confirm(`Switch to ${newAccountType} account? This will update all your posts.`)) {
      setLoading(true);
      try {
        // 1. Mettre à jour le accountType de l'utilisateur
        const userUpdateResult = await client.graphql({
          query: updateUser,
          variables: {
            input: {
              username: user.username,
              accountType: newAccountType
            }
          }
        });

        console.log('User updated:', userUpdateResult);

        // 2. Récupérer tous les posts de l'utilisateur
        const postsResult = await client.graphql({
          query: listPosts,
          variables: {
            filter: { userId: { eq: user.username } }
          }
        });

        const posts = postsResult.data.listPosts.items;
        const isPublic = newAccountType === 'public';

        console.log(`Updating ${posts.length} posts to isPublic=${isPublic}`);

        // 3. Mettre à jour tous les posts en parallèle
        const updatePromises = posts.map(post => 
          client.graphql({
            query: updatePost,
            variables: {
              input: {
                id: post.id,
                isPublic: isPublic
              }
            }
          })
        );

        await Promise.all(updatePromises);

        // 4. Notifier le parent du changement
        if (onUserUpdate) {
          onUserUpdate({
            ...user,
            accountType: newAccountType
          });
        }

        alert(`Successfully switched to ${newAccountType} account and updated ${posts.length} posts!`);
      } catch (error) {
        console.error('Error updating account type:', error);
        alert('Failed to update account type: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="privacy-settings">
      <h3>Account Privacy</h3>
      <p className="privacy-description">
        {user.accountType === 'public' 
          ? 'Your account is public. Anyone can see your posts.' 
          : 'Your account is private. Only approved followers can see your posts.'}
      </p>
      
      <div className="privacy-toggle">
        <button
          className={`privacy-button ${user.accountType === 'public' ? 'active' : ''}`}
          onClick={() => handleAccountTypeChange('public')}
          disabled={loading || user.accountType === 'public'}
        >
          🌍 Public
        </button>
        
        <button
          className={`privacy-button ${user.accountType === 'private' ? 'active' : ''}`}
          onClick={() => handleAccountTypeChange('private')}
          disabled={loading || user.accountType === 'private'}
        >
          🔒 Private
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Updating account and posts...</p>
        </div>
      )}
    </div>
  );
}

export default PrivacySettings;