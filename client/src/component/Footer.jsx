// Import React
import React from "react";
// Import Material UI copyright icon
import CopyrightIcon from "@mui/icons-material/Copyright";

function Footer() {
  // Get current year dynamically
  const year = new Date().getFullYear();
  return (
    // Footer section
    <footer>
      <p>
        {/* Copyright text */}
        Copyright
        {/* Copyright icon */}
        <CopyrightIcon />
        {/* Current year */}
        {year}
      </p>
    </footer>
  );
}

export default Footer;