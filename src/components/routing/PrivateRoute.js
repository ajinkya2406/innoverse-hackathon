import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // TODO: Replace with actual auth check from Redux store
    const isAuthenticated = localStorage.getItem('token') !== null;
    
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
