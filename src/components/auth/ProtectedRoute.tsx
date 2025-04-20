
import { Navigate } from 'react-router-dom';
import { User } from '@/types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'manager' | 'employee';
  user: User | null;
}

const ProtectedRoute = ({ children, requiredRole, user }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
