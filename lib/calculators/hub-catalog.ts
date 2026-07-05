/**
 * Public /calculators hub — ASSET 001–017 only (June 2026 rebuild).
 */

import {
  CALCULATOR_REGISTRY,
  formatPublicCalculatorTitle,
  type CalculatorRegistryEntry,
} from "@/lib/calculators/registry";

export type HubCalculator = {
  id: string;
  assetCode: string;
  title: string;
  href: string;
};

function toHubCalculator(entry: CalculatorRegistryEntry): HubCalculator {
  return {
    id: entry.id,
    assetCode: entry.assetCode,
    title: formatPublicCalculatorTitle(entry),
    href: entry.embedPath,
  };
}

export const HUB_CALCULATORS: HubCalculator[] = CALCULATOR_REGISTRY.map(toHubCalculator);

export function getHubCalculatorById(id: string): HubCalculator | undefined {
  return HUB_CALCULATORS.find((c) => c.id === id);
}
