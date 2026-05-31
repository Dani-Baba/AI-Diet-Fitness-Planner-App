import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user, loading }) => {
  // Agar Firebase abhi check kar raha hai, toh loading dikhao
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Agar user login nahi hai, toh seedha login page par bhej do
  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default ProtectedRoute;