import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * SECURITY: Only the anon (public) key is used in the browser.
 * The service_role key must NEVER appear in frontend code.
 * Row Level Security policies enforce all data access rules.
 */
if (!supabaseUrl || !supabaseAnonKey) {
  // During Phase 1 (pre-Supabase), these are absent — that is expected.
  // A proper error will be thrown in Phase 2 when auth/data features are active.
  console.warn(
    '[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. ' +
      'Supabase features will not work until Phase 2 environment setup.'
  );
}

export const supabase = createClient<Database>(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key'
);
