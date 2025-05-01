import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import About from './pages/About';
import Contact from './pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login'; // Keep this import
import Signup from './pages/signup'; // Import the Signup page

const Dashboard = () => <h1>User Dashboard</h1>;
const Profile = () => <h1>User Profile</h1>;
const Chat = () => <h1>Chat</h1>;

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> {/* Render Home.js as the landing page */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} /> {/* Use the imported Login component */}
                <Route path="/signup" element={<Signup />} /> {/* Add the Signup route */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer /> {/* Add Footer here */}
        </Router>
    );
};

export default App;