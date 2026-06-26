"use server";

import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { clearMockSession } from "@/lib/mock-auth";

export async function logout() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  await clearMockSession();
  redirect("/login");
}
