import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'; // Import Navbar-specific styles

const Navbar = () => {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Skill Swap</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="dropdown">
          
          <Link to="/dashboard">Dashboard</Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/dashboard/skills">Skills</Link>
            </li>
            <li>
              <Link to="/dashboard/booking">Booking</Link>
            </li>
          </ul>
        </li>
        {!isAuthenticated ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;