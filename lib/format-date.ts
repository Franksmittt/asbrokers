/** Fixed-locale date formatting for Server Components (Handbook Phase 2.3). */
export function formatDateEnZa(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  return new Date(iso).toLocaleDateString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    ...options,
  });
}
