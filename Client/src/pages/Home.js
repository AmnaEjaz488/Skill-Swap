import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Import Home-specific styles
import shareSkills from "../assets/shareSkills.jpg";
import pianoskills from "../assets/pianoskills.jpg";
import onlineCoaching from "../assets/onlineCoaching.jpg";
import welcomepicture from "../assets/welcomepicture.jpg";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <img 
          src={welcomepicture}
          alt="Hero" 
          className="hero-image" 
          style={{ width: "290px", height: "150px", objectFit: "cover" }}
        />
        <h1>Welcome to Skill Swap</h1>
        <p>Learn, Share, Thrive Together.</p>

        {/* Link the Get Started button to the Signup page */}
        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-cards">
          {/* Skill Needed Feature Card */}
          <div className="feature-card">
            <img 
              src={shareSkills} 
              alt="Skill Needed" 
              className="feature-image" 
              style={{ width: "270px", height: "180px", objectFit: "cover" }}
            />
            <h3>Learn New Skills</h3>
            <p>Find the skills you need to grow and succeed.</p>
            <Link to="/skill-needed" className="feature-card-link">
              Explore Skills Needed
            </Link>
          </div>

          {/* Skill Offered Feature Card */}
          <div className="feature-card">
            <img 
              src={pianoskills}
              alt="Skill Offered" 
              className="feature-image" 
              style={{ width: "270px", height: "180px", objectFit: "cover" }}
            />
            <h3>Share your Expertise</h3>
            <p>Showcase your skills and help others grow.</p>
            <Link to="/skill-offered" className="feature-card-link">
              Explore Skills Offered
            </Link>
          </div>

          {/* Flexible Scheduling Feature Card */}
          <div className="feature-card">
            <img 
              src={onlineCoaching} 
              alt="Flexible Scheduling" 
              className="feature-image" 
              style={{ width: "250px", height: "200px", objectFit: "cover" }}
            />
            <h3>Flexible Scheduling</h3>
            <p>Set your availability and connect with others at your convenience.</p>
            <Link to="/booking" className="feature-card-link">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
