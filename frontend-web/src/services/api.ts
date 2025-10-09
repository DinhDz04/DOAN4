// frontend-web/src/services/api.ts
const API_BASE_URL ='http://localhost:5000';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔑 Token being sent:', token.substring(0, 20) + '...'); // Debug: xem token
    } else {
      console.warn('⚠️ No token found in localStorage');
    }

    console.log(`🔄 API Call: ${options.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('📡 Response status:', response.status);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        console.error('❌ 401 Unauthorized - Token invalid or expired');
        
        // Debug: Kiểm tra response body
        const errorBody = await response.json().catch(() => null);
        console.error('Error details:', errorBody);
        
        localStorage.removeItem('authToken');
        
        // Chỉ redirect nếu không phải đang ở trang login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/admin/login';
        }
        
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.message || `Lỗi server: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      console.error('❌ API request failed:', error);
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra backend.');
      }
      throw error;
    }
  }

  async get(endpoint: string) {
    return this.request(endpoint);
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Method để debug token
  debugToken() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('❌ No token in localStorage');
      return;
    }

    console.log('🔍 Token exists:', token.substring(0, 30) + '...');
    
    // Decode JWT để xem nội dung (không verify)
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      console.log('📦 Token payload:', payload);
      
      // Kiểm tra expiry
      if (payload.exp) {
        const expiryDate = new Date(payload.exp * 1000);
        const now = new Date();
        console.log('⏰ Token expires at:', expiryDate.toLocaleString());
        console.log('⏰ Current time:', now.toLocaleString());
        console.log('✅ Token valid:', expiryDate > now);
      }
    } catch (e) {
      console.error('❌ Failed to decode token:', e);
    }
  }
}

export const apiService = new ApiService();

// Expose debug method globally (for testing in console)
if (typeof window !== 'undefined') {
  (window as any).debugAuth = () => apiService.debugToken();
}