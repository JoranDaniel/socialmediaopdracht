import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './login.css';

const Login = ({ onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  return (
    <div className="login-container">
      <button className="login-button" onClick={toggleForm}>
        Login
      </button>
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
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
