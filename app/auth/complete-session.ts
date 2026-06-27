"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type MagicLinkSessionResult =
  | { ok: true; next: string }
  | { ok: false; error: string };

/** Persist Supabase implicit-flow tokens (#access_token in URL hash) into SSR session cookies. */
export async function completeMagicLinkSession(
  accessToken: string,
  refreshToken: string,
  nextPath = "/crm"
): Promise<MagicLinkSessionResult> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { ok: false, error: "Authentication is not configured." };
  }

  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Auth] setSession failed:", error.message);
    }
    return { ok: false, error: error.message };
  }

  const safeNext = nextPath.startsWith("/") ? nextPath : "/crm";
  return { ok: true, next: safeNext };
}
