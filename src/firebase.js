// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-95ef0.firebaseapp.com",
  projectId: "e-commerce-95ef0",
  storageBucket: "e-commerce-95ef0.firebasestorage.app",
  messagingSenderId: "512498387284",
  appId: "1:512498387284:web:124a0a228560ede2d660c1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);