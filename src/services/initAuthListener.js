import { supabase } from '../services/supabaseClient';
import { useAuthStore } from '../store/authStore';

export const initAuthListener = () => {
  const setUser = useAuthStore.getState().init;

  supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user || null);
  });
};
