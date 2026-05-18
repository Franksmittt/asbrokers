import {
  CALCULATOR_CODE_SNIPPETS,
  isEmbedReadyCalculatorSnippet,
} from "@/lib/client-studio/calculator-code-pack";

export type OfficeCalculator = {
  /** Route segment under `/embed/calculators/[id]` */
  id: string;
  title: string;
  embedPath: string;
};

function embedPathFromSnippet(code: string): string | null {
  const match = code.match(/src=["'](\/embed\/calculators\/[^"']+)["']/i);
  return match?.[1] ?? null;
}

/** Calculators available in Team office for live client sessions. */
export const OFFICE_CALCULATORS: OfficeCalculator[] = CALCULATOR_CODE_SNIPPETS.filter(
  isEmbedReadyCalculatorSnippet
)
  .map((snippet) => {
    const embedPath = embedPathFromSnippet(snippet.code);
    if (!embedPath) return null;
    const id = embedPath.replace("/embed/calculators/", "").split("?")[0] ?? "";
    if (!id) return null;
    return { id, title: snippet.title, embedPath };
  })
  .filter((row): row is OfficeCalculator => row !== null)
  .sort((a, b) => a.title.localeCompare(b.title));

export const DEFAULT_OFFICE_CALCULATOR_ID =
  OFFICE_CALCULATORS.find((c) => c.id === "future-value")?.id ?? OFFICE_CALCULATORS[0]?.id ?? "";
