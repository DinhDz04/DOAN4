const supabase = require('../config/supabaseClient');

class Exercise {
  // Find exercise by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('exercises')
      .select(`
        *,
        exercise_type:exercise_types(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data;
  }

  // Find exercises by level ID
  static async findByLevelId(levelId) {
    const { data, error } = await supabase
      .from('exercises')
      .select(`
        *,
        exercise_type:exercise_types(*)
      `)
      .eq('level_id', levelId)
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Create exercise
  static async create(exerciseData) {
    const { data, error } = await supabase
      .from('exercises')
      .insert([exerciseData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update exercise
  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('exercises')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete exercise (soft delete)
  static async delete(id) {
    const { error } = await supabase
      .from('exercises')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Check if order index exists in level
  static async isOrderIndexExists(levelId, orderIndex, excludeId = null) {
    let query = supabase
      .from('exercises')
      .select('id')
      .eq('level_id', levelId)
      .eq('order_index', orderIndex)
      .eq('is_active', true);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.length > 0;
  }
}

module.exports = Exercise;