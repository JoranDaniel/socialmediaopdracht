import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../src/config/firebase';
import '../src/home.css';
import { GoogleAuthProvider } from 'firebase/auth';
import DRLogo from './images/DRLogo.png';

const Home = () => {
  const [user, setUser] = useState(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [reviews, setReviews] = useState([]);
  const [privacy, setPrivacy] = useState(false); // Privacy flag
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('reviews')
      .onSnapshot((snapshot) => {
        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsData);
      });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  const handleSignIn = () => {
    // Implement logic for regular sign in here
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    const reviewData = {
      title: reviewTitle,
      image: reviewImage,
      description: reviewDescription,
      user: user, // Include user name in review data
      privacy: privacy, // Include privacy setting in review data
    };

    firestore
      .collection('reviews')
      .add(reviewData)
      .then(() => {
        console.log('Review is geplaatst');
        setReviewTitle('');
        setReviewImage('');
        setReviewDescription('');
      })
      .catch((error) => {
        console.error('Fout bij het plaatsen van de review:', error);
      });
  };

  const handleTogglePrivacy = () => {
    setPrivacy(!privacy);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredReviews = reviews.filter((review) =>
    review.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReviewsWithPrivacy = filteredReviews.filter((review) => {
    if (privacy) {
      return review.user !== user;
    } else {
      return true;
    }
  });

  return (
    <body>
      <div className='header'>
        <img className='logo' src={DRLogo} alt='Beschrijvende tekst' />

        <input
          className='searchBar'
          type='text'
          placeholder='Zoek reviews...'
          value={searchQuery}
          onChange={handleSearch}
        />
        {user ? (
          <>
            <p className='ingelogdegbruiker'>Welkom, {user}</p>
            {privacy ? (
              <button className='logoutButton1' onClick={handleTogglePrivacy}>
                Toggle Privacy: ON
              </button>
            ) : (
              <button className='logoutButton1' onClick={handleTogglePrivacy}>
                Toggle Privacy: OFF
              </button>
            )}
            <button className='logoutButton' onClick={handleSignOut}>
              Uitloggen
            </button>
          </>
        ) : (
          <>
            <a href="/login">
              <button className='loginbuttonNormaal' onClick={handleSignIn}>
                Inloggen
              </button>
            </a>
            <button className='loginbuttonGoogle' onClick={handleSignInWithGoogle}>
              Inloggen met Google
            </button>
          </>
        )}
      </div>
      <div className="container">
        <div className='headersidebar'>
          {user && (
            <>
              <h1 className='white'>Review plaatsen</h1>
              <form className='reviewForm' onSubmit={handleSubmitReview}>
                <input
                  className='invoer'
                  type='text'
                  placeholder='Titel'
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  required
                />
                <input
                  className='invoer'
                  type='text'
                  placeholder='Afbeelding URL'
                  value={reviewImage}
                  onChange={(e) => setReviewImage(e.target.value)}
                  required
                />
                <textarea
                  className='invoer'
                  placeholder='Beschrijving'
                  value={reviewDescription}
                  onChange={(e) => setReviewDescription(e.target.value)}
                  required
                ></textarea>
                <button className='button' type='submit'>
                  Plaats review
                </button>
              </form>
            </>
          )}

          <div className='headersidebar1'>
            <div className='test'>
              <div className='reviewList'>
                {filteredReviewsWithPrivacy.map((review) => (
                  <div key={review.id} className='reviewItem'>
                    <h3 className='naam'>{review.title}</h3>
                    <img className='imagefoto' src={review.image} alt='Review afbeelding' />
                    <p className='naam'>Beschrijving: {review.description}</p>
                    <p className='naam'>★★★☆☆</p>
                    <p className='naam'>Geplaatst door: {review.user}</p> {/* Display user name for all posts */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Home;
