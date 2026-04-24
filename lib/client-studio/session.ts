import { cookies } from "next/headers";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const COOKIE_NAME = "client-studio-session";
const COOKIE_PATH = "/studio/blog";
/** Session lifetime in seconds (14 days). */
const MAX_AGE_SEC = 60 * 60 * 24 * 14;

function getSigningSecret(): string | null {
  const password = process.env.CLIENT_STUDIO_PASSWORD;
  if (!password) return null;
  const explicit = process.env.CLIENT_STUDIO_SESSION_SECRET;
  if (explicit && explicit.length >= 16) return explicit;
  return createHmac("sha256", "asbrokers-client-studio").update(password).digest("hex");
}

export function isClientStudioConfigured(): boolean {
  return Boolean(process.env.CLIENT_STUDIO_PASSWORD?.trim());
}

function signToken(secret: string): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const nonce = randomBytes(12).toString("hex");
  const payload = `${exp}.${nonce}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyToken(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expStr, nonce, sig] = parts;
  const exp = Number.parseInt(expStr, 10);
  if (!Number.isFinite(exp) || Date.now() / 1000 > exp) return false;
  const payload = `${expStr}.${nonce}`;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export async function getClientStudioSession(): Promise<boolean> {
  const secret = getSigningSecret();
  if (!secret) return false;
  const c = await cookies();
  const raw = c.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  return verifyToken(raw, secret);
}

export async function setClientStudioSessionToken(): Promise<void> {
  const secret = getSigningSecret();
  if (!secret) return;
  const token = signToken(secret);
  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    path: COOKIE_PATH,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearClientStudioSession(): Promise<void> {
  const c = await cookies();
  c.set(COOKIE_NAME, "", { path: COOKIE_PATH, maxAge: 0 });
}
