/**
 * Ad-click attribution capture. Middleware strips utm_ params, gclid, and
 * fbclid from URLs for SEO normalization; this module preserves them in a
 * first-party cookie before the strip so lead server actions can attach them
 * to CRM payloads.
 */

export const ATTRIBUTION_COOKIE = "asb_attribution";
/** 90 days: Google Ads click-to-conversion windows max out at 90 days. */
export const ATTRIBUTION_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

export type LeadAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  /** Landing pathname the click arrived on. */
  landing?: string;
  /** External referrer at capture time. */
  referrer?: string;
  /** ISO timestamp of capture (last non-direct click). */
  capturedAt?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const MAX_VALUE_LENGTH = 200;

function clean(value: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, MAX_VALUE_LENGTH);
}

/**
 * Extract attribution params from a request URL. Returns null when the URL
 * carries no ad/campaign identifiers (organic navigation).
 */
export function extractAttribution(
  url: URL,
  referrer?: string | null
): LeadAttribution | null {
  const attribution: LeadAttribution = {};
  let hasSignal = false;

  for (const key of UTM_KEYS) {
    const value = clean(url.searchParams.get(key));
    if (value) {
      attribution[key] = value;
      hasSignal = true;
    }
  }

  const gclid = clean(url.searchParams.get("gclid"));
  if (gclid) {
    attribution.gclid = gclid;
    hasSignal = true;
  }
  const fbclid = clean(url.searchParams.get("fbclid"));
  if (fbclid) {
    attribution.fbclid = fbclid;
    hasSignal = true;
  }

  if (!hasSignal) return null;

  attribution.landing = url.pathname.slice(0, MAX_VALUE_LENGTH);
  const ref = clean(referrer ?? null);
  if (ref) attribution.referrer = ref;
  attribution.capturedAt = new Date().toISOString();
  return attribution;
}

/** Parse the attribution cookie value defensively. */
export function parseAttributionCookie(
  value: string | undefined
): LeadAttribution | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as LeadAttribution;
  } catch {
    return null;
  }
}
