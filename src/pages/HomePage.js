  import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import Feed from '../components/Feed/Feed';
import CreatePost from '../components/CreatePost/CreatePost';

const HomePage = ({ user }) => {
  const navigate = useNavigate();
  const [refreshFeedKey, setRefreshFeedKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshFeedKey(prevKey => prevKey + 1);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-content">
        <CreatePost user={user} onPostCreated={handlePostCreated} />
        <Feed key={refreshFeedKey} currentUser={user} />
      </div>
    </div>
  );
};

export default HomePage;
