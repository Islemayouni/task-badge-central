
export type UserRole = 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  managerLevel?: 'N1' | 'N2' | 'N3'; // Only for manager role
  department?: string;
  badges: string[];
  taskCount: {
    completed: number;
    total: number;
  };
  teamId?: string;
  joinDate: string;
  lastActive: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
