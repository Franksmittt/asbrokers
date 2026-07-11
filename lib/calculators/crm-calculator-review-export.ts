import { getAllEmbedCalculators } from "@/lib/calculators/embed-registry";
import { getCalculatorReviewMeta } from "@/lib/calculators/review-meta";

export type CalculatorReviewEntry = {
  keep: boolean;
  notes: string;
};

export type CalculatorReviewState = Record<string, CalculatorReviewEntry>;

/** CRM-only, never on public /calculators */
export const CRM_CALCULATOR_REVIEW_STORAGE_KEY = "asbrokers-crm-calculator-review-v1";

export type CrmCalculatorReviewExport = {
  format: "asbrokers-crm-calculator-review";
  version: 1;
  exportedAt: string;
  source: "/crm/calculators";
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
    embedPath: string;
    group: string;
    keep: boolean;
    notes: string;
    decision: "keep" | "remove";
  }>;
  markdownSummary: string;
};

const ALL = getAllEmbedCalculators();

export function emptyCrmReviewState(): CalculatorReviewState {
  return Object.fromEntries(ALL.map((c) => [c.id, { keep: false, notes: "" }]));
}

function buildMarkdownSummary(
  rows: CrmCalculatorReviewExport["calculators"],
  exportedAt: string
): string {
  const keep = rows.filter((r) => r.keep);
  const remove = rows.filter((r) => !r.keep);

  return [
    "# AS Brokers CRM Calculator Review",
    "",
    `Exported: ${exportedAt}`,
    `Source: /crm/calculators (internal only)`,
    "",
    "## Summary",
    `- **Keep:** ${keep.length}`,
    `- **Remove:** ${remove.length}`,
    `- **Total:** ${rows.length}`,
    "",
    "## Keep on public /calculators hub",
    "",
    ...(keep.length
      ? keep.map(
          (r) =>
            `- **${r.title}** (\`${r.id}\`)${r.notes ? `\n  - Notes: ${r.notes}` : ""}\n  - Group: ${r.group}`
        )
      : ["- _(none selected)_"]),
    "",
    "## Remove from public hub",
    "",
    ...(remove.length
      ? remove.map(
          (r) =>
            `- **${r.title}** (\`${r.id}\`)${r.notes ? `\n  - Notes: ${r.notes}` : ""}\n  - Group: ${r.group}`
        )
      : ["- _(all marked keep)_"]),
    "",
    "## Full detail",
    "",
    ...rows.map(
      (r) =>
        `### ${r.title}\n- ID: \`${r.id}\`\n- Embed: ${r.embedPath}\n- Group: ${r.group}\n- Decision: **${r.decision}**\n- Notes: ${r.notes || "(none)"}\n`
    ),
  ].join("\n");
}

export function buildCrmCalculatorReviewExport(state: CalculatorReviewState): CrmCalculatorReviewExport {
  const exportedAt = new Date().toISOString();

  const calculators = ALL.map((calc) => {
    const entry = state[calc.id] ?? { keep: false, notes: "" };
    const meta = getCalculatorReviewMeta(calc.id);
    return {
      id: calc.id,
      title: calc.title,
      embedPath: calc.embedPath,
      group: meta.group,
      keep: entry.keep,
      notes: entry.notes.trim(),
      decision: entry.keep ? ("keep" as const) : ("remove" as const),
    };
  });

  const keep = calculators.filter((c) => c.keep).length;
  const withNotes = calculators.filter((c) => c.notes.length > 0).length;

  const payload: CrmCalculatorReviewExport = {
    format: "asbrokers-crm-calculator-review",
    version: 1,
    exportedAt,
    source: "/crm/calculators",
    instructionsForDeveloper:
      "Internal review from /crm/calculators. Keep only calculators where keep=true on the public /calculators page; remove the rest. Apply notes for naming, grouping, or merges.",
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

export function downloadCrmCalculatorReviewJson(state: CalculatorReviewState): void {
  const payload = buildCrmCalculatorReviewExport(state);
  const date = payload.exportedAt.slice(0, 10);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `asbrokers-crm-calculator-review-${date}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadCrmCalculatorReviewMarkdown(state: CalculatorReviewState): void {
  const payload = buildCrmCalculatorReviewExport(state);
  const date = payload.exportedAt.slice(0, 10);
  const blob = new Blob([payload.markdownSummary], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `asbrokers-crm-calculator-review-${date}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}
