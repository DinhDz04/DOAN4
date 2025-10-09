const supabase = require('../config/supabaseClient');

class Vocabulary {
  // Get vocabularies by level ID
  static async findByLevelId(levelId) {
    const { data, error } = await supabase
      .from('vocabularies')
      .select('*')
      .eq('level_id', levelId)
      .order('order_index');

    if (error) throw error;
    return data;
  }

  // Find vocabulary by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('vocabularies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  // Create vocabulary
  static async create(vocabularyData) {
    const { data, error } = await supabase
      .from('vocabularies')
      .insert([vocabularyData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update vocabulary
  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('vocabularies')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete vocabulary
  static async delete(id) {
    const { error } = await supabase
      .from('vocabularies')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Check if word exists in level
  static async isWordExists(levelId, word, excludeId = null) {
    let query = supabase
      .from('vocabularies')
      .select('id')
      .eq('level_id', levelId)
      .eq('word', word);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.length > 0;
  }
}

module.exports = Vocabulary;