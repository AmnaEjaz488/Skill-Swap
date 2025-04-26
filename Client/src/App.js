import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => <h1>User Dashboard</h1>;
const Profile = () => <h1>User Profile</h1>;
const Chat = () => <h1>Chat</h1>;
const Login = () => <h1>Login</h1>;

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> {/* Render Home.js as the landing page */}
                {/* <Route path="/skills" element={<Skills />} /> */} {/* Temporarily removed waiting for backend */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;