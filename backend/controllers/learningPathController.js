const Tier = require('../models/Tier');
const Level = require('../models/Level');
const Vocabulary = require('../models/Vocabulary');

class LearningPathController {
  // ===== TIER METHODS =====

  // Get all tiers
  async getTiers(req, res) {
    try {
      const tiers = await Tier.findAll();

      const formattedTiers = tiers.map(tier => ({
        id: tier.id,
        name: tier.display_name,
        code: tier.name,
        description: tier.description,
        order: tier.order_index,
        isActive: tier.is_active,
        levelCount: tier.levels[0]?.count || 0,
        createdAt: tier.created_at,
        updatedAt: tier.updated_at
      }));

      res.json({
        success: true,
        data: formattedTiers,
        total: formattedTiers.length
      });

    } catch (error) {
      console.error('Get tiers error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách bậc học'
      });
    }
  }

  // Get tier by code
  async getTierByCode(req, res) {
    try {
      const { tierCode } = req.params;

      const tier = await Tier.findByCode(tierCode);
      if (!tier) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy bậc học'
        });
      }

      const formattedTier = {
        id: tier.id,
        name: tier.display_name,
        code: tier.name,
        description: tier.description,
        order: tier.order_index,
        isActive: tier.is_active,
        levelCount: tier.levels[0]?.count || 0,
        createdAt: tier.created_at,
        updatedAt: tier.updated_at
      };

      res.json({
        success: true,
        data: formattedTier
      });

    } catch (error) {
      console.error('Get tier error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy thông tin bậc học'
      });
    }
  }

  // Create tier
  async createTier(req, res) {
    try {
      const { name, code, description, order, isActive = true } = req.body;

      // Check if order index exists
      const orderExists = await Tier.isOrderIndexExists(order);
      if (orderExists) {
        return res.status(400).json({
          success: false,
          message: 'Thứ tự đã tồn tại'
        });
      }

      // Check if code exists
      const existingTier = await Tier.findByCode(code);
      if (existingTier) {
        return res.status(400).json({
          success: false,
          message: 'Mã bậc học đã tồn tại'
        });
      }

      const tierData = {
        name: code,
        display_name: name,
        description,
        order_index: order,
        is_active: isActive
      };

      const tier = await Tier.create(tierData);

      res.status(201).json({
        success: true,
        message: 'Tạo bậc học thành công',
        data: tier
      });

    } catch (error) {
      console.error('Create tier error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo bậc học'
      });
    }
  }

  // Update tier
  async updateTier(req, res) {
    try {
      const { id } = req.params;
      const { name, code, description, order, isActive } = req.body;

      // Check if tier exists
      const existingTier = await Tier.findById(id);
      if (!existingTier) {
        return res.status(404).json({
          success: false,
          message: 'Bậc học không tồn tại'
        });
      }

      // Check if order index exists (excluding current tier)
      if (order !== existingTier.order_index) {
        const orderExists = await Tier.isOrderIndexExists(order, id);
        if (orderExists) {
          return res.status(400).json({
            success: false,
            message: 'Thứ tự đã tồn tại'
          });
        }
      }

      const updateData = {
        name: code,
        display_name: name,
        description,
        order_index: order,
        is_active: isActive,
        updated_at: new Date().toISOString()
      };

      const tier = await Tier.update(id, updateData);

      res.json({
        success: true,
        message: 'Cập nhật bậc học thành công',
        data: tier
      });

    } catch (error) {
      console.error('Update tier error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật bậc học'
      });
    }
  }

  // Delete tier
  async deleteTier(req, res) {
    try {
      const { id } = req.params;

      // Check if tier exists
      const existingTier = await Tier.findById(id);
      if (!existingTier) {
        return res.status(404).json({
          success: false,
          message: 'Bậc học không tồn tại'
        });
      }

      await Tier.delete(id);

      res.json({
        success: true,
        message: 'Xóa bậc học thành công'
      });

    } catch (error) {
      console.error('Delete tier error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi xóa bậc học'
      });
    }
  }

  // ===== LEVEL METHODS =====

  // Get levels by tier
  async getLevelsByTier(req, res) {
    try {
      const { tierId } = req.params;

      const levels = await Level.findByTierId(tierId);

      const formattedLevels = levels.map(level => ({
        id: level.id,
        tierId: level.tier_id,
        name: level.name,
        description: level.description,
        order: level.order_index,
        isLocked: !level.is_active,
        unlockConditions: level.unlock_condition,
        vocabularyCount: level.vocabularies[0]?.count || 0,
        exerciseCount: level.exercises[0]?.count || 0,
        createdAt: level.created_at,
        updatedAt: level.updated_at
      }));

      res.json({
        success: true,
        data: formattedLevels,
        total: formattedLevels.length
      });

    } catch (error) {
      console.error('Get levels error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách levels'
      });
    }
  }

  // Get level detail
  async getLevelDetail(req, res) {
    try {
      const { levelId } = req.params;

      const level = await Level.findByIdWithDetails(levelId);
      if (!level) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy level'
        });
      }

      // Format vocabularies
      const formattedVocabularies = level.vocabularies.map(vocab => ({
        id: vocab.id,
        levelId: vocab.level_id,
        word: vocab.word,
        pronunciation: vocab.pronunciation,
        definition: vocab.meaning,
        example: vocab.example_sentence,
        audioUrl: vocab.audio_url,
        partOfSpeech: vocab.part_of_speech,
        orderIndex: vocab.order_index,
        createdAt: vocab.created_at,
        updatedAt: vocab.updated_at
      }));

      // Format exercises
      const formattedExercises = level.exercises.map(exercise => ({
        id: exercise.id,
        levelId: exercise.level_id,
        title: exercise.title,
        description: exercise.description,
        type: exercise.exercise_type?.name,
        displayType: exercise.exercise_type?.display_name,
        content: exercise.content,
        difficulty: exercise.difficulty,
        points: exercise.points,
        timeLimit: exercise.time_limit,
        orderIndex: exercise.order_index,
        isActive: exercise.is_active,
        createdAt: exercise.created_at,
        updatedAt: exercise.updated_at
      }));

      const comprehensiveExercise = formattedExercises.find(ex => ex.type === 'comprehensive');

      const formattedLevel = {
        id: level.id,
        tierId: level.tier_id,
        name: level.name,
        description: level.description,
        order: level.order_index,
        isLocked: !level.is_active,
        unlockConditions: level.unlock_condition,
        vocabulary: formattedVocabularies,
        exercises: formattedExercises,
        comprehensive: comprehensiveExercise,
        tier: {
          id: level.tier.id,
          name: level.tier.display_name,
          code: level.tier.name
        },
        vocabularyCount: formattedVocabularies.length,
        exerciseCount: formattedExercises.length,
        createdAt: level.created_at,
        updatedAt: level.updated_at
      };

      res.json({
        success: true,
        data: formattedLevel
      });

    } catch (error) {
      console.error('Get level detail error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy thông tin level'
      });
    }
  }

  // Create level
  async createLevel(req, res) {
    try {
      const { tierId, name, description, order, unlockConditions, isActive = true } = req.body;

      // Check if tier exists
      const tier = await Tier.findById(tierId);
      if (!tier) {
        return res.status(404).json({
          success: false,
          message: 'Bậc học không tồn tại'
        });
      }

      // Check if order index exists in tier
      const orderExists = await Level.isOrderIndexExists(tierId, order);
      if (orderExists) {
        return res.status(400).json({
          success: false,
          message: 'Thứ tự đã tồn tại trong bậc học này'
        });
      }

      const levelData = {
        tier_id: tierId,
        name,
        description,
        order_index: order,
        unlock_condition: unlockConditions,
        is_active: isActive
      };

      const level = await Level.create(levelData);

      res.status(201).json({
        success: true,
        message: 'Tạo level thành công',
        data: level
      });

    } catch (error) {
      console.error('Create level error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo level'
      });
    }
  }

  // Update level
  async updateLevel(req, res) {
    try {
      const { id } = req.params;
      const { name, description, order, unlockConditions, isActive } = req.body;

      // Check if level exists
      const existingLevel = await Level.findById(id);
      if (!existingLevel) {
        return res.status(404).json({
          success: false,
          message: 'Level không tồn tại'
        });
      }

      // Check if order index exists (excluding current level)
      if (order !== existingLevel.order_index) {
        const orderExists = await Level.isOrderIndexExists(existingLevel.tier_id, order, id);
        if (orderExists) {
          return res.status(400).json({
            success: false,
            message: 'Thứ tự đã tồn tại trong bậc học này'
          });
        }
      }

      const updateData = {
        name,
        description,
        order_index: order,
        unlock_condition: unlockConditions,
        is_active: isActive,
        updated_at: new Date().toISOString()
      };

      const level = await Level.update(id, updateData);

      res.json({
        success: true,
        message: 'Cập nhật level thành công',
        data: level
      });

    } catch (error) {
      console.error('Update level error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật level'
      });
    }
  }

  // Delete level
  async deleteLevel(req, res) {
    try {
      const { id } = req.params;

      // Check if level exists
      const existingLevel = await Level.findById(id);
      if (!existingLevel) {
        return res.status(404).json({
          success: false,
          message: 'Level không tồn tại'
        });
      }

      await Level.delete(id);

      res.json({
        success: true,
        message: 'Xóa level thành công'
      });

    } catch (error) {
      console.error('Delete level error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi xóa level'
      });
    }
  }

  // ===== VOCABULARY METHODS =====

  // Create vocabulary
  async createVocabulary(req, res) {
    try {
      const { levelId, word, pronunciation, meaning, exampleSentence, audioUrl, partOfSpeech, orderIndex } = req.body;

      // Check if level exists
      const level = await Level.findById(levelId);
      if (!level) {
        return res.status(404).json({
          success: false,
          message: 'Level không tồn tại'
        });
      }

      // Check if word exists in level
      const wordExists = await Vocabulary.isWordExists(levelId, word);
      if (wordExists) {
        return res.status(400).json({
          success: false,
          message: 'Từ vựng đã tồn tại trong level này'
        });
      }

      const vocabularyData = {
        level_id: levelId,
        word,
        pronunciation,
        meaning,
        example_sentence: exampleSentence,
        audio_url: audioUrl,
        part_of_speech: partOfSpeech,
        order_index: orderIndex
      };

      const vocabulary = await Vocabulary.create(vocabularyData);

      res.status(201).json({
        success: true,
        message: 'Tạo từ vựng thành công',
        data: vocabulary
      });

    } catch (error) {
      console.error('Create vocabulary error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo từ vựng'
      });
    }
  }

  // Update vocabulary
  async updateVocabulary(req, res) {
    try {
      const { id } = req.params;
      const { word, pronunciation, meaning, exampleSentence, audioUrl, partOfSpeech, orderIndex } = req.body;

      // Check if vocabulary exists
      const existingVocabulary = await Vocabulary.findById(id);
      if (!existingVocabulary) {
        return res.status(404).json({
          success: false,
          message: 'Từ vựng không tồn tại'
        });
      }

      // Check if word exists (excluding current vocabulary)
      if (word !== existingVocabulary.word) {
        const wordExists = await Vocabulary.isWordExists(existingVocabulary.level_id, word, id);
        if (wordExists) {
          return res.status(400).json({
            success: false,
            message: 'Từ vựng đã tồn tại trong level này'
          });
        }
      }

      const updateData = {
        word,
        pronunciation,
        meaning,
        example_sentence: exampleSentence,
        audio_url: audioUrl,
        part_of_speech: partOfSpeech,
        order_index: orderIndex,
        updated_at: new Date().toISOString()
      };

      const vocabulary = await Vocabulary.update(id, updateData);

      res.json({
        success: true,
        message: 'Cập nhật từ vựng thành công',
        data: vocabulary
      });

    } catch (error) {
      console.error('Update vocabulary error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật từ vựng'
      });
    }
  }

  // Delete vocabulary
  async deleteVocabulary(req, res) {
    try {
      const { id } = req.params;

      // Check if vocabulary exists
      const existingVocabulary = await Vocabulary.findById(id);
      if (!existingVocabulary) {
        return res.status(404).json({
          success: false,
          message: 'Từ vựng không tồn tại'
        });
      }

      await Vocabulary.delete(id);

      res.json({
        success: true,
        message: 'Xóa từ vựng thành công'
      });

    } catch (error) {
      console.error('Delete vocabulary error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi xóa từ vựng'
      });
    }
  }

  // Get vocabulary by level
  async getVocabularyByLevel(req, res) {
    try {
      const { levelId } = req.params;

      const vocabularies = await Vocabulary.findByLevelId(levelId);

      res.json({
        success: true,
        data: vocabularies,
        total: vocabularies.length
      });

    } catch (error) {
      console.error('Get vocabulary error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách từ vựng'
      });
    }
  }

  // Get exercises by level
  async getExercisesByLevel(req, res) {
    try {
      const { levelId } = req.params;

      // Placeholder - bạn cần tạo Exercise model
      res.json({
        success: true,
        data: [],
        total: 0,
        message: 'Exercise model chưa được tạo'
      });

    } catch (error) {
      console.error('Get exercises error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách bài tập'
      });
    }
  }

  // Create exercise
  async createExercise(req, res) {
    try {
      res.status(501).json({
        success: false,
        message: 'Exercise feature chưa được triển khai'
      });
    } catch (error) {
      console.error('Create exercise error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo bài tập'
      });
    }
  }

  // Update exercise
  async updateExercise(req, res) {
    try {
      res.status(501).json({
        success: false,
        message: 'Exercise feature chưa được triển khai'
      });
    } catch (error) {
      console.error('Update exercise error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật bài tập'
      });
    }
  }

  // Delete exercise
  async deleteExercise(req, res) {
    try {
      res.status(501).json({
        success: false,
        message: 'Exercise feature chưa được triển khai'
      });
    } catch (error) {
      console.error('Delete exercise error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi xóa bài tập'
      });
    }
  }
}

module.exports = new LearningPathController();