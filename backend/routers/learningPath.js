const express = require('express');
const router = express.Router();
const learningPathController = require('../controllers/learningPathController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const {
  validateTierCreate,
  validateTierUpdate,
  validateLevelCreate,
  validateLevelUpdate,
  validateId
} = require('../middleware/validation');

// Public routes
router.get('/tiers', learningPathController.getTiers);
router.get('/tiers/:tierCode', learningPathController.getTierByCode);

// Admin routes với validation
router.post('/tiers', authenticate, requireAdmin, validateTierCreate, learningPathController.createTier);
router.put('/tiers/:id', authenticate, requireAdmin, validateTierUpdate, learningPathController.updateTier);
router.delete('/tiers/:id', authenticate, requireAdmin, validateId, learningPathController.deleteTier);

router.get('/tiers/:tierId/levels', learningPathController.getLevelsByTier);
router.get('/levels/:levelId', learningPathController.getLevelDetail);
router.post('/levels', authenticate, requireAdmin, validateLevelCreate, learningPathController.createLevel);
router.put('/levels/:id', authenticate, requireAdmin, validateLevelUpdate, learningPathController.updateLevel);
router.delete('/levels/:id', authenticate, requireAdmin, validateId, learningPathController.deleteLevel);

// Vocabulary routes
router.get('/levels/:levelId/vocabulary', learningPathController.getVocabularyByLevel);
router.post('/vocabulary', authenticate, requireAdmin, learningPathController.createVocabulary);
router.put('/vocabulary/:id', authenticate, requireAdmin, learningPathController.updateVocabulary);
router.delete('/vocabulary/:id', authenticate, requireAdmin, validateId, learningPathController.deleteVocabulary);

// Exercise routes
router.get('/levels/:levelId/exercises', learningPathController.getExercisesByLevel);
router.post('/exercises', authenticate, requireAdmin, learningPathController.createExercise);
router.put('/exercises/:id', authenticate, requireAdmin, learningPathController.updateExercise);
router.delete('/exercises/:id', authenticate, requireAdmin, validateId, learningPathController.deleteExercise);
router.get('/exercise-types', learningPathController.getExerciseTypes);

module.exports = router;
