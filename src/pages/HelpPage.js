import React from 'react';
import '../styles/StaticPage.css';

const HelpPage = () => {
  return (
    <div className="static-page-container">
      <h1 className="static-page-title">Help Center</h1>
      <div className="static-page-content">
        <p>
          Welcome to the MyInstagram Help Center. Here you can find answers to frequently asked questions.
        </p>
        
        <h2>Getting Started</h2>
        <p>
          <strong>How do I create an account?</strong>
          <br />
          You can create an account by clicking the "Sign Up" button on the login page and providing a valid email and password.
        </p>
        <p>
          <strong>How do I edit my profile?</strong>
          <br />
          Navigate to your profile by clicking your username in the navigation bar. Once on your profile, click the "Edit Profile" button to update your avatar, bio, and other personal information.
        </p>

        <h2>Using the App</h2>
        <p>
          <strong>How do I create a post?</strong>
          <br />
          On the homepage, you will find a "Create Post" section. Write your caption, select an image to upload, and click the "Post" button.
        </p>
        <p>
          <strong>How do I follow someone?</strong>
          <br />
          Visit the profile of the user you want to follow and click the "Follow" button. Their posts will then appear in your feed.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you can't find the answer you're looking for, please feel free to reach out to our support team at
          {' '}<strong>support@myinstagram.example.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
