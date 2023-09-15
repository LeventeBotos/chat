// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIQWjM096WcjZITzx9TSO5ZJwEpzEPkYE",
  authDomain: "chatapplevente.firebaseapp.com",
  projectId: "chatapplevente",
  storageBucket: "chatapplevente.appspot.com",
  messagingSenderId: "255039266622",
  appId: "1:255039266622:web:d6a99021fb6b70d8b8d66f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
