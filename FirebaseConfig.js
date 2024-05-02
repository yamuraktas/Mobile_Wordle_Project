// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDJJsgddox5XIK9hfd3wA5igPignBj4WAg",
  authDomain: "yazlab2-45fb6.firebaseapp.com",
  projectId: "yazlab2-45fb6",
  storageBucket: "yazlab2-45fb6.appspot.com",
  messagingSenderId: "34296818732",
  appId: "1:34296818732:web:e274e17ba28eb62d41f589"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
