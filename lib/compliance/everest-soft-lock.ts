/**
 * Soft-lock for the consolidated Everest Wealth page (/everest-wealth).
 * Password gate (default 85879). Unlocked session cookie unlocks this page
 * and the Everest calculator embeds it iframes.
 */

export const EVEREST_SOFT_LOCK_PATH = "/everest-wealth";
export const EVEREST_SOFT_LOCK_COOKIE = "asb_everest_preview";
export const EVEREST_SOFT_LOCK_DEFAULT_PASSWORD = "85879";

/** Session lifetime: 7 days. */
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

export function getEverestSoftLockPassword(): string {
  return process.env.EVEREST_SOFT_LOCK_PASSWORD?.trim() || EVEREST_SOFT_LOCK_DEFAULT_PASSWORD;
}

function getSigningSecret(): string {
  const explicit = process.env.EVEREST_SOFT_LOCK_SESSION_SECRET?.trim();
  if (explicit && explicit.length >= 16) return explicit;
  const studio = process.env.CLIENT_STUDIO_SESSION_SECRET?.trim();
  if (studio && studio.length >= 16) return studio;
  return `asbrokers-everest-soft-lock-v1:${getEverestSoftLockPassword()}`;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (!Number.isFinite(byte)) return null;
    out[i] = byte;
  }
  return out;
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bytesToHex(new Uint8Array(sig));
}

export async function signEverestSoftLockToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const nonce = bytesToHex(crypto.getRandomValues(new Uint8Array(12)));
  const payload = `${exp}.${nonce}`;
  const sig = await hmacSha256Hex(getSigningSecret(), payload);
  return `${payload}.${sig}`;
}

export async function verifyEverestSoftLockToken(token: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expStr, nonce, sig] = parts;
  const exp = Number.parseInt(expStr, 10);
  if (!Number.isFinite(exp) || Date.now() / 1000 > exp) return false;
  const expected = await hmacSha256Hex(getSigningSecret(), `${expStr}.${nonce}`);
  const a = hexToBytes(sig);
  const b = hexToBytes(expected);
  if (!a || !b) return false;
  return timingSafeEqualBytes(a, b);
}

export async function hasEverestSoftLockFromCookieValue(raw: string | undefined): Promise<boolean> {
  if (!raw) return false;
  return verifyEverestSoftLockToken(raw);
}

export function verifyEverestSoftLockPassword(plain: string): boolean {
  const expected = getEverestSoftLockPassword();
  const a = new TextEncoder().encode(plain.trim());
  const b = new TextEncoder().encode(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqualBytes(a, b);
}

export const EVEREST_SOFT_LOCK_COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  maxAge: MAX_AGE_SEC,
};

/** Embeds that the unlocked Everest page may iframe. */
export const EVEREST_SOFT_LOCK_EMBED_FILES = [
  "asset-009-everest-142-income.html",
  "asset-010-everest-128-income.html",
  "asset-011-everest-128-vs-142.html",
  "asset-012-strategic-growth.html",
  "asset-013-everest-income-vs-growth.html",
  "asset-014-living-annuity.html",
  "amethyst-living-annuity-illustration.html",
] as const;

export function isEverestSoftLockEmbedPath(pathname: string): boolean {
  if (!pathname.startsWith("/embed-calculators/")) return false;
  const file = pathname.slice("/embed-calculators/".length);
  return (EVEREST_SOFT_LOCK_EMBED_FILES as readonly string[]).includes(file);
}

/** Legacy product URLs that should land on the soft-locked single page. */
export function isEverestSoftLockRedirectPath(pathname: string): boolean {
  const paths = [
    "/everest-wealth/about",
    "/everest-amethyst-living-annuity",
    "/everest-128-product",
    "/everest-strategic-growth-145",
    "/immediate-higher-income-calculator",
  ];
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
