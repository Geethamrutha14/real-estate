// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e1082.firebaseapp.com",
  projectId: "mern-estate-e1082",
  storageBucket: "mern-estate-e1082.firebasestorage.app",
  messagingSenderId: "353568557407",
  appId: "1:353568557407:web:96c62a085cdd953ac14eea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);