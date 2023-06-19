import React, { useEffect } from 'react';
import Home from '../src/Home';
import Signup from '../src/Signup';
import Login from '../src/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, setUser, user } from '../src/config/firebase';




function App() {
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("wel user");
      } else {
        console.log("je bent een robot aka geen user");
      }
    });
  }, []);


  return (
    <Router>
      <div className='header'>
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </div>
    </Router>

  );




};
export default App;
