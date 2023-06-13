import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrfTpuEKrxcVprf0DmG8-rfQP3Ie8Pv_w",
  authDomain: "desktoprating.firebaseapp.com",
  projectId: "desktoprating",
  storageBucket: "desktoprating.appspot.com",
  messagingSenderId: "270518145301",
  appId: "1:270518145301:web:e0fc0174cc5ad472cd991c",
  measurementId: "G-YNZN92VXXM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
