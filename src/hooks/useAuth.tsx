
import { createContext, useContext, useState } from 'react';
import { User, AuthState } from '@/types/user';

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
      // Simulation de l'authentification - À remplacer par votre logique d'auth
      const isManager = email.includes('manager');
      const user: User = {
        id: '1',
        email,
        role: isManager ? 'manager' : 'employee',
        nom: isManager ? 'Durand' : 'Martin',
        prenom: isManager ? 'Thomas' : 'Sophie'
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
