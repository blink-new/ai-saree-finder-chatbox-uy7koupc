
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
// These would need to be set in your environment
const supabaseUrl = 'https://supabase-demo.com';
const supabaseKey = 'your-supabase-key';

export const supabase = createClient(supabaseUrl, supabaseKey);