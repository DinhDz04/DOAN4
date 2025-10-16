const supabase = require('../config/supabaseClient');

class ExerciseAttempt {
  // Create exercise attempt
  static async create(attemptData) {
    const { data, error } = await supabase
      .from('user_exercise_attempts')
      .insert([attemptData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Find attempts by user and exercise
  static async findByUserAndExercise(userId, exerciseId) {
    const { data, error } = await supabase
      .from('user_exercise_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get exercise leaderboard
  static async getLeaderboard(exerciseId, limit = 10) {
    const { data, error } = await supabase
      .from('user_exercise_attempts')
      .select(`
        user_id,
        score,
        time_taken,
        created_at,
        user:users(username, full_name, avatar_url)
      `)
      .eq('exercise_id', exerciseId)
      .order('score', { ascending: false })
      .order('time_taken', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Get user's best attempt for an exercise
  static async getUserBestAttempt(userId, exerciseId) {
    const { data, error } = await supabase
      .from('user_exercise_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .order('score', { ascending: false })
      .order('time_taken', { ascending: true })
      .limit(1)
      .single();

    if (error) return null;
    return data;
  }
}

module.exports = ExerciseAttempt;