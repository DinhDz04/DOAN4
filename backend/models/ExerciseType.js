const supabase = require('../config/supabaseClient');

class ExerciseType {
  // Get all exercise types
  static async findAll() {
    const { data, error } = await supabase
      .from('exercise_types')
      .select('*')
      .eq('is_active', true)
      .order('id', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Find exercise type by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('exercise_types')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data;
  }

  // Find exercise type by name
  static async findByName(name) {
    const { data, error } = await supabase
      .from('exercise_types')
      .select('*')
      .eq('name', name)
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data;
  }
}

module.exports = ExerciseType;