/** Drizzle wraps PG errors on `cause`; top-level message is often only "Failed query: ...". */
export function collectErrorText(error: unknown): string {
  const parts: string[] = [];
  let e: unknown = error;
  const seen = new Set<unknown>();
  for (let i = 0; i < 8 && e != null && !seen.has(e); i += 1) {
    seen.add(e);
    if (e instanceof Error) {
      parts.push(e.message);
      e = e.cause;
    } else if (typeof e === "object" && e !== null && "message" in e) {
      parts.push(String((e as { message: unknown }).message));
      e = "cause" in e ? (e as { cause: unknown }).cause : undefined;
    } else {
      parts.push(String(e));
      break;
    }
  }
  return parts.join(" | ");
}

export function isMissingCalculatorColumnsError(error: unknown): boolean {
  const text = collectErrorText(error);
  if (!text.includes("calculator_name") && !text.includes("calculator_code")) return false;
  return (
    text.includes("does not exist") ||
    text.includes("42703") ||
    (text.includes("column") && text.includes("calculator"))
  );
}
