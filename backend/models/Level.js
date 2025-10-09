const supabase = require('../config/supabaseClient');

class Level {
  // Get levels by tier ID
  static async findByTierId(tierId) {
    const { data, error } = await supabase
      .from('levels')
      .select(`
        *,
        vocabularies(count),
        exercises(count)
      `)
      .eq('tier_id', tierId)
      .order('order_index');

    if (error) throw error;
    return data;
  }

  // Find level by ID with details
  static async findByIdWithDetails(id) {
    const { data, error } = await supabase
      .from('levels')
      .select(`
        *,
        tier:tiers(*),
        vocabularies(*),
        exercises(
          *,
          exercise_type:exercise_types(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  // Find level by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('levels')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  // Create level
  static async create(levelData) {
    const { data, error } = await supabase
      .from('levels')
      .insert([levelData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update level
  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('levels')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete level
  static async delete(id) {
    const { error } = await supabase
      .from('levels')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Check if order index exists in tier
  static async isOrderIndexExists(tierId, orderIndex, excludeId = null) {
    let query = supabase
      .from('levels')
      .select('id')
      .eq('tier_id', tierId)
      .eq('order_index', orderIndex);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.length > 0;
  }
}

module.exports = Level;