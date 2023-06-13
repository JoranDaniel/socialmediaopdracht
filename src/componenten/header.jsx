import React, { useState } from 'react';
import '../header.css';
import Login from '../Login';

const Header = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const toggleLoginForm = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
  };

  return (
    <div className="header-container">
      <h1 className="header-title">My App</h1>
      {!isLoginFormOpen && (
        <button className="login-button" onClick={toggleLoginForm}>
          Login
        </button>
      )}
      {isLoginFormOpen && (
        <div className="login-overlay">
          <Login onLogout={toggleLoginForm} />
        </div>
      )}

<div className="side-bar">
    <div className="side-bar-links">
</div></div>
    </div>
  );
};

export default Header;
