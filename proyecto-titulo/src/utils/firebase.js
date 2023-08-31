import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: 'AIzaSyAUAzFiTHikYGrzEi8FzvThDKzyeBnSgio',
  authDomain: 'fir-firestore-cc2d3.firebaseapp.com',
  projectId: 'fir-firestore-cc2d3',
  storageBucket: 'fir-firestore-cc2d3.appspot.com',
  messagingSenderId: '427930924576',
  appId: '1:427930924576:web:d7252ed0e0b383ff8e6e45',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
const authClient = getAuth();

// Firestore
const firestoreClient = getFirestore();

export {
  authClient,
  firestoreClient,
};
