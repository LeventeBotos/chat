// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDQMxK4s3qIRoOt4xB3J4gygqSHKREujU",
  authDomain: "deb8app.firebaseapp.com",
  projectId: "deb8app",
  storageBucket: "deb8app.appspot.com",
  messagingSenderId: "346157443053",
  appId: "1:346157443053:web:ae83c17c7f40372f12e9e4",
  measurementId: "G-GHWGHERDJH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
