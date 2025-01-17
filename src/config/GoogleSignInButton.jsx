import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase"; // Adjust the path based on your project structure
import { signInWithPopup } from "firebase/auth";
import Navbar from "../pages/dashboard/Navbar";
import SideNav from "../component/SideNav";
import { Link } from "react-router-dom";
const GoogleSignInButton = ({ onSignInSuccess }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userEmail = result.user.email;
        setEmail(userEmail);
        localStorage.setItem("email", userEmail);
        onSignInSuccess()
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div>
     
        <button onClick={handleSignIn}>Sign in with Google</button>
    
    </div>
  );
};

export default GoogleSignInButton;
