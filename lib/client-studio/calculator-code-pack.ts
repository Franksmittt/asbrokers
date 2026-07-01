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

function buildCalculatorIframeEmbed(path: string, title: string): string {
  return `<iframe src="${path}" title="${title}" loading="lazy" style="display:block;width:100%;min-height:640px;border:0;border-radius:12px;background:#0a0a0c;"></iframe>`;
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

export const CALCULATOR_CODE_SNIPPETS: CalculatorCodeSnippet[] = CALCULATOR_REGISTRY.map(toSnippet);

export function getCalculatorCodePackText(): string {
  return CALCULATOR_CODE_SNIPPETS.filter(isEmbedReadyCalculatorSnippet)
    .map((s) => `# ${s.staffLabel}\nSource: ${s.sourcePath}\n\n${s.code}`)
    .join("\n\n------------------------------\n\n");
}
