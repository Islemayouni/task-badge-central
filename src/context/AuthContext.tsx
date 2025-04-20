
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/user';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  isManager: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "manager@entreprise.com",
    firstName: "Thomas",
    lastName: "Durand",
    role: "manager",
    managerLevel: "N1",
    avatar: "https://github.com/shadcn.png",
    department: "IT",
    badges: ["team-leader", "problem-solver", "efficient"],
    taskCount: { completed: 42, total: 55 },
    teamId: "team-1",
    joinDate: "2022-06-15",
    lastActive: "2025-04-20"
  },
  {
    id: "2",
    email: "employee@entreprise.com",
    firstName: "Marie",
    lastName: "Laurent",
    role: "employee",
    avatar: "",
    department: "Development",
    badges: ["coder", "team-player"],
    taskCount: { completed: 38, total: 47 },
    teamId: "team-1",
    joinDate: "2022-09-10",
    lastActive: "2025-04-19"
  }
];

// Define permissions for different roles
const rolePermissions: Record<UserRole, string[]> = {
  manager: [
    'view_dashboard',
    'view_team_performance',
    'assign_badges',
    'create_task',
    'assign_task',
    'configure_platform',
    'manage_connections',
    'manage_users',
    'define_badge_rules',
    'define_task_types'
  ],
  employee: [
    'view_dashboard',
    'view_own_performance',
    'view_own_badges',
    'view_own_tasks',
    'complete_task'
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if there's a saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call to authenticate
      // For demo, we're using the mock data
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        // In a real app, you would verify the password here
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false;
    return rolePermissions[currentUser.role].includes(permission);
  };

  const isManager = (): boolean => {
    return currentUser?.role === 'manager';
  };

  const value = {
    currentUser,
    isLoading,
    error,
    login,
    logout,
    hasPermission,
    isManager
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
