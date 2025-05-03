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
                <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />
                <Route path="/my-calendar" element={<ProtectedRoute element={<MyCalendar />} />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/skill-needed" element={<SkillNeeded />} /> {/* Corrected route */}
                <Route path="/skill-offered" element={<SkillOffered />} /> {/* Corrected route */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
