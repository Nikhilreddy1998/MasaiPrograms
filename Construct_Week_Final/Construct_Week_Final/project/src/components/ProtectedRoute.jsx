import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, currentUser } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;