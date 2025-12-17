// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcw7lQ7EROF3eNQxwvh1l3l6Wgif4AvYw",
  authDomain: "assignment9-84144.firebaseapp.com",
  projectId: "assignment9-84144",
  storageBucket: "assignment9-84144.firebasestorage.app",
  messagingSenderId: "1006084108340",
  appId: "1:1006084108340:web:f0e8d66872209acf7d5a61",
  measurementId: "G-CMZ72YDF2M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth instance (named export)
export const auth = getAuth(app);

// Analytics (optional) — guard to avoid errors in dev/non-https
export let analytics = null;
try {
  if (typeof window !== 'undefined' && window.isSecureContext && firebaseConfig.measurementId) {
    analytics = getAnalytics(app);
  }
} catch (_) {
  // ignore analytics issues in local dev
}

// Default export for flexibility
export default { app, auth, analytics };