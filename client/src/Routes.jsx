// Import routing components from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import page components
import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
// Import main notes application
import App from "./component/App";

function MainRoutes() {
  return (
    // Enables routing throughout application
    <BrowserRouter>
      {/* Container for all routes */}
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={<Home />}
        />
        {/* Login Page Route */}
        <Route
          path="/login"
          element={<Login />}
        />
        {/* Register Page Route */}
        <Route
          path="/register"
          element={<Register />}
        />
        {/* Notes Application Route */}
        <Route
          path="/notes"
          element={<App />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;