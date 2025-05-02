import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Import Navbar-specific styles
import "../styles/Logout.css"; // Import Logout-specific styles

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated by checking for a JWT token
  const isAuthenticated = !!localStorage.getItem("jwtToken");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem("jwtToken");
    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Skill Swap</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li
          className={`dropdown ${dropdownOpen ? "open" : ""}`}
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <Link to="/dashboard">Dashboard</Link>

          <ul className="dropdown-menu">
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/Booking">Booking</Link>
            </li>
            <li>
              <Link to="/my-calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/skill-needed">Skill Needed</Link>
            </li>
            <li>
              <Link to="/skill-offered">Skill Offered</Link>
            </li>
          </ul>
        </li>

        {/* Conditional rendering for Login/Logout */}
        {isAuthenticated ? (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;