"use server";

import { redirect } from "next/navigation";

import { clearClientStudioSession } from "@/lib/client-studio/session";
import { clearCrmPinSession } from "@/lib/crm/pin-session";
import { clearMockSession } from "@/lib/mock-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Full staff sign-out: CRM PIN + Studio cookie + Supabase.
 * Studio used to clear only its cookie, so PIN-bridged sessions never ended.
 */
export async function staffLogout(nextPath = "/login"): Promise<void> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("[staff-logout] supabase signOut failed:", error);
    }
  }

  await clearCrmPinSession();
  await clearClientStudioSession();
  await clearMockSession();

  const safe = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/login";
  redirect(safe);
}
