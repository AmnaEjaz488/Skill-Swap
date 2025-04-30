import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li><Link to="/about" className="footer-link">About</Link></li>
        <li><Link to="/contact" className="footer-link">Contact</Link></li>
      </ul>
      <p>&copy; 2025 Skill Swap. All rights reserved.</p>
    </footer>
  );
};

export default Footer;