import React, { useState } from 'react';
import { auth, firestore } from '../src/config/firebase';
import { useNavigate } from 'react-router-dom';
import '../src/login.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignup = () => {
    if (password !== repeatPassword) {
      // Password and repeat password do not match
      console.error("Password and repeat password do not match");
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User registration successful
        const user = userCredential.user;
        // Save username to database
        firestore.collection('users').doc(user.uid).set({
          email: user.email,
          username: username
        });
        console.log(user);
        setSignupSuccess(true); // Set signup success state to true
        navigate('/login'); // Redirect to the login page
      })
      .catch((error) => {
        // Handle error during user registration
        console.error(error);
      });
  };

  return (
    <div>
      <div className="header">
        {/* Plaats hier de inhoud van je header */}
      </div>

      <div className="login-container">
        <div className="login-form1">
          <h2 className='titelpagina'>Sign Up</h2>
          {signupSuccess && <p className="success-message">Sign up successful!</p>}
          <form className='formvoorlogin'>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" className='inputuser' value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" className='inputuser' value={username} onChange={handleUsernameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" className='inputuser' value={password} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input type="password" id="repeat-password" className='inputuser' value={repeatPassword} onChange={handleRepeatPasswordChange} />
            </div>
           
            <button className='inputformtype' type="button" onClick={handleSignup}>
              Sign Up
            </button>
            <a href="/login">
              
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;