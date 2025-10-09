// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('🔐 JWT_SECRET in use:', process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// 🔥 THÊM: Log tất cả requests
app.use((req, res, next) => {
  console.log(`\n📥 ${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is working!',
    data: { version: '1.0.0' }
  });
});

// Routes
try {
  const authRouter = require('./routers/auth');
  app.use('/api/auth', authRouter);
  console.log('✅ Auth routes loaded');
  
  // 🔥 THÊM: Log tất cả routes đã đăng ký
  console.log('\n📋 Registered Auth Routes:');
  authRouter.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      console.log(`  ${methods} /api/auth${middleware.route.path}`);
    }
  });
  
} catch (error) {
  console.log('⚠️ Auth routes error:', error.message);
  console.error(error);
}

try {
  app.use('/api/learning-path', require('./routers/learningPath'));
  console.log('✅ Learning path routes loaded');
} catch (error) {
  console.log('⚠️ Learning path routes skipped:', error.message);
}

// 404 handler - PHẢI Ở CUỐI
app.use((req, res, next) => {
  console.log('❌ 404 - Route not found:', req.originalUrl);
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('❌ Error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health\n`);
});