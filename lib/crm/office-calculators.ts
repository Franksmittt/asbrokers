import {
  CALCULATOR_CODE_SNIPPETS,
  isEmbedReadyCalculatorSnippet,
} from "@/lib/client-studio/calculator-code-pack";

export type OfficeCalculator = {
  id: string;
  /** Staff-facing label (includes asset code when set). */
  title: string;
  embedPath: string;
};

function embedPathFromSnippet(code: string): string | null {
  const match = code.match(/src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

/** Calculators available in Team office for live client sessions. */
export const OFFICE_CALCULATORS: OfficeCalculator[] = CALCULATOR_CODE_SNIPPETS.filter(
  isEmbedReadyCalculatorSnippet
)
  .map((snippet) => {
    const embedPath = embedPathFromSnippet(snippet.code);
    if (!embedPath) return null;
    return { id: snippet.id, title: snippet.staffLabel, embedPath };
  })
  .filter((row): row is OfficeCalculator => row !== null)
  .sort((a, b) => a.title.localeCompare(b.title));

export const DEFAULT_OFFICE_CALCULATOR_ID =
  OFFICE_CALCULATORS.find((c) => c.id === "asset-001-retirement-growth")?.id ??
  OFFICE_CALCULATORS[0]?.id ??
  "";
