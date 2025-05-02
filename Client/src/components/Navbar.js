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
<<<<<<< HEAD
            <li>
              <Link to="/skills">Skills</Link>
            </li>
            <li>
              <Link to="/booking">Booking</Link>
            </li>
=======
            <li><a href="/Profile">Profile</a></li>
            <li><a href="/skills">Skills</a></li>
            <li><a href="/Booking">Booking</a></li>
            <li><a href="/my-calendar">Calendar</a></li>
>>>>>>> 25945da43429f90bf0535410fa72e24baa3fda5a
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