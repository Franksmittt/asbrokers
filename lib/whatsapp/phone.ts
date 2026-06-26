/**
 * Normalize to E.164 South Africa (country code 27, no leading +).
 * Strips spaces/symbols; local 0-prefix numbers become 27…
 */
export function sanitizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) {
    return "";
  }
  if (digits.startsWith("0")) {
    return `27${digits.slice(1)}`;
  }
  return digits;
}
