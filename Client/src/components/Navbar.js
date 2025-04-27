import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'; // Import Navbar-specific styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">Skill Swap</a>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li className="dropdown">
          <a href="/dashboard">Dashboard</a>
          <ul className="dropdown-menu">
            <li><a href="/profile">Profile</a></li>
            <li><a href="/skills">Skills</a></li>
            <li><a href="/Booking">Booking</a></li>
          </ul>
        </li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;