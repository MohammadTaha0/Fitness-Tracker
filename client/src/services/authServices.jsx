const TOKEN_KEY = "jwt";

import axios from 'axios';
import React, { useState } from 'react'

export default function Auth() {
    const [authenticated, setIsAuthenticated] = useState(!!localStorage.getItem(TOKEN_KEY));

    const getToken = () => {
        return localStorage.getItem(TOKEN_KEY);
    }

    const setToken = (token) => {
        setIsAuthenticated(true);
        return localStorage.setItem(TOKEN_KEY, token);
    }

    const removeToken = () => {
        setIsAuthenticated(false);
        return localStorage.removeItem(TOKEN_KEY);
    }

    const logout = () => {
        removeToken();
    };
    const isAuthenticated = () => {
        return authenticated;
    };
    const authAxios = axios.create({
        baseURL: 'http://localhost:5000/api', // Replace with your API base URL
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    return { getToken, setToken, removeToken, logout, isAuthenticated, authAxios };
}

