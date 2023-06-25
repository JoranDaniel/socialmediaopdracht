import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../src/login.css';

const Login = ({ onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

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
        navigate('/'); // Redirect to the home page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginSuccess(false);
        setErrorMessage(errorMessage);
      });
  };

  const handleLogout = () => {
    setLoginSuccess(false);
    setEmail('');
    setPassword('');
    onLogout(); // Call the onLogout function or any other necessary actions
  };

  return (
    <div>
      <div className="header">
        {/* Plaats hier de inhoud van je header */}
      </div>

      <div className="login-container">
        <div className="login-form">
          <h2 className='titelpagina'>Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input className='inputuser' type="email" id="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input className='inputuser' type="password" id="password" value={password} onChange={handlePasswordChange} />
            </div>
            <p>
              Forgot password? <a className="blue" href="/signup">Click here!</a>
            </p>
            <button className='inputformtype' type="button" onClick={handleLogin}>
              Login
            </button>
            <a href="/Signup">
              <button className='inputformtype' type="button" onClick={handleLogin}>
                Register
              </button>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
