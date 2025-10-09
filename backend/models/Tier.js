const supabase = require('../config/supabaseClient');

class Tier {
  // Get all tiers with level count
  static async findAll() {
    const { data, error } = await supabase
      .from('tiers')
      .select(`
        *,
        levels(count)
      `)
      .order('order_index');

    if (error) throw error;
    return data;
  }

  // Find tier by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('tiers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  // Find tier by code
  static async findByCode(code) {
    const { data, error } = await supabase
      .from('tiers')
      .select(`
        *,
        levels(count)
      `)
      .eq('name', code)
      .single();

    if (error) return null;
    return data;
  }

  // Create tier
  static async create(tierData) {
    const { data, error } = await supabase
      .from('tiers')
      .insert([tierData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update tier
  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('tiers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete tier
  static async delete(id) {
    const { error } = await supabase
      .from('tiers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Check if order index exists
  static async isOrderIndexExists(orderIndex, excludeId = null) {
    let query = supabase
      .from('tiers')
      .select('id')
      .eq('order_index', orderIndex);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.length > 0;
  }
}

module.exports = Tier;