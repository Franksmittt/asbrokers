/**
 * Temporary public soft-lock (2026-07-22).
 * Enables a site-wide under-review hold while Frank and Albert decide what stays public.
 * Bypass for review: visit any URL with ?preview=<token> (sets a cookie).
 * Turn off: set SITE_SOFT_LOCK=0 in Vercel, or set SOFT_LOCK_ENABLED false below.
 */

export const SOFT_LOCK_PATH = "/site-hold";

export const SOFT_LOCK_PREVIEW_COOKIE = "asb_site_preview";

/** Default preview token. Override with SITE_SOFT_LOCK_PREVIEW_TOKEN on Vercel if desired. */
export const SOFT_LOCK_DEFAULT_PREVIEW_TOKEN = "albert-review";

/**
 * Soft-lock is ON unless SITE_SOFT_LOCK is explicitly "0" or "false".
 * Flip off in Vercel after Albert's review meeting.
 */
export function isSoftLockEnabled(): boolean {
  const raw = process.env.SITE_SOFT_LOCK?.trim().toLowerCase();
  if (raw === "0" || raw === "false" || raw === "off") return false;
  return true;
}

export function getSoftLockPreviewToken(): string {
  return process.env.SITE_SOFT_LOCK_PREVIEW_TOKEN?.trim() || SOFT_LOCK_DEFAULT_PREVIEW_TOKEN;
}

/** Paths the public may still reach while soft-lock is active. */
export function isSoftLockExemptPath(pathname: string): boolean {
  if (pathname === SOFT_LOCK_PATH) return true;
  if (pathname === "/login" || pathname.startsWith("/login/")) return true;
  if (pathname === "/crm" || pathname.startsWith("/crm/")) return true;
  if (pathname === "/portal" || pathname.startsWith("/portal/")) return true;
  if (pathname === "/auth" || pathname.startsWith("/auth/")) return true;
  if (pathname.startsWith("/api/")) return true;
  if (pathname.startsWith("/internal/")) return true;
  return false;
}
