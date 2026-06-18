/** Review metadata for the internal calculator grid — groups similar tools for curation. */
export type CalculatorReviewMeta = {
  group: string;
  note?: string;
};

export const CALCULATOR_REVIEW_META: Record<string, CalculatorReviewMeta> = {
  "everest-128": {
    group: "Everest single product",
    note: "12.8% product illustration",
  },
  "everest-142": {
    group: "Everest single product",
    note: "14.2% income illustration",
  },
  "everest-145-growth": {
    group: "Everest single product",
    note: "14.5% growth product",
  },
  "everest-128-vs-142": {
    group: "Everest 12.8 vs 14.2",
    note: "Flexible comparison — adjustable years, 8% bonus toggle, reinvest option",
  },
  "everest-128-vs-142-five-year": {
    group: "Everest 12.8 vs 14.2",
    note: "Fixed 5-year table — 10% bonus at year 5, full income breakdown",
  },
  "retirement-reality": {
    group: "Retirement planning",
  },
  "retirement-shortfall": {
    group: "Retirement planning",
    note: "Capital gap and contribution estimate",
  },
  "growth-rate": {
    group: "Retirement planning",
    note: "AS Brokers Freedom Rate — uncapped gap measurement",
  },
  "financial-freedom-capital": {
    group: "Retirement planning",
    note: "Capital required + monthly savings — 5% yield, level contributions",
  },
  "run-out-capital": {
    group: "Retirement planning",
    note: "Portfolio drawdown timeline",
  },
  "life-of-capital": {
    group: "Retirement planning",
  },
  "future-value": {
    group: "Inflation & tax",
    note: "Cost of inflation over time",
  },
  "income-tax": {
    group: "Inflation & tax",
  },
  "estate-duty": {
    group: "Estate",
  },
  "estate-reduction": {
    group: "Estate",
  },
  "premium-comparison": {
    group: "Insurance",
  },
  "average-clause": {
    group: "Insurance",
    note: "Underinsurance claim reduction",
  },
  "amethyst-annuity": {
    group: "Living annuity",
  },
};

export function getCalculatorReviewMeta(id: string): CalculatorReviewMeta {
  return CALCULATOR_REVIEW_META[id] ?? { group: "General" };
}
