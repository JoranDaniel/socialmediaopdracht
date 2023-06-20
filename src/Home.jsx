import React, { useEffect, useState } from 'react';
import { auth } from '../src/config/firebase';
import Header from '../src/componenten/header';
import Login from './Login';
import PostForm from './componenten/postForm';

const Home = () => {

  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setUser(user);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header />
      {user ? (
        <p></p>
      ) : (
        <Login />
      )}
      <div>
        <PostForm />    
      </div>
    </div>
  );
};

export default Home;
