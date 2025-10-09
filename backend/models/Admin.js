const supabase = require('../config/supabaseClient');

class Admin {
  // Find admin by email
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data;
  }

  // Find admin by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data;
  }

  // Update last login
  static async updateLastLogin(id) {
    const { error } = await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', id);

    return !error;
  }

  // Create admin (for seeding)
  static async create(adminData) {
    const { data, error } = await supabase
      .from('admin_users')
      .insert([adminData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = Admin;