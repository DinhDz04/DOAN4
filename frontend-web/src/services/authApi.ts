// frontend-web/src/services/authApi.ts
import { apiService } from './api';

// Kiểu dữ liệu phản hồi đăng nhập
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      full_name?: string;
      username?: string;
      role: 'admin' | 'user';
    };
    token: string;
    session?: any;
  };
}

// Kiểu dữ liệu đăng ký
export interface RegisterData {
  email: string;
  password: string;
  full_name?: string;
}

export const authApi = {
  // Đăng ký admin
  registerAdmin: async (data: RegisterData): Promise<AuthResponse> => {
    return apiService.post('/api/auth/admin/register', data);
  },

  // Đăng nhập (admin hoặc user)
  login: async (data: { email: string; password: string; isAdmin?: boolean }): Promise<AuthResponse> => {
    return apiService.post(
      data.isAdmin ? '/api/auth/admin/login' : '/api/auth/user/login',
      data
    );
  },

  // Đăng xuất
  logout: async (): Promise<void> => {
    return apiService.post('/api/auth/logout', {});
  },

  // Lấy thông tin người dùng hiện tại
  getProfile: async (): Promise<AuthResponse['data']['user']> => {
    const response = await apiService.get('/api/auth/profile');
    return response.data.user;
  },

  // Kiểm tra email đã tồn tại chưa
  checkEmail: async (email: string): Promise<{ exists: boolean; is_admin: boolean }> => {
    const response = await apiService.get(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
    return response.data;
  },
};