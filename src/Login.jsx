import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './login.css';

const Login = ({ onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoginSuccess(true);
        setErrorMessage('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginSuccess(false);
        setErrorMessage(errorMessage);
      });
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleLogout = () => {
    setLoginSuccess(false);
    setEmail('');
    setPassword('');
    setIsAccountOpen(false);
    onLogout(); // Call the onLogout function or any other necessary actions
  };

  return (
    <div className="login-container">
      {loginSuccess ? (
        <button className="login-button" onClick={toggleAccount}>
          Account
        </button>
      ) : (
        <button className={`login-button ${isFormOpen ? 'active' : ''}`} onClick={toggleForm}>
          {isFormOpen ? 'Close' : 'Login'}
        </button>
      )}
      {isFormOpen && (
        <div className="login-form">
          <button className="close-button" onClick={toggleForm}>
            X
          </button>
          <h2>Login</h2>
          {loginSuccess && <p className="success-message">Login successful!</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <p>
              Don't have an account yet? <a href="/signup">Sign up here!</a>
            </p>
          </form>
        </div>
      )}
      {isAccountOpen && (
        <div className="login-form">
          <button className="close-button" onClick={toggleAccount}>
            X
          </button>
          <h2>Account</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={handleNameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password:</label>
              <input type="password" id="new-password" value={newPassword} onChange={handleNewPasswordChange} />
            </div>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </form>
        </div>
      )}
      {loginSuccess && (
        <p className="welcome-message">Welcome, {email}!</p>
      )}
    </div>
  );
};

export default Login;
