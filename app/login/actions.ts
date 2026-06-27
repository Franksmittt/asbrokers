"use server";

import { dispatchMagicLinkEmail } from "@/lib/auth/magic-link-email";
import { getAuthRedirectOrigin } from "@/lib/auth-redirect-origin";

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

  const next = String(formData.get("next") ?? "/crm").trim() || "/crm";
  const origin = await getAuthRedirectOrigin();
  const redirectTo = `${origin}/auth/callback/implicit?next=${encodeURIComponent(next)}`;

  const result = await dispatchMagicLinkEmail(email, redirectTo);

  if (!result.ok) {
    console.error("[Login] magic link failed:", result.code, result.error);
    if (result.code === "over_email_send_rate_limit") {
      return {
        success: false,
        message: "Too many sign-in attempts. Wait a few minutes and try again.",
      };
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
