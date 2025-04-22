
import { createContext, useContext, useState } from 'react';
import { User, AuthState, UserRole } from '@/types/user';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // Simulation de l'authentification avec différents rôles
      let role: UserRole;
      if (email.includes('n1')) {
        role = 'n1';
      } else if (email.includes('n2')) {
        role = 'n2';
      } else {
        role = 'employee';
      }

      const user: User = {
        id: role === 'employee' ? 'employee123' : '1', // Ajout d'un ID stable pour l'employé
        email,
        role,
        nom: role === 'n1' ? 'Durand' : role === 'n2' ? 'Martin' : 'Bernard',
        prenom: role === 'n1' ? 'Thomas' : role === 'n2' ? 'Sophie' : 'Julie',
        level: {
          current: 2,
          total: 5,
          progress: 45
        },
        department: role === 'employee' ? 'Développement' : 'Management'
      };
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
