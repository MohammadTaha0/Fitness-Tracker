const TOKEN_KEY = "jwt";

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
    return { getToken, setToken, removeToken, logout, isAuthenticated };
}

