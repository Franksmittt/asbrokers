/**
 * POPIA cookie consent persistence (localStorage). Shared by banner, analytics, and manage-cookies.
 */
export const CONSENT_STORAGE_KEY = "asbrokers-cookie-consent";

export type ConsentLevel = "all" | "essential" | null;

export function readStoredConsent(): ConsentLevel {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === "all" || raw === "essential") return raw;
  } catch {
    // ignore
  }
  return null;
}

export function writeStoredConsent(level: "all" | "essential"): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, level);
  } catch {
    // ignore
  }
}

export function clearStoredConsent(): void {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // ignore
  }
}
