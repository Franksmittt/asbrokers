/** Canonical list of embed calculators — derived from `lib/calculators/registry.ts`. */
import {
  CALCULATOR_REGISTRY,
  formatPublicCalculatorTitle,
  type CalculatorRegistryEntry,
} from "@/lib/calculators/registry";

export type EmbedCalculatorEntry = {
  id: string;
  title: string;
  assetCode: string;
  embedPath: string;
};

function toEmbedEntry(entry: CalculatorRegistryEntry): EmbedCalculatorEntry {
  return {
    id: entry.id,
    title: formatPublicCalculatorTitle(entry),
    assetCode: entry.assetCode,
    embedPath: entry.embedPath,
  };
}

export const EMBED_CALCULATOR_REGISTRY: EmbedCalculatorEntry[] = CALCULATOR_REGISTRY.map(toEmbedEntry);

export function embedPathForCalculator(id: string): string {
  const entry = CALCULATOR_REGISTRY.find((row) => row.id === id);
  return entry?.embedPath ?? `/embed-calculators/${id}.html`;
}

export function getAllEmbedCalculators(): EmbedCalculatorEntry[] {
  return EMBED_CALCULATOR_REGISTRY;
}
