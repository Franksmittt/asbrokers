/**
 * Allowlisted staff PIN reset: HMAC token → email link → new 5-digit PIN.
 * Only emails in CRM_STAFF_EMAIL_ALLOWLIST ever receive a link.
 */

import { createHmac, randomBytes, timingSafeEqual } from "crypto";

import {
  isResetTokenUsed,
  markResetTokenUsed,
  resolveCrmPinUser,
  setCrmPinOverride,
} from "@/lib/crm/pin-store";
import { getConfiguredCrmPin } from "@/lib/crm/pin-session";
import {
  CRM_TEAM_MEMBERS,
  isAllowlistedStaffEmail,
  lookupCrmTeamMemberByEmail,
  type CrmTeamMember,
  type CrmTeamMemberKey,
} from "@/lib/crm/team-members";
import { isResendConfigured, sendEmail } from "@/lib/email/resend";

const RESET_TTL_SEC = 60 * 60; // 1 hour

function getResetSigningSecret(): string {
  const explicit = process.env.CRM_PIN_RESET_SECRET?.trim();
  if (explicit && explicit.length >= 16) return explicit;
  const session = process.env.CRM_PIN_SESSION_SECRET?.trim();
  if (session && session.length >= 16) return `${session}:pin-reset`;
  const studio = process.env.CLIENT_STUDIO_SESSION_SECRET?.trim();
  if (studio && studio.length >= 16) return `${studio}:pin-reset`;
  return `asbrokers-crm-pin-reset-v1:${getConfiguredCrmPin()}`;
}

function siteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    "https://www.asbrokers.co.za";
  return raw.replace(/\/$/, "");
}

function signPayload(payload: string): string {
  return createHmac("sha256", getResetSigningSecret()).update(payload).digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export function crmPinForgotPath(): string {
  return "/login/forgot";
}

export function crmPinResetPath(token?: string): string {
  if (token) return `/login/reset?token=${encodeURIComponent(token)}`;
  return "/login/reset";
}

export function createCrmPinResetToken(memberKey: CrmTeamMemberKey): string {
  const exp = Math.floor(Date.now() / 1000) + RESET_TTL_SEC;
  const jti = randomBytes(16).toString("hex");
  const payload = `${exp}.${jti}.${memberKey}`;
  const sig = signPayload(payload);
  return `${payload}.${sig}`;
}

export type ParsedCrmPinResetToken = {
  memberKey: CrmTeamMemberKey;
  jti: string;
  exp: number;
};

export async function verifyCrmPinResetToken(
  token: string
): Promise<ParsedCrmPinResetToken | null> {
  const parts = token.trim().split(".");
  if (parts.length !== 4) return null;
  const [expStr, jti, memberKeyRaw, sig] = parts;
  if (!expStr || !jti || !memberKeyRaw || !sig) return null;
  const exp = Number.parseInt(expStr, 10);
  if (!Number.isFinite(exp) || Date.now() / 1000 > exp) return null;
  const payload = `${expStr}.${jti}.${memberKeyRaw}`;
  const expected = signPayload(payload);
  if (!safeEqualHex(sig, expected)) return null;
  if (!(memberKeyRaw in CRM_TEAM_MEMBERS)) return null;
  if (await isResetTokenUsed(jti)) return null;
  return { memberKey: memberKeyRaw as CrmTeamMemberKey, jti, exp };
}

/**
 * Request a reset email. Always returns a generic success for anti-enumeration.
 * Sends only when the email is on the staff allowlist.
 */
export async function requestCrmPinResetEmail(
  email: string
): Promise<{ sent: boolean; member: CrmTeamMember | null }> {
  if (!isAllowlistedStaffEmail(email)) {
    return { sent: false, member: null };
  }
  const member = lookupCrmTeamMemberByEmail(email);
  if (!member) return { sent: false, member: null };

  const token = createCrmPinResetToken(member.key);
  const resetUrl = `${siteOrigin()}${crmPinResetPath(token)}`;

  if (isResendConfigured()) {
    const result = await sendEmail({
      to: member.email,
      subject: "Reset your AS Brokers Command Workspace PIN",
      text:
        `Hi ${member.name.split(" ")[0]},\n\n` +
        `Use this link to set a new 5-digit access PIN (expires in 1 hour):\n\n` +
        `${resetUrl}\n\n` +
        `If you did not request this, ignore this email.\n\n` +
        `AS Brokers · FSP 17273`,
      html:
        `<p>Hi ${escapeHtml(member.name.split(" ")[0] ?? member.name)},</p>` +
        `<p>Use this link to set a new 5-digit Command Workspace PIN (expires in 1 hour):</p>` +
        `<p><a href="${resetUrl}">${resetUrl}</a></p>` +
        `<p style="color:#666;font-size:13px">If you did not request this, ignore this email.</p>` +
        `<p style="color:#666;font-size:12px">AS Brokers · FSP 17273</p>`,
    });
    if (!result.ok) {
      console.error("[crm-pin-reset] Resend failed:", result.error);
      return { sent: false, member };
    }
    return { sent: true, member };
  }

  // Local / preview without Resend — log so agents can complete the flow.
  console.info(`[crm-pin-reset] ${member.email} → ${resetUrl}`);
  return { sent: true, member };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function completeCrmPinReset(
  token: string,
  pin: string
): Promise<{ ok: true; member: CrmTeamMember } | { ok: false; error: string }> {
  const parsed = await verifyCrmPinResetToken(token);
  if (!parsed) {
    return { ok: false, error: "This reset link is invalid or has expired. Request a new one." };
  }

  const trimmed = pin.trim();
  if (!/^\d{5}$/.test(trimmed)) {
    return { ok: false, error: "Enter a 5-digit PIN." };
  }

  const clash = await resolveCrmPinUser(trimmed);
  if (clash && clash.key !== parsed.memberKey) {
    return { ok: false, error: "That PIN is already in use. Choose a different 5-digit PIN." };
  }

  const member = CRM_TEAM_MEMBERS[parsed.memberKey];
  if (!member) {
    return { ok: false, error: "This reset link is invalid or has expired. Request a new one." };
  }

  await setCrmPinOverride(parsed.memberKey, trimmed);
  await markResetTokenUsed(parsed.jti);
  return { ok: true, member };
}
