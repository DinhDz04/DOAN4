import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    
    if (adminToken) {
      setUser({
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        token: adminToken,
        refreshToken: '',
      });
    } else if (userToken) {
      setUser({
        id: 'user-1',
        name: 'Demo User',
        email: 'user@example.com',
        role: 'user',
        token: userToken,
        refreshToken: '',
      });
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, isAdmin = false) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isAdmin && email === 'admin@example.com' && password === 'admin123') {
        const token = 'mock-admin-token';
        localStorage.setItem('adminToken', token);
        setUser({
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          token,
          refreshToken: '',
        });
      } else if (!isAdmin && email === 'user@example.com' && password === 'user123') {
        const token = 'mock-user-token';
        localStorage.setItem('userToken', token);
        setUser({
          id: 'user-1',
          name: 'Demo User',
          email: 'user@example.com',
          role: 'user',
          token,
          refreshToken: '',
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 
