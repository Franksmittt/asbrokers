/**
 * AS Brokers planning tools, value ladder offers aligned with Albert's master plan.
 * Stage 1: free lead magnet · Stage 2: tripwire digital product · Stage 3: advisory ascension
 *
 * Tripwire launch price: R299 (~$19 USD impulse band per product research).
 * Payment integration is Phase 3, UI shows pricing; checkout links to contact until live.
 */

export type Pillar = "Health" | "Wealth" | "Legacy" | "Business";

export type PaidOfferStatus = "available" | "coming_soon";

export type PlanningToolOffer = {
  id: string;
  pillar: Pillar;
  title: string;
  href: string;
  navDescription: string;
  coreQuestion: string;
  problem: string;
  freeLabel: string;
  freeSummary: string;
  paid?: {
    label: string;
    priceZar: number;
    status: PaidOfferStatus;
    summary: string;
  };
  ascension: {
    label: string;
    href: string;
    summary: string;
  };
  objections: string[];
  proofPoints: string[];
  whoFor: string[];
};

/** Launch tripwire, charm pricing aligned to ~$19 USD band */
export const TRIPWIRE_LAUNCH_ZAR = 299;

export const PLANNING_TOOL_OFFERS: Record<string, PlanningToolOffer> = {
  "healthy-retirement": {
    id: "healthy-retirement",
    pillar: "Health",
    title: "Healthy Retirement Blueprint™",
    href: "/healthy-retirement-blueprint",
    navDescription: "Retirement Health Gap™ assessment",
    coreQuestion: "Will your body survive retirement?",
    problem:
      "Most people plan their money for decades and almost no time planning their health, then discover too late that longevity without wellness is not freedom.",
    freeLabel: "Free assessment",
    freeSummary:
      "2-minute Retirement Health Gap™ score with instant results and a personalised action snapshot.",
    paid: {
      label: "Full Healthy Retirement Blueprint™",
      priceZar: TRIPWIRE_LAUNCH_ZAR,
      status: "coming_soon",
      summary:
        "Complete framework: VO₂ max guide, 104 Week Watch Challenge intro, risks, and 90-day action plan.",
    },
    ascension: {
      label: "Vitality & wellness planning conversation",
      href: "/contact",
      summary: "Discuss medical aid, gap cover, and long-term health planning with AS Brokers.",
    },
    objections: [
      "Free assessment, no payment",
      "Educational only, not medical diagnosis",
      "FSP 17273 · Independent adviser",
      "Instant score in 2 minutes",
    ],
    proofPoints: [
      "10 health & lifestyle questions",
      "Retirement Health Score™ / 100",
      "Retirement Health Gap™ explained",
      "90-day action direction",
    ],
    whoFor: [
      "Pre-retirees & retirees",
      "Anyone planning a long retirement",
      "Low energy or fitness concerns",
      "No recent health check-up",
      "Families with longevity history",
    ],
  },
  "retirement-survival": {
    id: "retirement-survival",
    pillar: "Wealth",
    title: "Retirement Survival Blueprint™",
    href: "/retirement-survival-blueprint",
    navDescription: "Financial Freedom Score™ & Freedom Gap™",
    coreQuestion: "Will your money survive your retirement?",
    problem:
      "Most retirement tools spit out an impossible capital number and leave you anxious, not clear on your gap or your options.",
    freeLabel: "Free diagnostic",
    freeSummary:
      "Guided conversation, not a calculator, that reveals your Financial Freedom Score™, Gap™, and AS Brokers Freedom Rate™.",
    paid: {
      label: "Full Retirement Survival Blueprint™ PDF",
      priceZar: TRIPWIRE_LAUNCH_ZAR,
      status: "coming_soon",
      summary:
        "Printable blueprint with your numbers, option pathways, and a structured review checklist for your adviser meeting.",
    },
    ascension: {
      label: "Retirement clarity conversation",
      href: "/contact",
      summary: "Book a discovery meeting for retirement income, living annuities, and structured capital planning.",
    },
    objections: [
      "Free diagnostic, no payment",
      "Educational only, not financial advice",
      "FSP 17273 · Independent adviser",
      "Understanding, not just a number",
    ],
    proofPoints: [
      "5-step guided journey",
      "Financial Freedom Score™",
      "Financial Freedom Gap™",
      "AS Brokers Freedom Rate™",
    ],
    whoFor: [
      "Pre-retirees within 15 years of retirement",
      "Business owners with concentrated wealth",
      "Anyone unsure if they are on track",
      "Couples with different retirement ages",
      "Those who distrust single-number calculators",
    ],
  },
  "legacy-checklist": {
    id: "legacy-checklist",
    pillar: "Legacy",
    title: "Legacy Readiness Checklist™",
    href: "/legacy-readiness-checklist",
    navDescription: "Estate planning gap review",
    coreQuestion: "What happens to your family and wealth if you die tomorrow?",
    problem:
      "Families assume their affairs are in order, but unsigned wills, outdated beneficiaries, and estate liquidity gaps are often found too late.",
    freeLabel: "Free checklist",
    freeSummary:
      "Eight-area estate review covering wills, trusts, liquidity, beneficiaries, and succession, with an instant printable PDF.",
    paid: {
      label: "Legacy Conversations Guide™",
      priceZar: TRIPWIRE_LAUNCH_ZAR,
      status: "coming_soon",
      summary:
        "Structured family conversation scripts, decision frameworks, and facilitator notes for legacy planning.",
    },
    ascension: {
      label: "Estate Planning Review",
      href: "/contact",
      summary: "Formal review of wills, trusts, estate duty exposure, and succession with AS Brokers.",
    },
    objections: [
      "Free checklist, no payment",
      "Educational only, not legal advice",
      "FSP 17273 · Independent adviser",
      "Instant PDF, no waiting",
    ],
    proofPoints: [
      "8 estate planning areas",
      "Will & trust readiness",
      "Liquidity & duty risks",
      "Executor readiness",
    ],
    whoFor: [
      "Retirees & pre-retirees",
      "Business & property owners",
      "Parents & blended families",
      "Anyone with a trust",
      "Will not reviewed in 3+ years",
    ],
  },
  "business-risk": {
    id: "business-risk",
    pillar: "Business",
    title: "Business Risk Review™",
    href: "/business-risk-review",
    navDescription: "Business insurance gap analysis",
    coreQuestion: "Could your business survive a major disruption?",
    problem:
      "Business owners insure what they remember, but gaps in liability, interruption, key person, and cyber cover often surface only after a claim.",
    freeLabel: "Free workbook review",
    freeSummary:
      "Interactive gap analysis across commercial, liability, crime, and business assurance categories with your Business Risk Score™.",
    paid: {
      label: "Business Survival Blueprint™ PDF",
      priceZar: TRIPWIRE_LAUNCH_ZAR,
      status: "coming_soon",
      summary:
        "Prioritised risk map, cover checklist, and succession planning workbook for your broker review.",
    },
    ascension: {
      label: "Professional business risk review",
      href: "/contact",
      summary: "Structured insurance and assurance review for commercial, key person, and buy-sell needs.",
    },
    objections: [
      "Free review, no payment",
      "Educational only, not insurance advice",
      "FSP 17273 · Independent broker",
      "Instant PDF report",
    ],
    proofPoints: [
      "Multi-category cover audit",
      "Business Risk Score™",
      "Gap identification",
      "Downloadable PDF report",
    ],
    whoFor: [
      "SME & family business owners",
      "Companies with 2+ shareholders",
      "Operations with stock or equipment",
      "Professional practices",
      "No insurance review in 12+ months",
    ],
  },
};

export function formatOfferPrice(zar: number): string {
  return `R${zar.toLocaleString("en-ZA")}`;
}

export function getOfferPriceLabel(offer: PlanningToolOffer): string {
  if (offer.paid?.status === "available") {
    return formatOfferPrice(offer.paid.priceZar);
  }
  return offer.freeLabel;
}

export function getOfferByHref(href: string): PlanningToolOffer | undefined {
  return Object.values(PLANNING_TOOL_OFFERS).find((o) => o.href === href);
}
