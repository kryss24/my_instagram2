import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Hub } from '@aws-amplify/core';
import { fetchAuthSession, getCurrentUser, signOut } from '@aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './styles/App.css';
import client from './utils/client';
import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import DeveloperPage from './pages/DeveloperPage';
import SearchPage from './pages/SearchPage';
import NotificationsPage from './pages/NotificationsPage';
import InboxPage from './pages/InboxPage';
import ConversationPage from './pages/ConversationPage';
import PostPage from './pages/PostPage';
import NavBar from './components/NavBar/NavBar';
import CreatePost from './components/CreatePost/CreatePost';
import Feed from './components/Feed/Feed';

const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await fetchAuthSession();
        setIsLoggedIn(session.tokens?.idToken ? true : false);
      } catch (error) {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };

    checkUser();

    const authListener = (data) => {
      switch (data.payload.event) {
        case 'signIn':
          setIsLoggedIn(true);
          break;
        case 'signOut':
          setIsLoggedIn(false);
          break;
        default:
          break;
      }
    };

    const unsubscribe = Hub.listen('auth', authListener);

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route 
              path="/login" 
              element={
                <LoginPage />
              } 
            />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <LayoutWithNavBar />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Authenticator.Provider>
  );
}

// Composant de mise en page avec NavBar
const LayoutWithNavBar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens?.idToken) {
          const currentUser = await getCurrentUser();
          const { username } = currentUser;
          const userAttributes = currentUser.signInDetails?.userAttributes || {};
          const preferredUsername = userAttributes.preferred_username;
          const finalUsername = preferredUsername || username;
          
          try {
            // Essayer de récupérer l'utilisateur
            const response = await client.graphql({
              query: getUser,
              variables: { username: finalUsername }
            });
            
            if (response.data?.getUser) {
              setUser(response.data.getUser);
            } else {
              console.log("Creating new user in database...");
              // Créer l'utilisateur s'il n'existe pas
              const createResponse = await client.graphql({
                query: createUser,
                variables: {
                  input: {
                    username: finalUsername,
                    preferred_username: userAttributes.preferred_username || finalUsername,
                    email: userAttributes.email || '',
                    phone_number: userAttributes.phone_number || '',
                    gender: userAttributes.gender || '',
                    bio: '',
                    avatar: '',
                    accountType: 'PERSONAL'
                  }
                }
              });
              
              if (createResponse.data?.createUser) {
                setUser(createResponse.data.createUser);
              } else {
                console.error("Failed to create user");
                setIsLoading(false);
                return;
              }
            }
          } catch (error) {
            console.error("Error with user operations:", error);
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching auth session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar user={user} onSignOut={handleSignOut} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/post/:postId" element={<PostPage user={user} />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/inbox/:conversationId" element={<ConversationPage user={user} />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/developer" element={<DeveloperPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
