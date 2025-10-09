const { verifyToken } = require('../utils/jwt');
const supabase = require('../config/supabaseClient');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('🟢 Received token:', token?.slice(0, 40)); // chỉ in đầu token

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    console.log('✅ Decoded token payload:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ Auth middleware error:', error.message);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};


const requireAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }
    next();
  } catch (error) {
    console.error('❌ Admin check error:', error.message);
    res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
};

module.exports = { authenticate, requireAdmin };
