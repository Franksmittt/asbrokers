"use server";

import { getAuthRedirectOrigin } from "@/lib/auth-redirect-origin";
import { getSupabaseService } from "@/lib/supabase/server";

export type MagicLinkState = {
  success: boolean;
  message: string;
} | null;

export async function signInWithMagicLink(
  _prevState: MagicLinkState,
  formData: FormData
): Promise<MagicLinkState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Enter a valid email address." };
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return {
      success: false,
      message: "Authentication is not configured. Contact your administrator.",
    };
  }

  const next = String(formData.get("next") ?? "/crm").trim() || "/crm";
  const origin = await getAuthRedirectOrigin();
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Login] signInWithOtp failed:", error.message);
    }
    return {
      success: false,
      message: "We could not dispatch the secure link. Please try again.",
    };
  }

  return {
    success: true,
    message: "Secure link dispatched. Check your inbox.",
  };
}
