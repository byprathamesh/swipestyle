import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL is not set. Please check your environment variables.');
  // You might want to throw an error here or handle it gracefully depending on your app's needs
  // For now, we'll allow the app to continue running but log the error.
}

if (!supabaseAnonKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please check your environment variables.');
  // Similar to supabaseUrl, handle this appropriately.
}

// Only attempt to create a client if both URL and Key are present
let supabase;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Fallback or mock client if you want the app to run without full Supabase functionality locally
  // For instance, if some parts of your app can run without Supabase for demo/UI development.
  console.warn('Supabase client not initialized due to missing URL or Key. Some features may not work.');
  // You could assign a mock supabase object here if needed for local development without .env.local setup
  supabase = null; 
}

export { supabase }; 