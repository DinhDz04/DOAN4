import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, AuthResponse } from '../services/authApi';

type UserType = AuthResponse['data']['user'];

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  user: UserType | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Try to get profile from API
        const userProfile = await authApi.getProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
        setIsAdmin(userProfile.role === 'admin');
      }
    } catch (error) {
      console.log('🔍 No valid session found');
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName?: string) => {
    try {
      setIsLoading(true);
      console.log('📝 Attempting admin registration...');

      const response = await authApi.registerAdmin({ 
        email, 
        password, 
        full_name: fullName 
      });

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token) {
        console.error('❌ Không nhận được token từ backend:', response);
        throw new Error('Không nhận được token từ backend.');
      }

      // Lưu token
      localStorage.setItem('authToken', token);

      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');

      console.log('✅ Registration successful! Token saved.');
    } catch (error: any) {
      console.error('❌ Registration failed:', error);

      if (error.message.includes('Network') || error.message.includes('fetch')) {
        throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra backend có đang chạy không.');
      } else if (error.message.includes('Email đã được sử dụng')) {
        throw new Error('Email này đã được đăng ký.');
      } else {
        throw new Error(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, isAdmin?: boolean) => {
    try {
      setIsLoading(true);
      console.log('🔐 Attempting login...');

      const response = await authApi.login({ email, password, isAdmin });

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token) {
        console.error('❌ Không nhận được token từ backend:', response);
        throw new Error('Không nhận được token từ backend.');
      }

      // Lưu token
      localStorage.setItem('authToken', token);

      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');

      console.log('✅ Login successful! Token saved.');
    } catch (error: any) {
      console.error('❌ Login failed:', error);

      if (error.message.includes('Network') || error.message.includes('fetch')) {
        throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra backend có đang chạy không.');
      } else if (error.message.includes('401')) {
        throw new Error('Email hoặc mật khẩu không đúng.');
      } else {
        throw new Error(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        isLoading,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};