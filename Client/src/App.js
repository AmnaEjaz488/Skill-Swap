import React, { useState, useEffect } from 'react';
import {
       BrowserRouter as Router,
       Routes,
       Route,
       Navigate
     } from 'react-router-dom';

import Home           from './pages/Home';
import Dashboard      from './pages/Dashboard.js';
import Profile        from './pages/Profile';
import Booking        from './pages/Booking';
import MyCalendar     from './pages/MyCalendar';
import Login          from './pages/Login';
import Signup         from './pages/Signup';
import PrivacyPolicy  from './pages/PrivacyPolicy';
import SkillNeeded    from './pages/SkillNeeded';
import SkillOffered   from './pages/SkillOffered';
import Chat           from './pages/Chat';
import About          from './pages/About';
import Contact        from './pages/Contact';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for JWT token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setIsAuthenticated(!!token); // Set to true if token exists
    }, []);

    // Protected Route Component
    const ProtectedRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />
                <Route path="/my-calendar" element={<ProtectedRoute element={<MyCalendar />} />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/skill-needed" element={<SkillNeeded />} />
                <Route path="/skill-offered" element={<SkillOffered />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
