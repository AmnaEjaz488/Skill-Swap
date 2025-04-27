import React from "react";
import '../styles/Home.css'; // Import Home-specific styles
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

        <button className="cta-button">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features">
       {/* <h2>Why Choose SkillSwap?</h2>*/}
        <div className="feature-cards">
          <div className="feature-card">
            <img 
              src={shareSkills} 
              alt="Learn New Skills" 
              className="feature-image" 
              style={{ width: "270px", height: "180px", objectFit: "cover" }}
            />
            <h3>Learn New Skills</h3>
            <p>Discover a wide range of skills from experts in the community.</p>
          </div>

          <div className="feature-card">
            <img 
              src={pianoskills}
              alt="Share Your Expertise" 
              className="feature-image" 
              style={{ width: "270px", height: "180px", objectFit: "cover" }}
            />
            <h3>Share Your Expertise</h3>
            <p>Teach others and grow your network by sharing your knowledge.</p>
          </div>

          <div className="feature-card">
            <img 
              src={onlineCoaching} 
              alt="share your skills" 
              className="feature-image" 
              style={{ width: "250px", height: "200px", objectFit: "cover" }}
            />
            <h3>Flexible Scheduling</h3>
            <p>Set your availability and connect with others at your convenience.</p>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 SkillSwap. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
