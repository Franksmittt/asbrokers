import type { EverestProductPageProps } from "@/components/everest/EverestProductPageView";

const VOLUNTARY_FIDUCIARY = [
  "R100,000 minimum lump sum on voluntary products",
  "Dividends or growth subject to 20% Dividends Withholding Tax (DWT) where applicable",
  "120-day notice may apply on approved early exit",
  "Up to 15% early exit penalty may apply on voluntary capital",
  "Five-year term commitment; illiquid unlisted preference share structure",
];

export const EVEREST_128_PRODUCT: EverestProductPageProps = {
  path: "/everest-128-product",
  kicker: "Everest Wealth · 12.8% Strategic Income",
  heroTitle: "Yield Engineering: 12.8% Strategic Income.",
  heroSubtitle:
    "Targeted monthly dividend income with a 10% loyalty bonus on capital after five years, for investors who can accept slightly lower cash flow now for long-term value.",
  heroImage: "/images/home4-import/card1.jpg",
  heroImageAlt: "Premium lifestyle context for Everest 12.8% Strategic Income planning",
  calculatorSrc: "/embed-calculators/asset-010-everest-128-income.html",
  calculatorTitle: "12.8% Strategic Income Calculator",
  calculatorLead:
    "Model estimated monthly income from your lump sum at the targeted 12.8% p.a. profile, including 20% DWT and the month-60 loyalty bonus illustration.",
  featureCards: [
    {
      title: "Targeted monthly income",
      description:
        "12.8% p.a. targeted dividend profile paid monthly from voluntary Everest capital, structured return profile, not a guaranteed outcome.",
      accent: "teal",
      span: "col-span-12 lg:col-span-7",
    },
    {
      title: "10% loyalty bonus at month 60",
      description:
        "A 10% capital loyalty bonus after five years for investors who remain fully invested for the term, a trade-off for slightly lower day-one income than Onyx.",
      accent: "blue",
      span: "col-span-12 lg:col-span-5",
    },
  ],
  trustCard: {
    title: "Regulated efficiency (20% DWT)",
    description:
      "Voluntary Everest returns are structured as dividends on preference shares, taxed at a flat 20% Dividends Withholding Tax at source, not marginal income tax on interest. For many higher earners this can be materially more efficient than interest taxed at up to 45%.",
  },
  fiduciaryNotes: VOLUNTARY_FIDUCIARY,
  cta: { label: "Speak to an Everest adviser", href: "/contact" },
  faqs: [
    {
      question: "What is the 12.8% Strategic Income product?",
      answer:
        "It is an Everest voluntary unlisted preference share targeting 12.8% p.a. in monthly dividends, with a 10% loyalty bonus on capital after five years, R100,000 minimum, and standard liquidity constraints.",
    },
    {
      question: "How is tax applied?",
      answer:
        "Dividends are subject to 20% DWT at source, not marginal income tax on interest. This is an educational summary, confirm your position with a tax practitioner.",
    },
  ],
};

export const EVEREST_142_PRODUCT: EverestProductPageProps = {
  path: "/immediate-higher-income-calculator",
  kicker: "Everest Wealth · 14.2% Onyx Income+",
  heroTitle: "Maximum Liquidity: 14.2% Onyx Income+.",
  heroSubtitle:
    "Higher targeted monthly income from day one, with no five-year loyalty bonus, suited when maximum cash flow now matters more than deferred capital rewards.",
  heroImage: "/images/home4-import/card1.jpg",
  heroImageAlt: "Everest Onyx Income+, maximum day-one yield planning",
  calculatorSrc: "/embed-calculators/asset-009-everest-142-income.html",
  calculatorTitle: "14.2% Onyx Income+ Calculator",
  calculatorLead:
    "Compare estimated day-one monthly income at the targeted 14.2% p.a. profile versus waiting for loyalty bonuses on lower-yield structures.",
  featureCards: [
    {
      title: "Max day-one yield",
      description:
        "14.2% p.a. targeted monthly dividends from the start, no five-year wait for enhanced cash flow versus the 12.8% Strategic Income loyalty structure.",
      accent: "blue",
      span: "col-span-12 lg:col-span-7",
    },
    {
      title: "No loyalty bonus",
      description:
        "Onyx prioritises immediate income over deferred capital bonuses. Suitable for retirees and income-dependent investors who need maximum liquidity now.",
      accent: "teal",
      span: "col-span-12 lg:col-span-5",
    },
  ],
  fiduciaryNotes: VOLUNTARY_FIDUCIARY,
  cta: { label: "Request Official Onyx Term Sheet", href: "/contact" },
  faqs: [
    {
      question: "How does 14.2% Onyx differ from 12.8% Strategic Income?",
      answer:
        "Onyx targets higher day-one monthly income (14.2% p.a.) but does not include the 10% loyalty bonus at month 60 that Strategic Income offers at 12.8% p.a.",
    },
  ],
};

export const EVEREST_145_PRODUCT: EverestProductPageProps = {
  path: "/everest-strategic-growth-145",
  kicker: "Everest Wealth · 14.5% Strategic Growth",
  heroTitle: "Pure Compounding: 14.5% Strategic Growth.",
  heroSubtitle:
    "Capital compounding with no monthly withdrawals, returns accumulate over five years and are paid at maturity for investors who do not need interim income.",
  heroImage: "/images/home4-import/card3.jpg",
  heroImageAlt: "Strategic growth compounding, Everest 14.5% voluntary capital",
  calculatorSrc: "/embed-calculators/asset-012-strategic-growth.html",
  calculatorTitle: "14.5% Strategic Growth Calculator",
  calculatorLead:
    "Project value at maturity based on the targeted 14.5% p.a. compound profile over the five-year term, after illustrative 20% DWT at maturity.",
  featureCards: [
    {
      title: "Projected value at maturity",
      description:
        "Returns compound with no monthly withdrawals and are illustrated at the end of the five-year term, ideal when you do not need income during the lock-in period.",
      accent: "teal",
      span: "col-span-12 lg:col-span-7",
    },
    {
      title: "Pure compounding profile",
      description:
        "14.5% p.a. targeted compound return profile on voluntary capital, higher than income products because nothing is drawn monthly.",
      accent: "blue",
      span: "col-span-12 lg:col-span-5",
    },
  ],
  fiduciaryNotes: [
    ...VOLUNTARY_FIDUCIARY,
    "20% DWT on growth paid at maturity",
    "No monthly income distributions during the term",
  ],
  cta: { label: "Discuss Strategic Growth suitability", href: "/contact" },
  faqs: [
    {
      question: "When is 14.5% Strategic Growth appropriate?",
      answer:
        "When you do not need monthly income and can lock voluntary capital for five years to pursue a targeted compound return profile paid at maturity.",
    },
  ],
};

export const EVEREST_AMETHYST_PRODUCT: EverestProductPageProps = {
  path: "/everest-amethyst-living-annuity",
  kicker: "Everest Wealth · Amethyst Living Annuity",
  heroTitle: "Insulated Retirement: The Amethyst Living Annuity.",
  heroSubtitle:
    "Compulsory retirement capital in a regulated living annuity wrapper, targeted ~10.2% net yield, flexible drawdown, and Section 14 transfer approved.",
  heroImage: "/images/home4-goal-retire-16x9.jpg",
  heroImageAlt: "Retired couple reviewing Amethyst living annuity income planning",
  calculatorSrc: "/embed-calculators/asset-014-living-annuity.html",
  calculatorTitle: "Amethyst Living Annuity Calculator",
  calculatorLead:
    "Model drawdown between 2.5% and 17.5%, estimated net yield (~10.2% p.a. targeted), and tax on income using SARS 2026/27 illustrative brackets.",
  pillTags: ["Section 14 Transfer Approved", "Drawdown 2.5% – 17.5%"],
  featureCards: [
    {
      title: "~10.2% targeted net yield",
      description:
        "Structured return profile inside a 27four Life policy wrapper, not market-linked unit trust volatility. Growth inside the annuity is tax-sheltered; drawdown income is taxed at your marginal rate.",
      accent: "teal",
      span: "col-span-12 lg:col-span-7",
    },
    {
      title: "Regulation 28 compliant drawdown",
      description:
        "Sustainable drawdown band of 2.5% to 17.5% p.a., advisers must flag when drawdown exceeds sustainable thresholds for your age and capital.",
      accent: "blue",
      span: "col-span-12 lg:col-span-5",
    },
    {
      title: "Section 14 transfers",
      description:
        "Pension, provident, preservation, and RA capital may transfer via Section 14 to Amethyst where suitability is confirmed, independent advice required.",
      accent: "teal",
      span: "col-span-12",
    },
  ],
  fiduciaryNotes: [
    "Compulsory retirement capital only (pension, provident, preservation, RA)",
    "Drawdown must remain between 2.5% and 17.5% p.a.",
    "Targeted ~10.2% net yield is not guaranteed",
    "9% capital bonus may apply after five years per product terms",
    "Income drawdown taxed at marginal rates; growth inside annuity is tax-sheltered",
    "Section 14 transfer rules and insurer acceptance apply",
  ],
  cta: { label: "Request a formal quotation", href: "/contact" },
  faqs: [
    {
      question: "What is Section 14 transfer?",
      answer:
        "A regulated transfer of retirement fund benefits from one approved fund or annuity to another. Amethyst accepts qualifying Section 14 transfers subject to insurer and adviser suitability checks.",
    },
    {
      question: "What drawdown rate should I use?",
      answer:
        "Regulation allows 2.5% to 17.5% p.a. Higher drawdowns deplete capital faster. Use the calculator to stress-test sustainability, not as personalised advice.",
    },
  ],
};
