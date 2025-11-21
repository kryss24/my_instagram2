import React from 'react';
import '../styles/StaticPage.css';

const AboutPage = () => {
  return (
    <div className="static-page-container">
      <h1 className="static-page-title">About MyInstagram</h1>
      <div className="static-page-content">
        <p>
          Welcome to MyInstagram, a passion project designed to replicate the core functionalities of Instagram.
          This application is built from the ground up using modern web technologies, serving as a comprehensive
          demonstration of full-stack development.
        </p>
        <p>
          Our mission is to create a beautiful, performant, and user-friendly social media experience where users can
          share moments, connect with others, and explore a world of visual storytelling.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li><strong>User Authentication:</strong> Secure sign-up and login using AWS Cognito.</li>
          <li><strong>User Profiles:</strong> Customizable profiles with avatars and bios.</li>
          <li><strong>Create & Share:</strong> Upload images and write captions to share your moments.</li>
          <li><strong>Social Feed:</strong> A chronological feed of posts from users you follow.</li>
          <li><strong>Follow System:</strong> Follow and unfollow other users to customize your feed.</li>
          <li><strong>Likes & Comments:</strong> Engage with posts through likes and real-time comments.</li>
        </ul>
        <h2>Technology Stack</h2>
        <p>
          This project is powered by the following technologies:
        </p>
        <ul>
          <li><strong>Frontend:</strong> React.js, React Router</li>
          <li><strong>Backend & Cloud:</strong> AWS Amplify, AWS AppSync (GraphQL), Amazon S3, Amazon DynamoDB, AWS Lambda</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
