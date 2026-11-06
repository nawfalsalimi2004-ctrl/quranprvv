import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration provided by user
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForInitialization-CVPro",
  authDomain: "ai-studio-applet-webapp.firebaseapp.com",
  projectId: "ai-studio-applet-webapp",
  storageBucket: "ai-studio-applet-webapp.appspot.com",
  messagingSenderId: "563020191603",
  appId: "1:563020191603:web:90cdc999fa049a77369706"
};

// Initialize Firebase safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
