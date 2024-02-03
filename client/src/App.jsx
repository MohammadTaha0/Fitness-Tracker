import { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import PrivateRoute from './Routes/PrivateRoute';
import Profile from './pages/Profile';
import Auth from './services/authServices';

function App() {
  const { isAuthenticated, logout } = Auth();
  const Logout = () => {
    useEffect(() => {
      logout();
    }, []);
    return <Navigate to="/login" replace />;
  };
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/profile"
          element={<PrivateRoute Component={Profile} />}
        />
      </Routes>
    </Router>
  )
}

export default App
