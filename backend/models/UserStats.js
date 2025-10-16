const supabase = require('../config/supabaseClient');

class UserStats {
  // Find stats by user ID
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) return null;
    return data;
  }

  // Create user stats
  static async create(statsData) {
    const { data, error } = await supabase
      .from('user_stats')
      .insert([statsData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update user stats
  static async update(userId, updateData) {
    const { data, error } = await supabase
      .from('user_stats')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get global leaderboard
  static async getLeaderboard(limit = 50) {
    const { data, error } = await supabase
      .from('user_stats')
      .select(`
        *,
        user:users(username, full_name, avatar_url)
      `)
      .order('total_points', { ascending: false })
      .order('xp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Increment user points
  static async incrementPoints(userId, points) {
    const { data, error } = await supabase.rpc('increment_user_points', {
      user_id: userId,
      points_to_add: points
    });

    if (error) throw error;
    return data;
  }
}

module.exports = UserStats;