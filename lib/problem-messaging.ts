/**
 * Problem-led messaging architecture (excludes homepage).
 * Source: Problem-Led Brand Positioning research (Jul 2026).
 * Framework: Problem → Agitation → Unique Mechanism → Proof → Path
 */

export const DIFFERENTIATION_THESIS =
  "AS Brokers replaces product-pushing with mathematical diagnostics. Independent FSP 17273 with Category 1.8 access, education before advice, and a human local team, so your problem dictates the solution.";

export const PROOF_PILLARS = [
  "Category 1.8 unlisted market access",
  "Mathematical diagnostic rigor (education before advice)",
  "Fiduciary independence (no institutional quotas)",
  "Specialised operational depth (underwriting, medical, claims)",
  "Scope honesty (financial engineering vs attorney drafting)",
  "Radical transparency of product constraints",
] as const;

/** Plain-language problem → best entry URL */
export const PROBLEM_ROUTER = [
  {
    problem: "Will my money last until I die?",
    href: "/retirement-planning",
    primaryCta: "Run Retirement Reality Check",
    secondaryCta: "Book actuarial consultation",
  },
  {
    problem: "I need fixed monthly income, not JSE stress.",
    href: "/everest-wealth",
    primaryCta: "Calculate 12.8% target income",
    secondaryCta: "Read Everest review guide",
  },
  {
    problem: "I'm paying too much tax on my interest.",
    href: "/investments",
    primaryCta: "Compare growth vs income profiles",
    secondaryCta: "Book capital assessment",
  },
  {
    problem: "I don't understand the new Two-Pot rules.",
    href: "/insights",
    primaryCta: "Read Two-Pot navigation guide",
    secondaryCta: "Contact an adviser",
  },
  {
    problem: "My business is growing; am I underinsured?",
    href: "/insurance",
    primaryCta: "View commercial risk matrix",
    secondaryCta: "Book commercial risk audit",
  },
  {
    problem: "Will my family have cash for executor fees?",
    href: "/estate-planning",
    primaryCta: "Run Estate Duty Calculator",
    secondaryCta: "Start Legacy Checklist",
  },
  {
    problem: "Medical aid co-payments are bankrupting us.",
    href: "/solutions/medical-aid",
    primaryCta: "View gap cover demarcation",
    secondaryCta: "Request medical audit",
  },
] as const;

export type PageMessaging = {
  path: string;
  fiveSecondTest: string;
  h1: string;
  subhead: string;
  problem: string;
  promise: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const PAGE_MESSAGING: Record<string, PageMessaging> = {
  "/retirement-planning": {
    path: "/retirement-planning",
    fiveSecondTest:
      "This firm helps me figure out exactly how much capital I need so I don't run out of money when I stop working, with rigorous math, not sales pitches.",
    h1: "Will your capital survive your lifespan?",
    subhead:
      "Pre-retirement diagnostics for South African professionals who cannot afford guesswork. We calculate the gap first, then decide whether a Wealth Engineering Call is needed.",
    problem:
      "Most financial plans are built to reach retirement, but fail to generate sustainable income through it.",
    promise:
      "We engineer the mathematics required to turn your accumulation pot into sustainable, tax-efficient income for your lifespan.",
    primaryCta: { label: "Start diagnostic", href: "#retirement-survival-blueprint" },
    secondaryCta: { label: "Run Reality Check", href: "/calculators/asset-002-retirement-reality-check" },
  },
  "/investments": {
    path: "/investments",
    fiveSecondTest:
      "They have regulatory access to unlisted alternatives my bank cannot offer, structured to reduce tax drag on voluntary capital.",
    h1: "Independent wealth engineering beyond the standard unit trust",
    subhead:
      "De-risk voluntary capital. Access targeted double-digit yield profiles insulated from JSE volatility and marginal tax drag, through Category 1.8 authorisation where suitable.",
    problem:
      "High-net-worth investors lose too much yield to public market volatility and aggressive marginal income tax.",
    promise:
      "Access structured private-market return profiles and tax-efficient capital architectures through our Category 1.8 authorisation, when they fit your problem.",
    primaryCta: { label: "Compare investment profiles", href: "#diagnostic-tools" },
    secondaryCta: { label: "Explore Everest Wealth", href: "/everest-wealth" },
  },
  "/insurance": {
    path: "/insurance",
    fiveSecondTest:
      "They audit business and home insurance for the loopholes that wipe out a balance sheet after a fire, liability claim, or surge.",
    h1: "Commercial and personal risk architecture",
    subhead:
      "Protection engineered for the reality of your balance sheet, not a generic underwriter's template. Independent placement across the market.",
    problem:
      "Most business owners discover their policies are fundamentally flawed only after the factory has burned down.",
    promise:
      "We structure precise indemnification matched to turnover, capex, and continuity, including Average Clause and Business Interruption realities.",
    primaryCta: { label: "Book a commercial risk audit", href: "#risk-audit" },
    secondaryCta: {
      label: "Run underinsurance calculator",
      href: "/calculators/underinsurance-calculator",
    },
  },
  "/estate-planning": {
    path: "/estate-planning",
    fiveSecondTest:
      "They make sure the estate has cash for taxes and executor fees so the family home is not forced into a fire sale.",
    h1: "Estate liquidity engineering & succession",
    subhead:
      "Do not let executor fees and estate taxes dismantle wealth built over a lifetime. We engineer cash availability, attorneys draft the legal instruments.",
    problem:
      "Drafting a will is only half the job; without engineered liquidity, heirs may be forced into a fire sale to settle duties and fees.",
    promise:
      "We engineer the financial liquidity required to settle SARS and executor fees seamlessly, then hand legal drafting to partnered attorneys.",
    primaryCta: { label: "Run Estate Duty Calculator", href: "#estate-calculators" },
    secondaryCta: { label: "Start Legacy Checklist", href: "/legacy-readiness-checklist" },
  },
  "/about": {
    path: "/about",
    fiveSecondTest:
      "Fully licensed, independent, 25+ years, with human specialists for every part of the portfolio, not a call centre.",
    h1: "Protecting your legacy. Engineering your wealth.",
    subhead:
      "For over two decades, AS Brokers has served as an independent fiduciary compass for South African professionals, families, and business owners, free from institutional quotas.",
    problem:
      "Finding a financial adviser whose interests are entirely aligned with yours, rather than an institution's, is remarkably difficult.",
    promise:
      "Independent FSP 17273 with Category 1.8 access, education before advice, and named specialists who stay with you through claims and onboarding.",
    primaryCta: { label: "Open calculators", href: "/calculators" },
    secondaryCta: { label: "Book a consultation", href: "/contact?source=about_terminal" },
  },
  "/contact": {
    path: "/contact",
    fiveSecondTest:
      "A professional, secure intake that says what to prepare and protects my data under POPIA, then a real adviser responds.",
    h1: "Engineer your wealth architecture",
    subhead:
      "Move from curiosity to clarity. Connect directly with an authorised FSP 17273 adviser, no call centres, no scripted sales pitches.",
    problem: "Taking the first step to untangle your financial architecture can feel overwhelming and risky.",
    promise:
      "A structured, pressure-free path from enquiry to Capital Assessment → Wealth Engineering Call → Implementation.",
    primaryCta: { label: "Submit enquiry", href: "#intake-form-heading" },
    secondaryCta: { label: "WhatsApp our team", href: "https://wa.me/27662276044" },
  },
  "/calculators": {
    path: "/calculators",
    fiveSecondTest:
      "I can run tax, retirement, and estate numbers myself without speaking to a salesperson first.",
    h1: "The mathematical reality check",
    subhead:
      "Intuition fails in complex finance. Use our fiduciary calculator library to test assumptions before you decide. Educational only, not advice.",
    problem: "You cannot plan a 30-year retirement or a corporate risk structure on guesswork.",
    promise:
      "Model retirement longevity, estate liquidity, underinsurance, and yield trade-offs in real time with ungated ASSET tools.",
    primaryCta: { label: "Browse tools by domain", href: "#getting-started" },
    secondaryCta: {
      label: "Book a review of your numbers",
      href: "/contact?source=calculators_terminal",
    },
  },
  "/insights": {
    path: "/insights",
    fiveSecondTest:
      "Deep guides on South African tax, retirement, and investments written by fiduciaries, not marketers.",
    h1: "Fiduciary insights & financial education",
    subhead:
      "Deep-dive analyses of South African market mechanics, from Two-Pot legislation to estate duty, so you arrive at advice already educated.",
    problem: "Financial intuition fails when faced with complex South African legislation.",
    promise: "Master your trajectory through unbiased analyses of market mechanics and fiduciary strategy.",
    primaryCta: { label: "Read featured guide", href: "#insights-featured-heading" },
    secondaryCta: { label: "Subscribe", href: "#newsletter-heading" },
  },
  "/everest-wealth": {
    path: "/everest-wealth",
    fiveSecondTest:
      "Need monthly income without a market correction wiping the plan, constraints and calculators before any sales call.",
    h1: "Need monthly income without betting on the next market correction?",
    subhead:
      "Albert's Category 1.8 practice educates on Everest voluntary preference-share profiles first: targeted dividends, illiquidity, and tax, before anyone asks you to sign.",
    problem:
      "Retirees and income-seekers cannot afford selling into dips, or paying up to 45% marginal tax on interest, when they need predictable cash flow.",
    promise:
      "Independent FSP 17273 education on targeted Everest profiles (12.8% / 14.2% / 14.5%) with radical constraint transparency, then a capital assessment if you want advice.",
    primaryCta: {
      label: "Calculate 12.8% target income",
      href: "/calculators/asset-010-everest-128-income",
    },
    secondaryCta: { label: "Understanding Everest", href: "/everest-wealth/about" },
  },
  "/everest-wealth/about": {
    path: "/everest-wealth/about",
    fiveSecondTest:
      "A regulatory whitepaper on how Everest works, who regulates whom, and what can go wrong, before any sales conversation.",
    h1: "Understanding Everest Wealth, regulation before yield",
    subhead:
      "How FSP 795, FSP 17273 Category 1.8, and the HoldCo separate roles, plus liquidity, tax, and who these structures suit.",
    problem: "Headline yields without structure literacy create unsuitable allocations.",
    promise: "Education-first briefing: structure, risks, fees, and tax before you run a single illustration.",
    primaryCta: { label: "Open Everest hub", href: "/everest-wealth" },
    secondaryCta: {
      label: "Calculate 12.8% target income",
      href: "/calculators/asset-010-everest-128-income",
    },
  },
  "/solutions/medical-aid": {
    path: "/solutions/medical-aid",
    fiveSecondTest:
      "They structure medical aid with gap cover and stay for claims, not the cheapest hospital plan on a comparison site.",
    h1: "Health integration: defending against the medical inflation gap",
    subhead:
      "Schemes pay a base tariff. Specialists often charge far more. We structure scheme + demarcation-compliant gap, then provide human advocacy.",
    problem: "Catastrophic in-hospital shortfalls wipe out households that bought “cheap” medical cover.",
    promise:
      "Demarcation-honest structuring plus specialist onboarding and claims support, FSP 17273, not a call centre.",
    primaryCta: { label: "Book a health structuring call", href: "/contact?source=medical_terminal" },
    secondaryCta: {
      label: "Discovery Health 2026 matrix",
      href: "/solutions/discovery-health",
    },
  },
  "/solutions/discovery-health": {
    path: "/solutions/discovery-health",
    fiveSecondTest:
      "Krugersdorp FSP 17273 helps SA families evaluate Discovery Health Medical Scheme and Gap Cover, same premium as going direct.",
    h1: "Discovery Health medical aid broker for South African families",
    subhead:
      "AS Brokers CC structures Discovery Health plans with Gap Cover stacking, FAIS needs analysis, and claims advocacy from the West Rand.",
    problem: "Self-selecting Discovery plans leaves specialist shortfalls and redundant premiums unaddressed.",
    promise:
      "CMS-regulated broker support already in the premium, needs analysis, and claims advocacy from FSP 17273.",
    primaryCta: { label: "Request Discovery + Gap audit", href: "#discovery-audit-form" },
    secondaryCta: {
      label: "Medical aid & gap hub",
      href: "/solutions/medical-aid",
    },
  },
  "/legacy-readiness-checklist": {
    path: "/legacy-readiness-checklist",
    fiveSecondTest:
      "A free checklist that surfaces the four dangerous assumptions families make about wills and estates, before death makes them permanent.",
    h1: "Don't leave a financial mess behind",
    subhead:
      "Most families believe their affairs are in order. Many are not, and problems found after death cannot be fixed.",
    problem: "Unsigned wills, wrong beneficiaries, and cashless estates create irreversible family damage.",
    promise:
      "An eight-area Legacy Readiness Checklist™, free, printable, plain language for South African families.",
    primaryCta: { label: "Get the free checklist", href: "#checklist-form" },
    secondaryCta: { label: "Estate planning hub", href: "/estate-planning" },
  },
};

export const EVEREST_CONSTRAINT_STRING =
  "Targeted return. R100k min. 5-year term. 120-day notice. Up to 15% penalty may apply. Typically 20% DWT. Not guaranteed.";
