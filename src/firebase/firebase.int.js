// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_OszmsdoKOdTZYn_tV7OsIiAdN8d6hfw",
  authDomain: "techspring-ec865.firebaseapp.com",
  projectId: "techspring-ec865",
  storageBucket: "techspring-ec865.firebasestorage.app",
  messagingSenderId: "70827153340",
  appId: "1:70827153340:web:e50207c4d6db29459efdb9"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export default app;
 export  const auth = getAuth(app);