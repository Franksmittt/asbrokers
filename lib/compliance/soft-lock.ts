/**
 * Optional public soft-lock (was active 2026-07-22 for Albert review).
 * Soft-lock is OFF unless SITE_SOFT_LOCK is explicitly "1", "true", or "on".
 * Bypass when enabled: visit any URL with ?preview=<token> (sets a cookie).
 *
 * Calculator / product containment remains separate in `containment.ts`
 * and must stay active until Albert records approvals.
 */

export const SOFT_LOCK_PATH = "/site-hold";

export const SOFT_LOCK_PREVIEW_COOKIE = "asb_site_preview";

/** Default preview token. Override with SITE_SOFT_LOCK_PREVIEW_TOKEN on Vercel if desired. */
export const SOFT_LOCK_DEFAULT_PREVIEW_TOKEN = "albert-review";

/**
 * Soft-lock is OFF by default.
 * Only enable temporarily with SITE_SOFT_LOCK=1 (or true/on).
 */
export function isSoftLockEnabled(): boolean {
  const raw = process.env.SITE_SOFT_LOCK?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "on";
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
