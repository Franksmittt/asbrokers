import type { SoloCalculatorPageProps } from "@/components/calculators/SoloCalculatorPageView";

const FIDUCIARY_DEFAULT = [
  "Educational illustration only, not personalised financial, tax, or legal advice.",
  "SARS brackets and product terms may change; confirm with a qualified practitioner.",
  "FSP 17273 · Category 1.8 independent adviser.",
];

export const SOLO_INCOME_IN_RETIREMENT: SoloCalculatorPageProps = {
  path: "/income-in-retirement",
  kicker: "Educational illustration · Retirement income",
  heroTitle: "Capital Sustainability Illustration",
  heroSubtitle:
    "Model how long retirement capital may last at a chosen drawdown. Illustrative only — not a personal recommendation.",
  heroImage: "/images/home4-goal-retire-16x9.jpg",
  heroImageAlt: "Retiree reviewing sustainable drawdown and capital longevity",
  calculatorSrc: "/embed-calculators/asset-004-life-of-capital.html",
  calculatorTitle: "Life of Capital Calculator",
  sidePanelTitle: "What this test shows",
  sidePanelParagraphs: [
    "Retirement income is not just about yield, it is about how long capital can sustain your lifestyle when markets, inflation, and drawdowns interact.",
    "Enter your lump sum, desired monthly income, and an illustrative growth rate to see when capital may deplete.",
  ],
  sidePanelBullets: [
    "Stress-test drawdown sustainability",
    "Compare income needs against capital base",
    "Identify gaps before you retire",
    "Use results to prepare informed adviser conversations",
  ],
  fiduciaryNotes: FIDUCIARY_DEFAULT,
};

export const SOLO_INFLATION: SoloCalculatorPageProps = {
  path: "/cost-of-inflation-over-time",
  kicker: "Educational illustration · Purchasing power",
  heroTitle: "Purchasing Power Illustration",
  heroSubtitle:
    "See how inflation can erode the real value of cash and fixed amounts over time. Educational illustration only.",
  heroImage: "/images/home4-import/card3.jpg",
  heroImageAlt: "Financial planning desk, purchasing power and inflation review",
  calculatorSrc: "/embed-calculators/asset-005-future-value.html",
  calculatorTitle: "Future Value / Inflation Calculator",
  sidePanelTitle: "Why purchasing power matters",
  sidePanelParagraphs: [
    "A rand today buys less tomorrow. Retirement plans that ignore inflation often look adequate on paper but fail in real life.",
    "Model how a lump sum or monthly amount may grow, or how today's expenses may escalate over your planning horizon.",
  ],
  sidePanelBullets: [
    "Illustrate CPI impact on long-term goals",
    "Compare nominal vs real outcomes",
    "Support retirement and estate conversations",
    "Educational only, not a forecast guarantee",
  ],
  fiduciaryNotes: FIDUCIARY_DEFAULT,
};

export const SOLO_INCOME_TAX: SoloCalculatorPageProps = {
  path: "/income-tax-calculator",
  kicker: "Educational illustration · Income tax",
  heroTitle: "Income Tax Illustrator",
  heroSubtitle:
    "Estimate marginal income tax using SARS 2026/27 illustrative brackets. Educational only — not a SARS assessment.",
  heroImage: "/images/home4-import/card1.jpg",
  heroImageAlt: "Tax planning worksheet and calculator",
  calculatorSrc: "/embed-calculators/asset-006-income-tax.html",
  calculatorTitle: "Income Tax Calculator",
  sidePanelTitle: "How to use this illustration",
  sidePanelParagraphs: [
    "Understanding marginal tax brackets helps frame retirement contribution and drawdown conversations.",
    "Enter taxable income components to see illustrative tax payable, not a substitute for a full SARS assessment.",
  ],
  sidePanelBullets: [
    "SARS 2026/27 bracket illustration",
    "Rebates and medical credits where applicable",
    "Compare tax on interest vs dividends in adviser sessions",
    "Confirm final positions with your tax practitioner",
  ],
  fiduciaryNotes: FIDUCIARY_DEFAULT,
};

export const SOLO_ESTATE_DUTY: SoloCalculatorPageProps = {
  path: "/estate-duty-calculator",
  kicker: "Educational illustration · Estate duty",
  heroTitle: "Estate Duty Illustrator",
  heroSubtitle:
    "Estimate estate duty and executor fees using illustrative abatement and rate structures. Educational only — not legal advice.",
  heroImage: "/images/home4-goal-estate-16x9.jpg",
  heroImageAlt: "Estate planning documents and duty estimation",
  calculatorSrc: "/embed-calculators/asset-007-estate-duty.html",
  calculatorTitle: "Estate Duty & Executor Fee Calculator",
  sidePanelTitle: "What to enter",
  sidePanelParagraphs: [
    "Estate duty applies to net dutiable estate above the R3.5 million abatement (illustrative rules as implemented in the tool). Executor fees and liquidity shortfalls are often underestimated.",
    "Use this illustration to explore potential duty and fees, then discuss trusts, donations, and liquidity with a qualified adviser after a needs analysis.",
  ],
  sidePanelBullets: [
    "R3.5m abatement illustration",
    "20% / 25% duty bands",
    "Executor fee at 3.5% + VAT",
    "Not legal advice, educational estimate",
  ],
  fiduciaryNotes: FIDUCIARY_DEFAULT,
};

export const SOLO_ESTATE_REDUCTION: SoloCalculatorPageProps = {
  path: "/annual-estate-reduction-strategy",
  kicker: "Educational illustration · Estate reduction",
  heroTitle: "Annual Estate Reduction Illustrator",
  heroSubtitle:
    "Model how annual donations (R100k / R200k limits) may affect dutiable estate over time under SARS donation rules. Educational only.",
  heroImage: "/images/home4-goal-estate-16x9.jpg",
  heroImageAlt: "Legacy planning, annual donation and estate reduction strategy",
  calculatorSrc: "/embed-calculators/asset-008-estate-reduction.html",
  calculatorTitle: "Estate Reduction Strategy Calculator",
  sidePanelTitle: "Planning with donations",
  sidePanelParagraphs: [
    "Annual donations within SARS limits can transfer wealth during a lifetime while reducing eventual estate duty when structured correctly during advice.",
    "Enter estate value, donation amounts, and horizon to see an illustrative reduction in dutiable estate.",
  ],
  sidePanelBullets: [
    "R100k / R200k annual donation bands",
    "Long-horizon estate reduction illustration",
    "Pairs with wills, trusts, and liquidity planning",
    "Personal structuring requires professional advice",
  ],
  fiduciaryNotes: FIDUCIARY_DEFAULT,
};

export const SOLO_PREMIUM_INCREASE: SoloCalculatorPageProps = {
  path: "/premium-increase-calculator",
  kicker: "Educational illustration · Life insurance",
  heroTitle: "Premium Escalation Illustrator",
  heroSubtitle:
    "The cheapest life policy today can become the most expensive to keep in 10, 15, or 20 years. This illustration helps you understand escalation patterns before committing to a structure.",
  heroImage: "/images/home4-goal-insure-16x9.jpg",
  heroImageAlt: "Life insurance policy review, premium sustainability planning",
  calculatorTitle: "Premium Escalation Comparison",
  sidePanelTitle: "What this illustration shows",
  sidePanelParagraphs: [
    "Age-rated premiums with annual increases can compound into unsustainable costs in retirement, especially when guarantees expire.",
    "A structured review compares escalating vs level (or behaviour-linked) premium patterns using your actual policy schedules, not generic quotes. This illustration provides a starting point for that conversation.",
  ],
  sidePanelBullets: [
    "Can you afford this policy in 10–20 years?",
    "What happens when guarantees expire?",
    "Level vs escalating premium structures",
    "Behaviour-linked alternatives where appropriate",
  ],
  fiduciaryNotes: [
    ...FIDUCIARY_DEFAULT,
    "Year-by-year premium comparison requires your policy schedule; request a review for personalised modelling.",
  ],
};
