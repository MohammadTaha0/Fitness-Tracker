// PrivateRoute.js
import React, { Component } from 'react';
import { Navigate, Route } from 'react-router-dom';
import Auth from '../services/authServices';

const PrivateRoute = ({ Component }) => {
    const { isAuthenticated } = Auth();
    return isAuthenticated() ? <Component /> : <Navigate to='/login' />
};

export default PrivateRoute;
