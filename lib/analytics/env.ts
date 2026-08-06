/**
 * Sanitize public analytics IDs from Vercel/env paste (trim CR/LF/quotes).
 * A trailing newline in NEXT_PUBLIC_GOOGLE_ADS_ID was baking `\r\n` into the
 * gtag Script string and crashing the page with appendChild SyntaxError.
 */

function cleanEnv(raw: string | undefined): string {
  return (raw ?? "")
    .trim()
    .replace(/^['"]+|['"]+$/g, "")
    .trim();
}

/** Google Ads conversion ID, e.g. AW-1234567890 */
export function getGoogleAdsId(): string | null {
  const id = cleanEnv(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID);
  return /^AW-\d+$/.test(id) ? id : null;
}

/** Google Ads conversion label (send_to suffix). */
export function getGoogleAdsLeadLabel(): string | null {
  const label = cleanEnv(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL);
  return label.length > 0 ? label : null;
}

/** GA4 measurement ID, e.g. G-XXXXXXXX */
export function getGaMeasurementId(): string | null {
  const id = cleanEnv(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  return /^G-[A-Z0-9]+$/i.test(id) ? id : null;
}

/** Hotjar site id (numeric). */
export function getHotjarId(): string | null {
  const id = cleanEnv(process.env.NEXT_PUBLIC_HOTJAR_ID);
  return /^\d+$/.test(id) ? id : null;
}
