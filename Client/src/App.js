import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import About    from './pages/About';
import Contact  from './pages/Contact';
import Booking  from './pages/Booking';
import Profile    from './pages/profile';
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