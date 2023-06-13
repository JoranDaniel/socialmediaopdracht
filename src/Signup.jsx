import React, { useState } from 'react';
import { auth } from '../src/config/firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User registration successful
        const user = userCredential.user;
        console.log(user);
        setSignupSuccess(true); // Set signup success state to true
      })
      .catch((error) => {
        // Handle error during user registration
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {signupSuccess && <p>Sign up successful!</p>}
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button type="button" onClick={handleSignup}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
