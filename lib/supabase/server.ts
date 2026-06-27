import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/** Project URL from env (NEXT_PUBLIC_* for client parity; SUPABASE_URL is a server-only fallback). */
function normalizeEnv(value: string | undefined): string | undefined {
  const t = typeof value === "string" ? value.trim() : "";
  return t || undefined;
}

const url =
  normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) ??
  normalizeEnv(process.env.SUPABASE_URL);
const anonKey = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const serviceKey = normalizeEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Server-side Supabase Auth client (session cookies).
 * Prefers SUPABASE_SERVICE_ROLE_KEY when set — some publishable anon keys reject OTP dispatch
 * and getUser while the secret key still works for server-side auth flows.
 */
export async function createServerSupabaseClient() {
  const key = serviceKey ?? anonKey;
  if (!url || !key) return null;
  const cookieStore = await cookies();
  return createServerClient(url, key, {
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
