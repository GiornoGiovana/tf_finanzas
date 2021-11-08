// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-nF1OoqNPseWcbkQBrVw1RzodKHu3DNw",
  authDomain: "tf-finanzas-bb0ce.firebaseapp.com",
  projectId: "tf-finanzas-bb0ce",
  storageBucket: "tf-finanzas-bb0ce.appspot.com",
  messagingSenderId: "535292349893",
  appId: "1:535292349893:web:30aa8bc52ad332d67f4fac",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
