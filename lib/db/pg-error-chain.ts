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

function collectErrorFacts(error: unknown): { text: string; codes: Set<string>; columns: Set<string> } {
  const textParts: string[] = [];
  const codes = new Set<string>();
  const columns = new Set<string>();
  const queue: unknown[] = [error];
  const seen = new Set<unknown>();

  for (let i = 0; i < 16 && queue.length > 0; i += 1) {
    const current = queue.shift();
    if (current == null || seen.has(current)) continue;
    seen.add(current);

    if (current instanceof Error) {
      textParts.push(current.message);
      queue.push(current.cause);
      const record = current as Error & Record<string, unknown>;
      for (const key of ["code", "details", "detail", "hint", "table", "column", "constraint"]) {
        const value = record[key];
        if (typeof value !== "string" || !value) continue;
        textParts.push(`${key}: ${value}`);
        if (key === "code") codes.add(value);
        if (key === "column") columns.add(value);
      }
      continue;
    }

    if (typeof current === "object") {
      const record = current as Record<string, unknown>;
      for (const [key, value] of Object.entries(record)) {
        if (key === "cause" || key === "error") {
          queue.push(value);
          continue;
        }
        if (typeof value !== "string" || !value) continue;
        if (key === "message" || key === "code" || key === "details" || key === "detail" || key === "hint") {
          textParts.push(`${key}: ${value}`);
        }
        if (key === "code") codes.add(value);
        if (key === "column") columns.add(value);
      }
      continue;
    }

    textParts.push(String(current));
  }

  return {
    text: textParts.join(" | ").toLowerCase(),
    codes,
    columns,
  };
}

function isMissingAnyColumnError(error: unknown, columnNames: readonly string[]): boolean {
  const facts = collectErrorFacts(error);
  const hasColumn = columnNames.some((column) => facts.columns.has(column));
  const mentionsColumn = columnNames.some((column) => facts.text.includes(column.toLowerCase()));

  if (facts.codes.has("42703")) return hasColumn || mentionsColumn;
  if (facts.codes.has("PGRST204")) return mentionsColumn;

  return (
    mentionsColumn &&
    (facts.text.includes("does not exist") ||
      facts.text.includes("schema cache") ||
      facts.text.includes("could not find") ||
      facts.text.includes("column"))
  );
}

export function isMissingCalculatorColumnsError(error: unknown): boolean {
  return isMissingAnyColumnError(error, ["calculator_name", "calculator_code", "hero_image_url"]);
}

export function isMissingCategoriesColumnError(error: unknown): boolean {
  return isMissingAnyColumnError(error, ["categories"]);
}

export function missingClientInsightOptionalColumns(error: unknown): {
  categories: boolean;
  calculators: boolean;
} {
  return {
    categories: isMissingCategoriesColumnError(error),
    calculators: isMissingCalculatorColumnsError(error),
  };
}

export function isPostgresConnectionError(error: unknown): boolean {
  const text = collectErrorText(error);
  return (
    text.includes("28P01") ||
    text.includes("password authentication failed") ||
    text.includes("ECIRCUITBREAKER") ||
    text.includes("too many authentication failures") ||
    text.includes("ECONNREFUSED") ||
    text.includes("ENOTFOUND") ||
    text.includes("ETIMEDOUT")
  );
}
