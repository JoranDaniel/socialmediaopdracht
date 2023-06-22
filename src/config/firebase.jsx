import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCD6grIwkNB4aQyK_Oq4OYCfU31y-LFaeQ",
  authDomain: "socialmediav2-6287b.firebaseapp.com",
  projectId: "socialmediav2-6287b",
  storageBucket: "socialmediav2-6287b.appspot.com",
  messagingSenderId: "686781341340",
  appId: "1:686781341340:web:d32dcf83ba3c7427d4d759"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
