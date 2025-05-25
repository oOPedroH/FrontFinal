
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Using Vite environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
