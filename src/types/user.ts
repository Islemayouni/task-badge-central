
export type UserRole = 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  nom?: string;
  prenom?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
