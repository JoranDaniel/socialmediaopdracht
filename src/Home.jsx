import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../src/config/firebase';
import Header from '../src/componenten/header';
import Login from './Login';
import '../src/home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [privacyButtonText, setPrivacyButtonText] = useState('');
  const [accountPrivacy, setAccountPrivacy] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setUser(user);
        const storedPrivacy = localStorage.getItem('privacy');
        if (storedPrivacy !== null) {
          setPrivacy(storedPrivacy === 'true');
        } else {
          setPrivacy(user.privacy || false);
        }
        localStorage.setItem('user', JSON.stringify(user)); // Sla gebruikersgegevens op in localStorage
      } else {
        // User is logged out
        setUser(null);
        setPrivacy(false);
        setUsers([]);
        setLoading(true);
        setPosts([]);
        setNewPostText('');
        localStorage.removeItem('user'); // Verwijder opgeslagen gebruikersgegevens bij uitloggen
        localStorage.removeItem('privacy'); // Verwijder opgeslagen privacy-instelling bij uitloggen
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore.collection('users').get();
        const usersData = usersSnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Fout bij het ophalen van gebruikers:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await firestore.collection('posts').get();
        const postsData = postsSnapshot.docs.map((doc) => ({
          postId: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Fout bij het ophalen van de posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (user) {
      setPrivacyButtonText(privacy ? 'Switch Privacy: Private' : 'Switch Privacy: Public');
      setAccountPrivacy(privacy ? 'Private' : 'Public');
      localStorage.setItem('privacy', privacy.toString()); // Sla privacy-instelling op in localStorage
    }
  }, [user, privacy]);

  const togglePrivacy = async () => {
    try {
      if (user) {
        const userRef = firestore.collection('users').doc(user.uid);
        const userData = await userRef.get();
        const currentPrivacyStatus = userData.data().privacy;
        const updatedPrivacyStatus = !currentPrivacyStatus;

        await userRef.update({
          privacy: updatedPrivacyStatus,
        });

        setPrivacy(updatedPrivacyStatus);
        setPrivacyButtonText(updatedPrivacyStatus ? 'Switch Privacy: Private' : 'Switch Privacy: Public');
        setAccountPrivacy(updatedPrivacyStatus ? 'Private' : 'Public');
        localStorage.setItem('privacy', updatedPrivacyStatus.toString()); // Sla bijgewerkte privacy-instelling op in localStorage
      } else {
        console.error('Fout bij het bijwerken van de privacystatus: Geen ingelogde gebruiker gevonden.');
      }
    } catch (error) {
      console.error('Fout bij het bijwerken van de privacystatus:', error);
    }
  };

  const createPost = async () => {
    try {
      if (user) {
        const postRef = firestore.collection('posts').doc();
        await postRef.set({
          userId: user.uid,
          userName: user.displayName, // Gebruik de weergavenaam van de ingelogde gebruiker
          userEmail: privacy ? user.email : '', // Verberg het e-mailadres als het account privé is
          text: newPostText,
        });
        setNewPostText('');

        // Fetch de bijgewerkte posts
        const postsSnapshot = await firestore.collection('posts').get();
        const updatedPosts = postsSnapshot.docs.map((doc) => ({
          postId: doc.id,
          ...doc.data(),
        }));
        setPosts(updatedPosts);
      } else {
        console.error('Geen ingelogde gebruiker gevonden.');
      }
    } catch (error) {
      console.error('Fout bij het maken van de post:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((userData) => {
    const { email } = userData;
    return email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className='background'>
      <Header />
      {user ? (
        <div>
          <p>Your account is: {accountPrivacy}</p>
          <div className="search-bar">
            <input className='searchbar'
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <h2>Gebruikers:</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className='center'>
              {filteredUsers.map((userData) => (
                (userData.uid !== user.uid || privacy) && (
                  <li key={userData.uid}>{userData.email}</li>
                )
              ))}
            </ul>
          )}
          <button className='button1' onClick={togglePrivacy}>{privacyButtonText}</button>
          <h2>Posts:</h2>
          <div>
            <input
              type="text"
              placeholder="Enter your post"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <button onClick={createPost}>Post</button>
          </div>
          {privacy ? (
            <ul className="post-list">
              {posts.map((post) => (
                (post.userId === user.uid || !privacy) && (
                  <li className="post" key={post.postId}>
                    <div className="post-header">
                      <div className="post-info">
                        <h1 className="user-email">Desktoprating<br /></h1>
                        <span className="user-name">{post.userName}</span>
                        <span className="user-email">Naam: {post.userEmail}</span>
                      </div>
                    </div>
                    <p className="post-text">Discription: {post.text}</p>
                    <span className="user-email">Revieuw: ★★★★☆</span>
                    <img className='foto' src="https://www.paradigit.nl/media/1520/videokaart-pci.jpg?width=330&height=220" alt="" />
                  </li>
                )
              ))}
            </ul>
          ) : (
            <p>Posts are private.</p>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
