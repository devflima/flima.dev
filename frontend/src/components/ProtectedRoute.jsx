import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const [currentTime] = useState(() => Date.now() / 1000);
  let isValid = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);

      
      // Quarkus/SmallRye JWT usually puts roles in 'groups' claim
      const roles = decoded.groups || [];
      if (decoded.exp > currentTime && (roles.includes('OWNER') || decoded.role === 'OWNER')) {
        isValid = true;
      }
    } catch {
      console.error('Invalid token format');
    }
  }

  if (!isValid) {
    // Clear any invalid state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
