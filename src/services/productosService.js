import { supabase } from './supabaseClient';

export const productosService = {
  async getAll(userId) {
    console.log('USER:', userId);

    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    //console.log('DATA:', data);
    return data;
  },

  async create(producto, userId) {
    const { data, error } = await supabase
      .from('productos')
      .insert([{ ...producto, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, updates, userId) {
    const { data, error } = await supabase
      .from('productos')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id, userId) {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  },
};
