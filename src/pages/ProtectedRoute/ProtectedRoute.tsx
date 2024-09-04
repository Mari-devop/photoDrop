import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem('authToken');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  const isTokenExpired = () => {
    if (!tokenExpiration) return true;
    const expirationDate = parseInt(tokenExpiration, 10);
    return new Date().getTime() > expirationDate;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        window.location.href = '/';  
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval); 
  }, []);

  if (!token || isTokenExpired()) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
