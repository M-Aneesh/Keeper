// Import useState hook for managing form data
import { useState } from "react";
// Import axios for backend API requests
import axios from "axios";
// Import navigation utilities from react-router-dom
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./register.css";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from '@mui/icons-material/Home';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  // Hook used for redirecting user after registration
  const navigate = useNavigate();
  // State to store registration form inputs
  const [formData, setFormData] =
    useState({ email: "", password: "",});

  // Updates state whenever user types in inputs
  function handleChange(event) {
    // Extract input name and value
    const { name, value } = event.target;
    // Update only changed field
    setFormData(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // Handles form submission
  async function handleSubmit(event) {
    // Prevent page refresh
    event.preventDefault();
    try {
      // Send registration data to backend
      await axios.post(`${API_URL}/register`,
        formData
      );
      // Show success alert
      alert("Registration successful");
      // Redirect user to login page
      navigate("/login");
    } catch (err) {
      // Print full error in console
      console.log(err);
      // Show backend error message
      alert(
        err.response?.data?.error ||
        "Registration failed"
      );
    }
  }

  return (
    <div>
    <Header />
    <div className="register">
      
      {/* Page heading */}
      <h1> <HowToRegIcon/>  Register</h1>
      {/* Registration Form */}
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Email Input */}
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
        <button type="submit"><HowToRegIcon/> Register</button>
      </form>
      <br />
      {/* Navigate back to home page */}
      <Link to="/">
        <button><HomeIcon/> Back To Home</button>
      </Link>
      <br /><br />
      {/* Navigate to login page if account already exists */}
      <Link to="/login"> <VerifiedUserIcon/>  Already have an account? Login</Link>
      
    </div>
    <Footer />
    </div>
  );
}

export default Register;