import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
function AuthCheck({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Case 1: If not authenticated and trying to access a page other than login/register
  if (!isAuthenticated && !location.pathname.includes('/login') && !location.pathname.includes('/register')) {
    return <Navigate to="/auth/login" />;
  }

  // Case 2: If authenticated and trying to access login or register page
  if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Case 3: If authenticated but non-admin user tries to access admin routes
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.startsWith('/admin')) {
    return <Navigate to="/unauthPage" />;
  }

  // Case 4: If authenticated and admin tries to access any shop route
  if (isAuthenticated && user?.role === 'admin' && location.pathname.startsWith('/shop')) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Default: Allow the children to be rendered (valid route)
  return <>{children}</>;
}
export default AuthCheck;