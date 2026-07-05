"use server";

import { redirect } from "next/navigation";

import { clearCrmPinSession } from "@/lib/crm/pin-session";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { clearMockSession } from "@/lib/mock-auth";

export async function logout() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  await clearCrmPinSession();
  await clearMockSession();
  redirect("/login");
}
