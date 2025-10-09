const supabase = require('../config/supabaseClient');
const Admin = require('../models/Admin');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

class AuthController {
  // Admin Register
  async adminRegister(req, res) {
    try {
      const { email, password, full_name } = req.body;

      // 1. Kiểm tra email đã tồn tại chưa
      const existingAdmin = await Admin.findByEmail(email);
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Email đã được sử dụng'
        });
      }

      // 2. Tạo user trong Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: full_name,
            role: 'admin'
          }
        }
      });

      if (authError) {
        console.error('Supabase Auth signup error:', authError);
        return res.status(400).json({
          success: false,
          message: authError.message || 'Không thể tạo tài khoản'
        });
      }

      // 3. Tạo record trong bảng admin_users
      const adminData = {
        id: authData.user.id,
        email: email,
        full_name: full_name || null,
        role: 'admin',
        is_active: true,
        password_hash: await bcrypt.hash(password, 10)
      };

      const admin = await Admin.create(adminData);

      // 4. Tạo JWT token
      const token = generateToken({
        id: admin.id,
        email: admin.email,
        role: admin.role,
        type: 'admin'
      });

      res.status(201).json({
        success: true,
        message: 'Đăng ký admin thành công',
        data: {
          user: {
            id: admin.id,
            email: admin.email,
            full_name: admin.full_name,
            role: admin.role
          },
          token,
          session: authData.session
        }
      });

    } catch (error) {
      console.error('Admin register error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server nội bộ'
      });
    }
  }

  // Admin Login
  async adminLogin(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Đăng nhập qua Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không chính xác'
        });
      }

      // 2. Kiểm tra admin bằng Model
      const admin = await Admin.findByEmail(email);
      if (!admin) {
        await supabase.auth.signOut();
        return res.status(403).json({
          success: false,
          message: 'Tài khoản không có quyền truy cập admin'
        });
      }

      // 3. Cập nhật last login
      await Admin.updateLastLogin(admin.id);

      // 4. Tạo JWT token
      const token = generateToken({
        id: admin.id,
        email: admin.email,
        role: admin.role,
        type: 'admin'
      });

      res.json({
        success: true,
        message: 'Đăng nhập admin thành công',
        data: {
          user: {
            id: admin.id,
            email: admin.email,
            full_name: admin.full_name,
            role: admin.role
          },
          token,
          session: authData.session
        }
      });

    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server nội bộ'
      });
    }
  }

  // User Login
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Đăng nhập qua Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không chính xác'
        });
      }

      // 2. Lấy thông tin user từ Model
      const user = await User.findByEmail(email);
      if (!user) {
        await supabase.auth.signOut();
        return res.status(404).json({
          success: false,
          message: 'Tài khoản người dùng không tồn tại'
        });
      }

      // 3. Cập nhật last login
      await User.updateLastLogin(user.id);

      // 4. Tạo JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: 'user',
        type: 'user'
      });

      res.json({
        success: true,
        message: 'Đăng nhập thành công',
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            full_name: user.full_name,
            avatar_url: user.avatar_url,
            is_verified: user.is_verified
          },
          token,
          session: authData.session
        }
      });

    } catch (error) {
      console.error('User login error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server nội bộ'
      });
    }
  }

  // Logout
  async logout(req, res) {
    try {
      const { session_token } = req.body;
      
      if (session_token) {
        await supabase.auth.signOut();
      }

      res.json({
        success: true,
        message: 'Đăng xuất thành công'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server nội bộ'
      });
    }
  }

  // Get current user
  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const userType = req.user.type;

      if (userType === 'admin') {
        const admin = await Admin.findById(userId);
        if (!admin) {
          return res.status(404).json({
            success: false,
            message: 'Admin không tồn tại'
          });
        }

        res.json({
          success: true,
          data: {
            user: {
              id: admin.id,
              email: admin.email,
              full_name: admin.full_name,
              role: admin.role
            },
            role: 'admin'
          }
        });
      } else {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'Người dùng không tồn tại'
          });
        }

        res.json({
          success: true,
          data: {
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
              full_name: user.full_name,
              avatar_url: user.avatar_url,
              is_verified: user.is_verified
            },
            role: 'user'
          }
        });
      }
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server nội bộ'
      });
    }
  }

  // Refresh token
  async refreshToken(req, res) {
    try {
      const { refresh_token } = req.body;

      if (!refresh_token) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token là bắt buộc'
        });
      }

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token
      });

      if (error) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token không hợp lệ'
        });
      }

      // Tạo JWT token mới
      const user = await User.findByEmail(data.user.email);
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: 'user',
        type: 'user'
      });

      res.json({
        success: true,
        data: {
          token,
          session: data.session
        }
      });

    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server nội bộ'
      });
    }
  }

  // Check email exists
  async checkEmail(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email là bắt buộc'
        });
      }

      // Check in users table
      const user = await User.findByEmail(email);
      const admin = await Admin.findByEmail(email);

      res.json({
        success: true,
        data: {
          exists: !!(user || admin),
          is_admin: !!admin
        }
      });

    } catch (error) {
      console.error('Check email error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server nội bộ'
      });
    }
  }
}

module.exports = new AuthController();