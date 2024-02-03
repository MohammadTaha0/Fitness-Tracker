import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';

import Navbar from './components/Navbar.jsx';
import About from './components/About.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import './App.css';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/about' element={
          <About />
        } />
        <Route path='/login' element={
          <Login />
        } />
        <Route path='/register' element={
          <Register />
        } />
      </Routes>
    </Router>
  )
}

export default App
