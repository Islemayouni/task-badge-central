
// Définition plus précise des rôles utilisateur
export type UserRole = 'n1' | 'n2' | 'employee';

export type UserLevel = {
  current: number;
  total: number;
  progress: number;
};

export interface User {
  id: string;
  email: string;
  role: UserRole;
  nom?: string;
  prenom?: string;
  level?: UserLevel;
  department?: string;
  managerId?: string; // ID du manager responsable
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Fonction explicite pour vérifier si un rôle est un rôle de manager
export const isManager = (role: UserRole): boolean => {
  console.log("Checking if role is manager:", role);
  return role === 'n1' || role === 'n2';
};
