// Import React
import React from "react";
// Import Material UI notes icon
import NotesIcon from "@mui/icons-material/Notes";

function Header() {
  return (
    // Header section
    <header>
      <h1>
        {/* Notes icon */}
        <NotesIcon />
        {/* App title */}
        Keeper
      </h1>
    </header>
  );
}

export default Header;