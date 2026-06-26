"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type MagicLinkState = {
  success: boolean;
  message: string;
} | null;

function appOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "http://localhost:3000"
  );
}

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

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      message: "Authentication is not configured. Contact your administrator.",
    };
  }

  const next = String(formData.get("next") ?? "/crm").trim() || "/crm";
  const redirectTo = `${appOrigin()}/auth/callback?next=${encodeURIComponent(next)}`;

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
