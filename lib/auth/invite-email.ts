import { sendEmail, isResendConfigured } from "@/lib/email/resend";
import { getSupabaseService } from "@/lib/supabase/server";

export type InviteEmailResult =
  | { ok: true; userId?: string }
  | { ok: false; error: string; code?: string };

function inviteEmailHtml(fullName: string, actionLink: string): string {
  const greeting = fullName.trim() ? `Hi ${fullName.trim()},` : "Hi,";
  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a0a;color:#fff;padding:32px;">
  <div style="max-width:480px;margin:0 auto;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:32px;">
    <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">AS Brokers · FSP 17273</p>
    <h1 style="font-size:22px;margin:16px 0 8px;">You're invited to the CRM</h1>
    <p style="color:#aaa;line-height:1.6;">${greeting} You've been added to the AS Brokers team workspace. Tap below to set up secure access — no password required.</p>
    <p style="margin:28px 0;">
      <a href="${actionLink}" style="display:inline-block;background:#3ecf8e;color:#000;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:16px;">Accept invite</a>
    </p>
    <p style="color:#666;font-size:12px;line-height:1.5;">This link expires soon. If you weren't expecting this, contact the office.</p>
  </div>
</body>
</html>`;
}

/**
 * Generate a Supabase invite link and deliver via Resend.
 * Creates the auth user if they do not exist yet.
 */
export async function dispatchCrmInviteEmail(
  email: string,
  fullName: string,
  redirectTo: string
): Promise<InviteEmailResult> {
  const supabase = getSupabaseService();
  if (!supabase) {
    return { ok: false, error: "Authentication is not configured.", code: "not_configured" };
  }

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "invite",
    email,
    options: {
      redirectTo,
      data: { full_name: fullName },
    },
  });

  if (error || !data.properties?.action_link) {
    return {
      ok: false,
      error: error?.message ?? "Could not generate invite link.",
      code: error?.name,
    };
  }

  const actionLink = data.properties.action_link;

  if (!isResendConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[CRM invite] Dev invite link:", actionLink);
    }
    return { ok: true, userId: data.user?.id };
  }

  const sent = await sendEmail({
    to: email,
    subject: "You're invited to AS Brokers CRM",
    html: inviteEmailHtml(fullName, actionLink),
    text: `${fullName ? `Hi ${fullName},` : "Hi,"}\n\nYou've been invited to the AS Brokers CRM.\n\nAccept invite:\n${actionLink}\n\nThis link expires soon.`,
  });

  if (!sent.ok) {
    return { ok: false, error: sent.error, code: "resend_failed" };
  }

  return { ok: true, userId: data.user?.id };
}

/** Re-send a sign-in link for an existing team member. */
export async function dispatchCrmSignInEmail(
  email: string,
  redirectTo: string
): Promise<InviteEmailResult> {
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

  if (!isResendConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[CRM sign-in] Dev magic link:", data.properties.action_link);
    }
    return { ok: true };
  }

  const sent = await sendEmail({
    to: email,
    subject: "Your AS Brokers CRM sign-in link",
    html: inviteEmailHtml("", data.properties.action_link),
    text: `Sign in to AS Brokers CRM:\n\n${data.properties.action_link}`,
  });

  if (!sent.ok) {
    return { ok: false, error: sent.error, code: "resend_failed" };
  }

  return { ok: true };
}

export function crmAuthRedirectOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}
