import { sendEmail, isResendConfigured } from "@/lib/email/resend";
import { getSupabaseService } from "@/lib/supabase/server";

export type MagicLinkDispatchResult =
  | { ok: true }
  | { ok: false; error: string; code?: string };

function magicLinkEmailHtml(actionLink: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a0a;color:#fff;padding:32px;">
  <div style="max-width:480px;margin:0 auto;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:32px;">
    <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">AS Brokers · FSP 17273</p>
    <h1 style="font-size:22px;margin:16px 0 8px;">Secure sign-in</h1>
    <p style="color:#aaa;line-height:1.6;">Tap the button below to access the CRM. This link expires soon and can only be used once.</p>
    <p style="margin:28px 0;">
      <a href="${actionLink}" style="display:inline-block;background:#fff;color:#000;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:16px;">Log in securely</a>
    </p>
    <p style="color:#666;font-size:12px;line-height:1.5;">If you did not request this, ignore this email.</p>
  </div>
</body>
</html>`;
}

/**
 * Generate a Supabase magic link and deliver it via Resend (production path).
 * Falls back to Supabase mailer only when Resend is not configured (local dev).
 */
export async function dispatchMagicLinkEmail(
  email: string,
  redirectTo: string
): Promise<MagicLinkDispatchResult> {
  const supabase = getSupabaseService();
  if (!supabase) {
    return { ok: false, error: "Authentication is not configured.", code: "not_configured" };
  }

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo },
  });

  if (error || !data.properties?.action_link) {
    return {
      ok: false,
      error: error?.message ?? "Could not generate sign-in link.",
      code: error?.name,
    };
  }

  const actionLink = data.properties.action_link;

  if (!isResendConfigured()) {
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (otpError) {
      return { ok: false, error: otpError.message, code: otpError.code };
    }
    return { ok: true };
  }

  const sent = await sendEmail({
    to: email,
    subject: "Your AS Brokers secure sign-in link",
    html: magicLinkEmailHtml(actionLink),
    text: `Sign in to AS Brokers CRM:\n\n${actionLink}\n\nThis link expires soon.`,
  });

  if (!sent.ok) {
    return { ok: false, error: sent.error, code: "resend_failed" };
  }

  return { ok: true };
}
