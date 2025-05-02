<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/login';
import Signup from './pages/signup';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => <h1>User Dashboard</h1>;
const Profile = () => <h1>User Profile</h1>;
const Chat = () => <h1>Chat</h1>;

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
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import About    from './pages/About';
import Contact  from './pages/Contact';
import Booking  from './pages/Booking';
import Profile    from './pages/Profile';
import MyCalendar from './pages/MyCalendar.js'; 

const Dashboard = () => <h1>User Dashboard</h1>;
const Chat      = () => <h1>Chat</h1>;
const Login     = () => <h1>Login</h1>;

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home        />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile"   element={<Profile   />} />
        <Route path="/booking"      element={<Booking  />} />
        <Route path="/my-calendar"  element={<MyCalendar />} />
        <Route path="/chat"      element={<Chat     />} />
        <Route path="/login"     element={<Login    />} />
        <Route path="/about"     element={<About    />} />
        <Route path="/contact"   element={<Contact  />} />
      </Routes>
      <Footer />
    </Router>
  );
}
>>>>>>> 25945da43429f90bf0535410fa72e24baa3fda5a
