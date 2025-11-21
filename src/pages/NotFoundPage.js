import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css'; // Assuming a CSS file for styling

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="not-found-link">Go to Homepage</Link>
    </div>
  );
};

export default NotFoundPage;
