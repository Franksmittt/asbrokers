/** Public /calculators hub — canonical list for cards and curation export. */

export type HubCalculator = {
  id: string;
  sectionId: string;
  sectionTitle: string;
  sectionQuestion?: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  leadsTo: string;
  href: string;
  featured?: boolean;
  glow?: boolean;
  muted?: boolean;
  leadsToAccent?: boolean;
  gridClassName?: string;
};

export const HUB_SECTIONS = {
  retirement: {
    id: "retirement",
    title: "Capital Lifespan & High-Yield Solutions",
    question: "Am I on track for retirement? What does a real product solution look like?",
  },
  risk: {
    id: "risk-architecture",
    title: "Secondary Risk Architecture",
    question: "Tax, estate, and life insurance exposure.",
  },
} as const;

export const HUB_CALCULATORS: HubCalculator[] = [
  {
    id: "retirement-savings",
    sectionId: HUB_SECTIONS.retirement.id,
    sectionTitle: HUB_SECTIONS.retirement.title,
    sectionQuestion: HUB_SECTIONS.retirement.question,
    tag: "Problem Identifier",
    title: "Retirement Savings Calculator",
    description:
      "This calculator highlights whether your current savings rate, time horizon, and assumptions are sufficient to fund retirement.",
    bullets: [
      "Shortfalls in retirement funding",
      "The limits of late-stage saving",
      "The need for structured retirement vehicles",
    ],
    leadsTo: "Retirement annuities, preservation funds, and structured long-term investment planning.",
    href: "/retirement",
    leadsToAccent: true,
    gridClassName: "md:col-span-1",
  },
  {
    id: "income-in-retirement",
    sectionId: HUB_SECTIONS.retirement.id,
    sectionTitle: HUB_SECTIONS.retirement.title,
    sectionQuestion: HUB_SECTIONS.retirement.question,
    tag: "Problem Identifier",
    title: "Income in Retirement Calculator",
    description:
      "This calculator models how long your capital can realistically sustain a chosen level of income in retirement.",
    bullets: [
      "Why income sustainability matters more than capital value",
      "The impact of withdrawal rates and inflation",
      "The risks of drawing income without a structured plan",
    ],
    leadsTo: "Living annuities, income-focused investments, and drawdown management strategies.",
    href: "/income-in-retirement",
    featured: true,
    leadsToAccent: true,
    gridClassName: "md:col-span-2",
  },
  {
    id: "inflation-impact",
    sectionId: HUB_SECTIONS.retirement.id,
    sectionTitle: HUB_SECTIONS.retirement.title,
    sectionQuestion: HUB_SECTIONS.retirement.question,
    tag: "Problem Identifier",
    title: "Inflation Impact Calculator",
    description: "This calculator isolates inflation as a hidden risk to purchasing power.",
    bullets: [
      "Why nominal returns are misleading",
      "How inflation erodes income over time",
      "The need for inflation-beating strategies",
    ],
    leadsTo: "Growth-oriented investments, real-return strategies, and inflation-aware planning.",
    href: "/cost-of-inflation-over-time",
    leadsToAccent: true,
    gridClassName: "md:col-span-1",
  },
  {
    id: "wealth-building",
    sectionId: HUB_SECTIONS.retirement.id,
    sectionTitle: HUB_SECTIONS.retirement.title,
    sectionQuestion: HUB_SECTIONS.retirement.question,
    tag: "Wealth Modeller",
    title: "AS Brokers Wealth Building Calculator",
    description:
      "A general-purpose compound growth calculator for investments, retirement savings, business growth, and financial freedom planning.",
    bullets: [
      "Any annual growth rate — no artificial caps",
      "Monthly contributions with annual increases",
      "Multi-currency display",
      "Total invested vs growth earned",
    ],
    leadsTo: "Structured wealth planning, retirement capital, and high-yield investment conversations.",
    href: "/wealth-building-calculator",
    leadsToAccent: true,
    gridClassName: "md:col-span-1",
  },
  {
    id: "everest-wealth-products",
    sectionId: HUB_SECTIONS.retirement.id,
    sectionTitle: HUB_SECTIONS.retirement.title,
    sectionQuestion: HUB_SECTIONS.retirement.question,
    tag: "Product Quotation",
    title: "Everest Wealth Product Quote Calculators",
    description: "These calculators generate indicative product-based projections using real assumptions.",
    bullets: [
      "Translate strategy into product outcomes",
      "Compare scenarios using actual investment structures",
      "Support informed product selection",
    ],
    leadsTo: "Everest Wealth investment products and implementation discussions.",
    href: "/everest-wealth",
    featured: true,
    glow: true,
    leadsToAccent: true,
    gridClassName: "md:col-span-2",
  },
  {
    id: "income-tax",
    sectionId: HUB_SECTIONS.risk.id,
    sectionTitle: HUB_SECTIONS.risk.title,
    sectionQuestion: HUB_SECTIONS.risk.question,
    tag: "Problem Identifier",
    title: "Income Tax Calculator",
    description: "This calculator models how income is taxed across different scenarios.",
    bullets: [
      "The real cost of marginal tax rates",
      "The difference between taxable income and net income",
      "Why tax-efficient structuring matters",
    ],
    leadsTo: "Tax-efficient investments, retirement products, and income structuring strategies.",
    href: "/income-tax-calculator",
    muted: true,
  },
  {
    id: "estate-duty",
    sectionId: HUB_SECTIONS.risk.id,
    sectionTitle: HUB_SECTIONS.risk.title,
    sectionQuestion: HUB_SECTIONS.risk.question,
    tag: "Problem Identifier",
    title: "Estate Duty & Fees Calculator",
    description: "This calculator estimates how much of an estate may be lost to estate duty and administration fees.",
    bullets: [
      "The impact of estate costs at death",
      "Why liquidity planning matters",
      "The consequences of poor estate structuring",
    ],
    leadsTo: "Estate planning strategies, life insurance for liquidity, and trust-based planning.",
    href: "/estate-duty-calculator",
    muted: true,
  },
  {
    id: "estate-reduction",
    sectionId: HUB_SECTIONS.risk.id,
    sectionTitle: HUB_SECTIONS.risk.title,
    sectionQuestion: HUB_SECTIONS.risk.question,
    tag: "Strategy Modeller",
    title: "Estate Duty Reduction Strategy Calculator",
    description: "This calculator models long-term estate reduction strategies using annual planning techniques.",
    bullets: [
      "How estates can be reduced legally over time",
      "The role of gifting and structuring",
      "Why early planning matters",
    ],
    leadsTo: "Trust structures, estate planning strategies, and long-term intergenerational planning.",
    href: "/annual-estate-reduction-strategy",
    muted: true,
  },
  {
    id: "premium-increase-life",
    sectionId: HUB_SECTIONS.risk.id,
    sectionTitle: HUB_SECTIONS.risk.title,
    sectionQuestion: HUB_SECTIONS.risk.question,
    tag: "Problem Identifier",
    title: "Premium Increase Problem Calculator (Life Assurance)",
    description: "This calculator exposes the long-term risk of escalating life insurance premiums.",
    bullets: [
      "Why some policies become unaffordable over time",
      "How premium structures impact long-term sustainability",
      "The difference between short-term affordability and long-term certainty",
    ],
    leadsTo:
      "Structured life insurance solutions designed for certainty and sustainability, including properly structured business and personal life cover.",
    href: "/premium-increase-calculator",
    muted: true,
  },
];

export function getHubCalculatorsBySection(sectionId: string): HubCalculator[] {
  return HUB_CALCULATORS.filter((c) => c.sectionId === sectionId);
}
