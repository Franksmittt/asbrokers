export type CalculatorCodeSnippet = {
  id: string;
  title: string;
  sourcePath: string;
  code: string;
};

export function isEmbedReadyCalculatorSnippet(snippet: CalculatorCodeSnippet): boolean {
  return snippet.code.trim().startsWith("<");
}

function buildCalculatorIframeEmbed(path: string, title: string): string {
  return `<iframe src="${path}" title="${title}" loading="lazy" style="display:block;width:100%;min-height:640px;border:0;border-radius:12px;background:#0a0a0c;"></iframe>`;
}

export const CALCULATOR_CODE_SNIPPETS: CalculatorCodeSnippet[] = [
  {
    id: "retirement-reality",
    title: "Retirement Reality Calculator",
    sourcePath: "app/embed/calculators/retirement-reality/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/retirement-reality", "Retirement Reality Calculator"),
  },
  {
    id: "retirement-shortfall",
    title: "Retirement Shortfall Calculator",
    sourcePath: "app/embed/calculators/retirement-shortfall/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/retirement-shortfall", "Retirement Shortfall Calculator"),
  },
  {
    id: "life-of-capital",
    title: "Life of Capital Calculator",
    sourcePath: "app/embed/calculators/life-of-capital/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/life-of-capital", "Life of Capital Calculator"),
  },
  {
    id: "future-value-inflation",
    title: "Cost of Inflation Over Time Calculator",
    sourcePath: "app/embed/calculators/future-value/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/future-value", "Cost of Inflation Over Time Calculator"),
  },
  {
    id: "financial-freedom-capital",
    title: "AS Brokers Financial Freedom Calculator",
    sourcePath: "app/embed/calculators/financial-freedom-capital/page.tsx",
    code: buildCalculatorIframeEmbed(
      "/embed/calculators/financial-freedom-capital",
      "AS Brokers Financial Freedom Calculator"
    ),
  },
  {
    id: "growth-rate",
    title: "AS Brokers Growth Rate Calculator",
    sourcePath: "app/embed/calculators/growth-rate/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/growth-rate", "AS Brokers Growth Rate Calculator"),
  },
  {
    id: "income-tax",
    title: "Income Tax Calculator",
    sourcePath: "app/embed/calculators/income-tax/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/income-tax", "Income Tax Calculator"),
  },
  {
    id: "estate-duty",
    title: "Estate Duty Calculator",
    sourcePath: "app/embed/calculators/estate-duty/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/estate-duty", "Estate Duty Calculator"),
  },
  {
    id: "estate-reduction",
    title: "Estate Reduction Strategy Calculator",
    sourcePath: "app/embed/calculators/estate-reduction/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/estate-reduction", "Estate Reduction Strategy Calculator"),
  },
  {
    id: "premium-comparison",
    title: "Premium Increase Problem Calculator",
    sourcePath: "app/embed/calculators/premium-comparison/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/premium-comparison", "Premium Increase Problem Calculator"),
  },
  {
    id: "everest-income-embed",
    title: "Everest 12.8 Income Calculator",
    sourcePath: "app/embed/calculators/everest-142/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/everest-142", "Everest 12.8 Income Calculator"),
  },
  {
    id: "everest-128",
    title: "Everest 12.8 Product Calculator",
    sourcePath: "app/embed/calculators/everest-128/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/everest-128", "Everest 12.8 Product Calculator"),
  },
  {
    id: "everest-128-vs-142",
    title: "12.8% vs 14.2% Investment Income Comparison Calculator",
    sourcePath: "app/embed/calculators/everest-128-vs-142/page.tsx",
    code: buildCalculatorIframeEmbed(
      "/embed/calculators/everest-128-vs-142",
      "12.8% vs 14.2% Investment Income Comparison Calculator"
    ),
  },
  {
    id: "everest-128-vs-142-five-year",
    title: "12.8% vs 14.2% Five-Year Income Comparison",
    sourcePath: "app/embed/calculators/everest-128-vs-142-five-year/page.tsx",
    code: buildCalculatorIframeEmbed(
      "/embed/calculators/everest-128-vs-142-five-year",
      "12.8% vs 14.2% Five-Year Income Comparison"
    ),
  },
  {
    id: "everest-145-growth",
    title: "Everest Strategic Growth 14.5 Calculator",
    sourcePath: "app/embed/calculators/everest-145-growth/page.tsx",
    code: buildCalculatorIframeEmbed(
      "/embed/calculators/everest-145-growth",
      "Everest Strategic Growth 14.5 Calculator"
    ),
  },
  {
    id: "amethyst-annuity",
    title: "Everest Amethyst Living Annuity Calculator",
    sourcePath: "app/embed/calculators/amethyst-annuity/page.tsx",
    code: buildCalculatorIframeEmbed(
      "/embed/calculators/amethyst-annuity",
      "Everest Amethyst Living Annuity Calculator"
    ),
  },
  {
    id: "average-clause",
    title: "Average Clause Calculator",
    sourcePath: "app/embed/calculators/average-clause/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/average-clause", "Average Clause Calculator"),
  },
  {
    id: "run-out-capital",
    title: "Run Out of Capital Calculator",
    sourcePath: "app/embed/calculators/run-out-capital/page.tsx",
    code: buildCalculatorIframeEmbed("/embed/calculators/run-out-capital", "Run Out of Capital Calculator"),
  },
];

export function getCalculatorCodePackText(): string {
  return CALCULATOR_CODE_SNIPPETS.filter(isEmbedReadyCalculatorSnippet).map(
    (s) => `# ${s.title}\nSource: ${s.sourcePath}\n\n${s.code}`
  ).join("\n\n------------------------------\n\n");
}
