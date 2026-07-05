import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Whether real Supabase credentials are configured. When this is `false` the app
 * still renders normally — only database-backed features (e.g. the contact form)
 * are disabled. This prevents a missing env var from blanking the entire site.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — database ' +
    'features such as the contact form are disabled. Set these env vars to enable them.'
  );
}

// Fall back to harmless placeholders so createClient never throws at import time.
// Guard real usage with `isSupabaseConfigured`.
export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key'
);
