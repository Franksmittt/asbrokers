import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SCRYPT_KEYLEN = 64;

/** Store as `scrypt$<saltHex>$<hashHex>`. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string | null | undefined): boolean {
  if (!stored) return false;
  const [algo, salt, hash] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hash) return false;
  try {
    const next = scryptSync(password, salt, SCRYPT_KEYLEN);
    const expected = Buffer.from(hash, "hex");
    if (expected.length !== next.length) return false;
    return timingSafeEqual(expected, next);
  } catch {
    return false;
  }
}

export function createPasswordResetToken(): { token: string; tokenHash: string; expiresAt: string } {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashResetToken(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString(); // 1 hour
  return { token, tokenHash, expiresAt };
}

export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Demo accounts in seed use this password so Albert can test sign-in. */
export const DEMO_STUDENT_PASSWORD = "Learning2026!";
