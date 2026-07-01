/** Review metadata for the internal calculator grid — groups similar tools for curation. */
export type CalculatorReviewMeta = {
  group: string;
  note?: string;
};

export const CALCULATOR_REVIEW_META: Record<string, CalculatorReviewMeta> = {
  "asset-001-retirement-growth": {
    group: "Retirement planning",
    note: "Growth rate required to reach retirement target",
  },
  "asset-002-retirement-reality-check": {
    group: "Retirement planning",
    note: "Capital gap and reality check",
  },
  "asset-003-retirement-premium": {
    group: "Retirement planning",
    note: "Premium and contribution planning",
  },
  "asset-004-life-of-capital": {
    group: "Retirement planning",
    note: "How long capital may last in drawdown",
  },
  "asset-005-future-value": {
    group: "Inflation & tax",
    note: "Cost of inflation over time",
  },
  "asset-006-income-tax": {
    group: "Inflation & tax",
    note: "SARS income tax estimate",
  },
  "asset-007-estate-duty": {
    group: "Estate",
    note: "Duty, abatement, executor fees",
  },
  "asset-008-estate-reduction": {
    group: "Estate",
    note: "Donations and duty reduction strategies",
  },
  "asset-009-everest-142-income": {
    group: "Everest single product",
    note: "14.2% Onyx income illustration",
  },
  "asset-010-everest-128-income": {
    group: "Everest single product",
    note: "12.8% Strategic Income with 10% bonus at year 5",
  },
  "asset-011-everest-128-vs-142": {
    group: "Everest 12.8 vs 14.2",
    note: "Side-by-side income comparison",
  },
  "asset-012-strategic-growth": {
    group: "Everest single product",
    note: "14.5% strategic growth — five-year maturity value",
  },
  "asset-013-everest-income-vs-growth": {
    group: "Everest comparison",
    note: "12.8% vs 14.2% vs 14.5% strategy comparison",
  },
  "asset-014-living-annuity": {
    group: "Living annuity",
    note: "Drawdown, surplus and inflation protection illustration",
  },
  "asset-015-average-clause": {
    group: "Insurance",
    note: "Underinsurance claim reduction",
  },
  "asset-016-growth-comparison": {
    group: "Wealth building",
    note: "Growth rate and contribution future value",
  },
  "asset-017-personal-goal": {
    group: "Wealth building",
    note: "Personal goal setting and monthly spread",
  },
};

export function getCalculatorReviewMeta(id: string): CalculatorReviewMeta {
  return CALCULATOR_REVIEW_META[id] ?? { group: "General" };
}
