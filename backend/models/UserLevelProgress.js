const supabase = require('../config/supabaseClient');

class UserLevelProgress {
  // Find progress by user and level
  static async findByUserAndLevel(userId, levelId) {
    const { data, error } = await supabase
      .from('user_level_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('level_id', levelId)
      .single();

    if (error) return null;
    return data;
  }

  // Create user level progress
  static async create(progressData) {
    const { data, error } = await supabase
      .from('user_level_progress')
      .insert([progressData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update user level progress
  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('user_level_progress')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get user progress for all levels in a tier
  static async findByUserAndTier(userId, tierId) {
    const { data, error } = await supabase
      .from('user_level_progress')
      .select(`
        *,
        level:levels(*)
      `)
      .eq('user_id', userId)
      .eq('level.tier_id', tierId);

    if (error) throw error;
    return data;
  }
}

module.exports = UserLevelProgress;