// Import React
import React from "react";
// Import ReactDOM for rendering app to browser
import ReactDOM from "react-dom/client";
// Import main routes component
import MainRoutes from "./Routes";
// Import global CSS styles
import "./styles.css";
// Create React root and render application
ReactDOM.createRoot(
  // Select root div from index.html
  document.getElementById("root")).render(
  // Render all application routes
  <MainRoutes />
);