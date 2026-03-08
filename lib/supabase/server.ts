import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Use in Server Components / Route Handlers when Supabase Auth is enabled (Phase 2). Respects RLS. */
export async function createServerSupabaseClient() {
  if (!url || !anonKey) return null;
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Ignore in Server Component context
        }
      },
    },
  });
}

/**
 * Server-only Supabase client with service role. Bypasses RLS.
 * Use for CRM mutations until Supabase Auth + RLS is wired (Phase 2).
 * Returns null if Supabase is not configured.
 */
export function getSupabaseService() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && (anonKey || serviceKey));
}
