import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBYY-dOTycUhbR-rTTEK5LOIJB1h42trvw",
  authDomain: "theboyzmenswear.firebaseapp.com",
  projectId: "theboyzmenswear",
  storageBucket: "theboyzmenswear.firebasestorage.app",
  messagingSenderId: "1009418636490",
  appId: "1:1009418636490:web:a3c97c557931ac86a27833",
  measurementId: "G-WRW50EDGGY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
