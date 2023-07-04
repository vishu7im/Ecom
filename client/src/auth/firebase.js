// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyCKbQsg92X8EOc1vvS4f39eu2ZLXr78jbw",
  authDomain: "message-b1048.firebaseapp.com",
  projectId: "message-b1048",
  storageBucket: "message-b1048.appspot.com",
  messagingSenderId: "893736613177",
  appId: "1:893736613177:web:615392a2d3f69fa521e4e8",
};
// Initialize

const app = initializeApp(firebaseConfig);

// Initialize Firebastore

export const auth = getAuth(app);

// const analytics = getAnalytics(app);
