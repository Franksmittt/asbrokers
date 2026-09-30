import { createHash, randomInt } from "crypto";

import { isResendConfigured, sendEmail } from "@/lib/email/resend";

type OtpRecord = {
  email: string;
  codeHash: string;
  expiresAt: number;
  attempts: number;
};

const globalForOtp = globalThis as { __asbStudentOtp?: Map<string, OtpRecord> };

function otpStore(): Map<string, OtpRecord> {
  if (!globalForOtp.__asbStudentOtp) globalForOtp.__asbStudentOtp = new Map();
  return globalForOtp.__asbStudentOtp;
}

function hashCode(email: string, code: string): string {
  return createHash("sha256").update(`${email}:${code}`).digest("hex");
}

/** Email OTP when Resend is configured; otherwise callers may fall back to email recognition. */
export function studentOtpAvailable(): boolean {
  return isResendConfigured();
}

export async function issueStudentOtp(email: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const normalised = email.trim().toLowerCase();
  const code = String(randomInt(100000, 999999));
  otpStore().set(normalised, {
    email: normalised,
    codeHash: hashCode(normalised, code),
    expiresAt: Date.now() + 1000 * 60 * 10,
    attempts: 0,
  });

  if (!isResendConfigured()) {
    // Dev / preview without Resend: log code so agents can test.
    console.info(`[student-otp] ${normalised} → ${code}`);
    return { ok: true };
  }

  const result = await sendEmail({
    to: normalised,
    subject: "Your AS Brokers Clarity Track sign-in code",
    text: `Your sign-in code is ${code}. It expires in 10 minutes.\n\nIf you did not request this, you can ignore this email.`,
    html: `<p>Your Clarity Track sign-in code is <strong style="font-size:20px;letter-spacing:2px">${code}</strong>.</p><p>It expires in 10 minutes.</p><p style="color:#666;font-size:13px">If you did not request this, ignore this email.</p>`,
  });
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true };
}

export function verifyStudentOtp(email: string, code: string): boolean {
  const normalised = email.trim().toLowerCase();
  const record = otpStore().get(normalised);
  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    otpStore().delete(normalised);
    return false;
  }
  record.attempts += 1;
  if (record.attempts > 8) {
    otpStore().delete(normalised);
    return false;
  }
  const ok = record.codeHash === hashCode(normalised, code.trim());
  if (ok) otpStore().delete(normalised);
  return ok;
}
