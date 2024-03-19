import React, { Component } from 'react';
import { Navigate, Route } from 'react-router-dom';
import Auth from '../services/authServices';

const PrivateRoute = ({ Component, ...rest }) => {
    const { isAuthenticated } = Auth();
    return isAuthenticated() ? <Component {...rest} /> : <Navigate to='/login' />
};

export default PrivateRoute;
