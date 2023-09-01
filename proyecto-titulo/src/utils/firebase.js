import firebaseConfig from '@/utils/firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

// Initialize Firebase
initializeApp(firebaseConfig);

// Auth
const authClient = getAuth();

// Firestore
const firestoreClient = getFirestore();

export { authClient, firestoreClient };
