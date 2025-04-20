
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/user';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole | UserRole[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, requiredRole }) => {
  const { currentUser, isLoading } = useAuth();

  // Show loading indicator while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Check if user has the required role
  const hasRequiredRole = Array.isArray(requiredRole) 
    ? requiredRole.includes(currentUser.role)
    : currentUser.role === requiredRole;

  // Redirect to dashboard if not authorized
  if (!hasRequiredRole) {
    return <Navigate to="/dashboard" />;
  }

  // Render the protected content
  return <>{children}</>;
};

export default RoleBasedRoute;
