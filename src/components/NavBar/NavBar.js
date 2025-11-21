import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import NotificationIcon from '../NotificationIcon/NotificationIcon';
import './NavBar.css';

function NavBar({ user, onSignOut }) {
  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MyInstagram</Link>
        </div>
        <div className="navbar-search">
          <SearchBar />
        </div>
        <div className="navbar-menu">
          <NotificationIcon user={user} />
          <Link to={`/profile/${user.username}`}>Profile</Link>
          <span className="navbar-user">
            Hello, {user.preferred_username || user.username}
          </span>
          <button className="navbar-button" onClick={onSignOut}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
