// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHNe-Tklrumnm7LZ7zVxjxtIvDnF6HJNc",
  authDomain: "e-commerce-ea63e.firebaseapp.com",
  projectId: "e-commerce-ea63e",
  storageBucket: "e-commerce-ea63e.appspot.com",
  messagingSenderId: "922653397741",
  appId: "1:922653397741:web:9a119ff952442b213672e4",
  measurementId: "G-VEXTBEXR4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app)
// Initialize Firestore
const db = getFirestore(app);

export { db , auth, provider ,analytics};
