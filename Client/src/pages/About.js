import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About us</h1>
      <p>
        Skill Swap is a collaborative learning platform where individuals come together to learn, share, and grow by exchanging skills. Whether you're a beginner looking to explore something new or an expert eager to teach, Skill Swap provides the space to connect and grow together.

        Our mission is to make knowledge and expertise accessible to everyone by building a diverse and supportive community. We believe that everyone has something valuable to offer — and that learning is most powerful when it’s shared. At Skill Swap, we:
        <ul>
          <li>Encourage peer-to-peer learning</li>
          <li>Foster connections across all skill levels</li>
          <li>Promote lifelong learning and growth</li>
        </ul>
        Best of all, Skill Swap is a completely free learning program, ensuring that everyone has the opportunity to learn and share without financial barriers.

        Join us to teach what you know, learn what you love, and be part of a movement that values learning without limits.
      </p>
    </div>
  );
};

export default About;