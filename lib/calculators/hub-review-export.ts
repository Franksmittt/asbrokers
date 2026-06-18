import { HUB_CALCULATORS, type HubCalculator } from "@/lib/calculators/hub-catalog";

export type CalculatorReviewEntry = {
  keep: boolean;
  notes: string;
};

export type CalculatorReviewState = Record<string, CalculatorReviewEntry>;

export const HUB_REVIEW_STORAGE_KEY = "asbrokers-calculator-hub-review-v1";

export type CalculatorReviewExport = {
  format: "asbrokers-calculator-hub-review";
  version: 1;
  exportedAt: string;
  pageUrl: string;
  instructionsForDeveloper: string;
  summary: {
    total: number;
    keep: number;
    remove: number;
    withNotes: number;
  };
  calculators: Array<{
    id: string;
    title: string;
    href: string;
    sectionId: string;
    sectionTitle: string;
    tag: string;
    keep: boolean;
    notes: string;
    decision: "keep" | "remove";
  }>;
  markdownSummary: string;
};

function buildMarkdownSummary(
  rows: CalculatorReviewExport["calculators"],
  exportedAt: string
): string {
  const keep = rows.filter((r) => r.keep);
  const remove = rows.filter((r) => !r.keep);

  const lines = [
    "# AS Brokers Calculator Hub — Curation Review",
    "",
    `Exported: ${exportedAt}`,
    "",
    "## Summary",
    `- **Keep:** ${keep.length}`,
    `- **Remove:** ${remove.length}`,
    `- **Total:** ${rows.length}`,
    "",
    "## Keep these calculators",
    "",
    ...(keep.length
      ? keep.map((r) => `- **${r.title}** (\`${r.id}\`, ${r.href})${r.notes ? `\n  - Notes: ${r.notes}` : ""}`)
      : ["- _(none selected)_"]),
    "",
    "## Remove / do not show on final hub",
    "",
    ...(remove.length
      ? remove.map((r) => `- **${r.title}** (\`${r.id}\`, ${r.href})${r.notes ? `\n  - Notes: ${r.notes}` : ""}`)
      : ["- _(all marked keep)_"]),
    "",
    "## Full detail",
    "",
    ...rows.map(
      (r) =>
        `### ${r.title}\n- ID: \`${r.id}\`\n- URL: ${r.href}\n- Section: ${r.sectionTitle}\n- Decision: **${r.decision}**\n- Notes: ${r.notes || "(none)"}\n`
    ),
  ];

  return lines.join("\n");
}

export function buildCalculatorReviewExport(
  state: CalculatorReviewState,
  pageUrl = "https://www.asbrokers.co.za/calculators"
): CalculatorReviewExport {
  const exportedAt = new Date().toISOString();

  const calculators = HUB_CALCULATORS.map((calc: HubCalculator) => {
    const entry = state[calc.id] ?? { keep: false, notes: "" };
    return {
      id: calc.id,
      title: calc.title,
      href: calc.href,
      sectionId: calc.sectionId,
      sectionTitle: calc.sectionTitle,
      tag: calc.tag,
      keep: entry.keep,
      notes: entry.notes.trim(),
      decision: entry.keep ? ("keep" as const) : ("remove" as const),
    };
  });

  const keep = calculators.filter((c) => c.keep).length;
  const withNotes = calculators.filter((c) => c.notes.length > 0).length;

  const payload: CalculatorReviewExport = {
    format: "asbrokers-calculator-hub-review",
    version: 1,
    exportedAt,
    pageUrl,
    instructionsForDeveloper:
      "Give this file to your developer or Cursor. They should keep only calculators where keep=true, remove the rest from /calculators, and apply any notes.",
    summary: {
      total: calculators.length,
      keep,
      remove: calculators.length - keep,
      withNotes,
    },
    calculators,
    markdownSummary: buildMarkdownSummary(calculators, exportedAt),
  };

  return payload;
}

export function downloadCalculatorReviewExport(state: CalculatorReviewState): void {
  const payload = buildCalculatorReviewExport(
    state,
    typeof window !== "undefined" ? window.location.href : undefined
  );

  const date = payload.exportedAt.slice(0, 10);
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `asbrokers-calculator-review-${date}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadCalculatorReviewMarkdown(state: CalculatorReviewState): void {
  const payload = buildCalculatorReviewExport(
    state,
    typeof window !== "undefined" ? window.location.href : undefined
  );
  const date = payload.exportedAt.slice(0, 10);
  const blob = new Blob([payload.markdownSummary], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `asbrokers-calculator-review-${date}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}
