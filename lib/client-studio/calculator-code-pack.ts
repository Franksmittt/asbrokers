import {
  CALCULATOR_REGISTRY,
  formatPublicCalculatorTitle,
  formatStaffCalculatorLabel,
  type CalculatorRegistryEntry,
} from "@/lib/calculators/registry";

export type CalculatorCodeSnippet = {
  id: string;
  title: string;
  /** Staff-only label shown in Blog Studio / CRM (includes asset code when set). */
  staffLabel: string;
  sourcePath: string;
  code: string;
};

export function isEmbedReadyCalculatorSnippet(snippet: CalculatorCodeSnippet): boolean {
  return snippet.code.trim().startsWith("<");
}

/** Blog Studio also offers cornerstone Method link (Asset 018) — not an iframe calculator. */
export function isStudioInsertSnippet(snippet: CalculatorCodeSnippet): boolean {
  return isEmbedReadyCalculatorSnippet(snippet);
}

function buildCalculatorIframeEmbed(path: string, title: string): string {
  return `<iframe src="${path}" title="${title}" loading="eager" data-asb-calculator-embed="true" style="display:block;width:100%;height:640px;min-height:640px;border:0;border-radius:12px;background:#0a0a0c;"></iframe>`;
}

function toSnippet(entry: CalculatorRegistryEntry): CalculatorCodeSnippet {
  const publicTitle = formatPublicCalculatorTitle(entry);
  return {
    id: entry.id,
    title: publicTitle,
    staffLabel: formatStaffCalculatorLabel(entry),
    sourcePath: entry.sourcePath,
    code: buildCalculatorIframeEmbed(entry.embedPath, publicTitle),
  };
}

export const CALCULATOR_CODE_SNIPPETS: CalculatorCodeSnippet[] = [
  ...CALCULATOR_REGISTRY.map(toSnippet),
  {
    id: "asset-018-retirement-gap-method",
    title: "The Retirement Gap Method™",
    staffLabel: "ASSET 018: The Retirement Gap Method™ (cornerstone page — link, not embed)",
    sourcePath: "app/(content)/retirement-gap-method/page.tsx",
    code: `<p><a href="/retirement-gap-method" data-asb-method-link="true"><strong>The Retirement Gap Method™</strong></a> — understand, measure and close your Retirement Gap through the Toolkit, workshop, Financial Freedom Community™ and personalised reviews.</p>`,
  },
];

export function getCalculatorCodePackText(): string {
  return CALCULATOR_CODE_SNIPPETS.filter(isEmbedReadyCalculatorSnippet)
    .map((s) => `# ${s.staffLabel}\nSource: ${s.sourcePath}\n\n${s.code}`)
    .join("\n\n------------------------------\n\n");
}
