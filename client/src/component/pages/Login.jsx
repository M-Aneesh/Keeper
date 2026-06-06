// Import React and useState hook
import React, { useState } from "react";
// Import axios for making API requests
import axios from "axios";
// Import navigation utilities from react-router-dom
import { useNavigate,Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./login.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from '@mui/icons-material/Home';


function Login() {
  // Hook used for programmatic navigation
  const navigate = useNavigate();
  // State to store form input values
  const [formData, setFormData] =
    useState({email: "" ,password: "",});
  // Updates state whenever user types

  function handleChange(event) {
    // Extract input name and value
    const { name, value } =
      event.target;
    // Update only changed field
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // Handles login form submission
  async function handleSubmit(event) {
    // Prevent page refresh
    event.preventDefault();
    try {
      // Send login request to backend
      const response =
        await axios.post("http://localhost:5000/login",
          // Send form data
          formData,
          {
            // Required for session cookies
            withCredentials: true,
          }
        );
      // Success alert from backend
      alert(response.data.message);
      // Redirect user to notes page
      navigate("/notes");
    } catch (err) {
      // Print full error in console
      console.log(err);
      // Show backend error message
      alert(
        err.response.data.error
      );
    }
  }
  return (
    <div>
      <Header />
      <div className="login">
      {/* Page heading */}
      <h1><LoginIcon/>  Login</h1>
      {/* Login Form */}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Email Input */}{/* Password Input */}
      <TextField
        type="email"
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        value={formData.email}
        onChange={handleChange}

        InputProps={{
          startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      }}
      />

      <TextField
        type="password"
        name="password"
        label="Password"
        variant="outlined"
        fullWidth
        value={formData.password}
        onChange={handleChange}

        InputProps={{
          startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
          ),
        }}
      />
        {/* Submit Button */}
        <button type="submit"><LoginIcon/>  Login</button>
      </form>
      {/* Navigate back to home page */}
      <Link to="/"><HomeIcon/>  Back to Home</Link>
      </div>
      <Footer />
    </div>
  );
}
export default Login;