import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ user, signOut }) {
  // App.js now guarantees user is the full dbUser object, or it shows a loader.
  // console.log(user.id);
  if (!user) {
    return null; // Or a loading skeleton
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MyInstagram</Link>
        </div>
        <div className="navbar-menu">
          <Link to={`/profile`}>Profile</Link>
          <span className="navbar-user">Hello, {user.email}</span>
          <button className="navbar-button" onClick={signOut}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

