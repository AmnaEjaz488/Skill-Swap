import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import Navbar-specific styles

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
    <Link to="/skills">Skills</Link>
  </li>
  <li>
    <Link to="/Booking">Booking</Link>
  </li>
  <li>
    <Link to="/my-calendar">Calendar</Link>
  </li>
</ul>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;