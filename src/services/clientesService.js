import { supabase } from './supabaseClient.js';

export const clientesService = {
  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  create: async (cliente, userId) => {
    const { data, error } = await supabase
      .from('clientes')
      .insert([{ ...cliente, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('clientes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  remove: async (id) => {
    const { error } = await supabase.from('clientes').delete().eq('id', id);

    if (error) throw error;
  },
};
