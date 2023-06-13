import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK-N5U95s_dWbW54QWus3tZKVp4P6HIZ4",
  authDomain: "socialmediaopdracht-10251.firebaseapp.com",
  projectId: "socialmediaopdracht-10251",
  storageBucket: "socialmediaopdracht-10251.appspot.com",
  messagingSenderId: "817959513902",
  appId: "1:817959513902:web:fe89adb3e00e1f2479d4bf",
  measurementId: "G-V9C2NP02D5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
