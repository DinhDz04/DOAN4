const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors: errors.array()
    });
  }
  next();
};

// Auth validations
// middleware/validation.js
const validateAdminRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    // ❌ Bỏ dòng này đi tạm thời
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    // .withMessage('Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số'),
  body('full_name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Họ tên phải từ 2-100 ký tự'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  handleValidationErrors
];

const validateAdminLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  handleValidationErrors
];

// Tier validations
const validateTierCreate = [
  body('name')
    .notEmpty()
    .withMessage('Tên bậc học là bắt buộc')
    .isLength({ max: 100 })
    .withMessage('Tên không được vượt quá 100 ký tự'),
  body('code')
    .isIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
    .withMessage('Mã bậc học phải là A1, A2, B1, B2, C1 hoặc C2'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Mô tả không được vượt quá 500 ký tự'),
  body('order')
    .isInt({ min: 1 })
    .withMessage('Thứ tự phải là số nguyên dương'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Trạng thái phải là boolean'),
  handleValidationErrors
];

const validateTierUpdate = [
  param('id')
    .isUUID()
    .withMessage('ID không hợp lệ'),
  ...validateTierCreate
];

// Level validations
const validateLevelCreate = [
  body('tierId')
    .isUUID()
    .withMessage('Tier ID không hợp lệ'),
  body('name')
    .notEmpty()
    .withMessage('Tên level là bắt buộc')
    .isLength({ max: 100 })
    .withMessage('Tên không được vượt quá 100 ký tự'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Mô tả không được vượt quá 500 ký tự'),
  body('order')
    .isInt({ min: 1 })
    .withMessage('Thứ tự phải là số nguyên dương'),
  body('unlockConditions')
    .optional()
    .isArray()
    .withMessage('Điều kiện mở khóa phải là mảng'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Trạng thái phải là boolean'),
  handleValidationErrors
];

const validateLevelUpdate = [
  param('id')
    .isUUID()
    .withMessage('ID không hợp lệ'),
  ...validateLevelCreate.slice(1) // Bỏ tierId validation khi update
];

// Vocabulary validations
const validateVocabularyCreate = [
  body('levelId')
    .isUUID()
    .withMessage('Level ID không hợp lệ'),
  body('word')
    .notEmpty()
    .withMessage('Từ vựng là bắt buộc')
    .isLength({ max: 255 })
    .withMessage('Từ vựng không được vượt quá 255 ký tự'),
  body('pronunciation')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Phát âm không được vượt quá 255 ký tự'),
  body('meaning')
    .notEmpty()
    .withMessage('Nghĩa là bắt buộc'),
  body('exampleSentence')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Câu ví dụ không được vượt quá 500 ký tự'),
  body('audioUrl')
    .optional()
    .isURL()
    .withMessage('URL audio không hợp lệ'),
  body('orderIndex')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Thứ tự phải là số nguyên không âm'),
  handleValidationErrors
];

// Exercise validations
const validateExerciseCreate = [
  body('levelId')
    .isUUID()
    .withMessage('Level ID không hợp lệ'),
  body('exerciseTypeId')
    .isUUID()
    .withMessage('Exercise Type ID không hợp lệ'),
  body('title')
    .notEmpty()
    .withMessage('Tiêu đề là bắt buộc')
    .isLength({ max: 255 })
    .withMessage('Tiêu đề không được vượt quá 255 ký tự'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Mô tả không được vượt quá 500 ký tự'),
  body('content')
    .isObject()
    .withMessage('Nội dung phải là object'),
  body('difficulty')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Độ khó phải từ 1 đến 5'),
  body('points')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Điểm phải là số nguyên không âm'),
  body('orderIndex')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Thứ tự phải là số nguyên không âm'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Trạng thái phải là boolean'),
  handleValidationErrors
];

// ID validation
const validateId = [
  param('id')
    .isUUID()
    .withMessage('ID không hợp lệ'),
  handleValidationErrors
];

module.exports = {
  validateAdminRegister,
  validateLogin,
  validateAdminLogin,
  validateTierCreate,
  validateTierUpdate,
  validateLevelCreate,
  validateLevelUpdate,
  validateVocabularyCreate,
  validateExerciseCreate,
  validateId,
  handleValidationErrors
};