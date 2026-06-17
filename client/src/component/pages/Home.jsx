// Import Link component for navigation between routes
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./home.css";
import React from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';


const API_URL = import.meta.env.VITE_API_URL;
function Home() {
  // Function to start Google OAuth login
  function googleLogin() {
    // Opens backend Google auth route
    // "_self" opens in same tab
    window.open(`${API_URL}/auth/google`,"_self"
    );
  }
  return (
    <div>
      <Header />
    {/* Main home page container */}
    <div className="home-container">
      {/* App heading */}
      <p>
        <StorefrontIcon />  Store your notes securely 
      </p>
      {/* Buttons section */}
      <div className="home-buttons">
        {/* Google Login Button */}
        <button onClick={googleLogin}>
          <GoogleIcon />  Sign In With Google
        </button>
        {/* Navigate to Login Page */}
        <Link to="/login">
          <button>
            <LoginIcon/>  Login
          </button>
        </Link>
        {/* Navigate to Register Page */}
        <Link to="/register">
          <button><HowToRegIcon/> Register</button>
        </Link>
      </div>
    </div>
    <Footer />
  </div>
  );
}

export default Home;