import { createClient } from '@supabase/supabase-js';

// These should be stored in environment variables (e.g., .env file)
// and accessed via import.meta.env.VITE_SUPABASE_URL and import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example of how you might define types based on your Supabase tables
// It's often better to generate these types from your Supabase schema directly
// using the Supabase CLI: supabase gen types typescript > src/types/supabase.ts
/*
export interface UserProfile {
  id: string; // Usually UUID
  auth_user_id?: string; // UUID from auth.users
  display_name?: string;
  avatar_url?: string;
  followers_count?: number;
  is_verified?: boolean;
  created_at?: string; // timestamp
}

export interface Design {
  id: string; // Usually UUID
  user_id: string; // Foreign key to UserProfile
  title?: string;
  images?: string[]; // URLs to images in Supabase storage
  price?: number;
  tags?: string[];
  created_at?: string; // timestamp
  // For relations like creator, you'd fetch user_profiles based on user_id
  // For likes, you'd typically have a separate 'likes' table (user_id, design_id)
}
*/ 