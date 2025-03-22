import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useSelector(state => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
