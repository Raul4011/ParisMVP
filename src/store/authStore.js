import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  loading: true,

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      loading: false,
    }),

  init: async () => {
    const { data } = await supabase.auth.getSession();
    set({
      session: data.session,
      user: data.session?.user ?? null,
      loading: false,
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        loading: false,
      });
    });
  },

  signIn: async ({ email, password }) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },
}));
