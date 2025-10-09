const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { 
  validateAdminRegister,
  validateAdminLogin, 
  validateLogin 
} = require('../middleware/validation');

// Public routes
router.post('/admin/register', validateAdminRegister, authController.adminRegister);
router.post('/admin/login', validateAdminLogin, authController.adminLogin);
router.post('/user/login', validateLogin, authController.userLogin);
router.post('/logout', authController.logout);
router.get('/check-email', authController.checkEmail);

// Protected routes
router.get('/profile', authenticate, authController.getCurrentUser);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;