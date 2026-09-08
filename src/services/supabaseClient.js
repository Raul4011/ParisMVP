import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://xrvzxufbaqbddbqqwmlc.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhydnp4dWZiYXFiZGRicXF3bWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDE4NTcsImV4cCI6MjA5MDE3Nzg1N30.FSHYUk2mbwWbWp_2ytsZ_aNPtthK__nJO7aHXdnCMUc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
