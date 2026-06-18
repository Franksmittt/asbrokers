/** Canonical list of embed calculators — keep in sync with `app/embed/calculators/[id]/page.tsx` EMBED_MAP. */
export type EmbedCalculatorEntry = {
  id: string;
  title: string;
};

export const EMBED_CALCULATOR_REGISTRY: EmbedCalculatorEntry[] = [
  { id: "retirement-reality", title: "Retirement Reality Calculator" },
  { id: "retirement-shortfall", title: "Retirement Shortfall Calculator" },
  { id: "life-of-capital", title: "Life of Capital Calculator" },
  { id: "future-value", title: "Cost of Inflation Over Time Calculator" },
  { id: "financial-freedom-capital", title: "AS Brokers Financial Freedom Calculator" },
  { id: "growth-rate", title: "AS Brokers Growth Rate Calculator" },
  { id: "income-tax", title: "Income Tax Calculator" },
  { id: "estate-duty", title: "Estate Duty Calculator" },
  { id: "estate-reduction", title: "Estate Reduction Strategy Calculator" },
  { id: "premium-comparison", title: "Premium Increase Problem Calculator" },
  { id: "everest-128", title: "Everest 12.8 Product Calculator" },
  { id: "everest-128-vs-142", title: "12.8% vs 14.2% Investment Income Comparison Calculator" },
  { id: "everest-128-vs-142-five-year", title: "12.8% vs 14.2% Five-Year Income Comparison" },
  { id: "everest-142", title: "Everest 12.8 Income Calculator" },
  { id: "everest-145-growth", title: "Everest Strategic Growth 14.5 Calculator" },
  { id: "amethyst-annuity", title: "Everest Amethyst Living Annuity Calculator" },
  { id: "average-clause", title: "Average Clause Calculator" },
  { id: "run-out-capital", title: "Run Out of Capital Calculator" },
];

export function embedPathForCalculator(id: string): string {
  return `/embed/calculators/${id}`;
}

export function getAllEmbedCalculators(): { id: string; title: string; embedPath: string }[] {
  return EMBED_CALCULATOR_REGISTRY.map((entry) => ({
    ...entry,
    embedPath: embedPathForCalculator(entry.id),
  }));
}
