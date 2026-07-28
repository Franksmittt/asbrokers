import type { RelatedLink } from "@/components/seo/RelatedContent";
import { getCalculatorPageConfig } from "@/lib/calculators/page-configs";
import { calculatorPagePath, resolveCalculatorSlug } from "@/lib/calculators/page-path";

export const SOLUTION_RELATED: Record<string, RelatedLink[]> = {
  "/solutions/personal-insurance": [
    {
      href: "/solutions/life-insurance",
      title: "Life & disability cover",
      description: "Death, disability, and income protection for families and professionals.",
    },
    {
      href: "/calculators",
      title: "Planning calculators",
      description: "Illustrative tools for retirement, estate, and insurance.",
    },
    {
      href: "/contact",
      title: "Book a review",
      description: "Independent short-term insurance advice in Krugersdorp.",
    },
  ],
  "/solutions/business-insurance": [
    {
      href: "/business-risk-review",
      title: "Free Business Risk Review",
      description: "A workbook to capture assets, turnover, and cover gaps before we meet.",
    },
    {
      href: "/providers",
      title: "Our provider panel",
      description: "The insurers and underwriters we survey and place cover with.",
    },
    {
      href: "/solutions/medical-aid",
      title: "Medical aid for owner & staff",
      description: "Scheme structuring and gap cover for owner households and employee groups.",
    },
    {
      href: "/contact?source=business_insurance",
      title: "Request a needs analysis",
      description: "Personal advice only after a documented needs analysis with FSP 17273.",
    },
  ],
  "/farm-insurance": [
    {
      href: "/business-risk-review",
      title: "Free Business Risk Review",
      description: "A workbook to capture assets, equipment, and cover gaps before we meet.",
    },
    {
      href: "/solutions/business-insurance",
      title: "Business insurance",
      description: "Commercial property, liability, interruption, and continuity cover.",
    },
    {
      href: "/providers",
      title: "Our provider panel",
      description: "The insurers and underwriters we survey and place cover with.",
    },
    {
      href: "/contact?source=farm_insurance",
      title: "Request a needs analysis",
      description: "Personal advice only after a documented needs analysis with FSP 17273.",
    },
  ],
  "/providers": [
    {
      href: "/solutions/business-insurance",
      title: "Business insurance",
      description: "Commercial property, liability, interruption, and continuity cover.",
    },
    {
      href: "/business-risk-review",
      title: "Free Business Risk Review",
      description: "Find the gaps in your commercial cover before a claim does.",
    },
    {
      href: "/insurance",
      title: "Insurance & risk hub",
      description: "Personal and commercial cover domains: medical, life, business, and assets.",
    },
    {
      href: "/contact?source=providers",
      title: "Request a needs analysis",
      description: "Personal recommendations after advice with FSP 17273.",
    },
  ],
  "/solutions/life-insurance": [
    {
      href: "/solutions/personal-insurance",
      title: "Short-term personal cover",
      description: "Home, motor, and personal asset protection.",
    },
    {
      // CONTAINMENT 2026-07-22: underinsurance calculator frozen. Restore: /calculators/underinsurance-calculator
      href: "/calculators",
      title: "Financial calculators",
      description: "Educational planning tools currently available for review.",
    },
    {
      href: "/calculators#asset-004-life-of-capital",
      title: "Life of capital",
      description: "How long retirement capital may last with drawdowns.",
    },
  ],
  "/business-continuity": [
    {
      href: "/solutions/business-insurance",
      title: "Business insurance",
      description: "Commercial property, liability, business interruption, and fleet cover.",
    },
    {
      href: "/business-risk-review",
      title: "Free Business Risk Review",
      description: "A workbook to capture assets, turnover, and cover gaps before we meet.",
    },
    {
      href: "/estate-planning",
      title: "Estate and succession planning",
      description: "Wills, trusts, and business continuity structuring.",
    },
    {
      href: "/contact?source=business_continuity",
      title: "Request a needs analysis",
      description: "Personal advice only after a documented needs analysis with FSP 17273.",
    },
  ],
  "/solutions/business-life": [
    {
      href: "/solutions/business-insurance",
      title: "Business short-term insurance",
      description: "Property, liability, BI, and fleet cover.",
    },
    {
      href: "/estate-planning",
      title: "Estate & succession planning",
      description: "Wills, trusts, and business continuity.",
    },
    {
      href: "/contact",
      title: "Key person review",
      description: "Align buy-and-sell funding with shareholder agreements.",
    },
  ],
  "/solutions/medical-aid": [
    {
      href: "/solutions/discovery-health",
      title: "Discovery Health matrix",
      description: "2026 DHMS plans, MSA/ATB/PHF, and Gap stacking.",
    },
    {
      href: "/healthy-retirement-blueprint",
      title: "Healthy retirement blueprint",
      description: "Health pillar assessment for retirement planning.",
    },
    {
      href: "/insurance",
      title: "Risk architecture hub",
      description: "Personal and commercial cover structured together.",
    },
  ],
  "/solutions/discovery-health": [
    {
      href: "/solutions/medical-aid",
      title: "Medical aid & gap structuring",
      description: "Demarcation, shortfalls, and claims advocacy across schemes.",
    },
    {
      href: "/insurance",
      title: "Risk architecture hub",
      description: "Personal and commercial cover structured together.",
    },
    {
      href: "/calculators",
      title: "Educational planning tools",
      description: "Illustrative insurance and wealth-structuring tools available for review.",
    },
    {
      href: "/contact?source=discovery_terminal",
      title: "Book a health consultation",
      description: "Speak with FSP 17273 in Krugersdorp or via WhatsApp.",
    },
  ],
  "/estate-planning": [
    {
      href: "/calculators",
      title: "Estate duty & executor fee tools",
      description: "Illustrative duty and executor fee estimation tools available for review.",
    },
    {
      href: "/calculators",
      title: "Estate reduction education",
      description: "Educational tools on donation strategies and multi-year estate planning maths.",
    },
    {
      href: "/legacy-readiness-checklist",
      title: "Legacy readiness checklist",
      description: "Identify gaps in wills, trusts, and liquidity.",
    },
  ],
};

/** Primary hub pages, internal link topology (Phase 5.2). */
export const HUB_RELATED: Record<string, RelatedLink[]> = {
  "/": [
    {
      href: "/solutions/business-insurance",
      title: "Business insurance",
      description:
        "Commercial property, liability, business interruption, fleet, and risk architecture for Gauteng businesses.",
    },
    {
      href: "/business-risk-review",
      title: "Free Business Risk Review",
      description:
        "Independent gap analysis for your commercial cover. Survey the market, no obligation.",
    },
    {
      href: "/insurance",
      title: "Insurance hub",
      description:
        "Personal, medical, and business cover structured by an independent Category 1.8 broker.",
    },
    {
      href: "/contact",
      title: "Request a needs analysis",
      description: "Personal recommendations only after advice with an authorised FSP 17273 representative.",
    },
  ],
  "/retirement": [
    {
      href: "/retirement-planning",
      title: "Planning for retirement",
      description: "Educational framing on capital, timeline, and retirement planning questions.",
    },
    {
      href: "/calculators#asset-002-retirement-reality-check",
      title: "Retirement Reality Check",
      description: "Illustrative capital versus income gap education.",
    },
    // CONTAINMENT 2026-07-24: Asset 014 + Everest related links frozen.
    {
      href: "/calculators",
      title: "Educational calculators",
      description: "Illustrative tools available while product calculators complete review.",
    },
    {
      href: "/insights",
      title: "Retirement insights",
      description: "Plain-language guides on income, tax, and longevity.",
    },
  ],
  "/retirement-planning": [
    {
      href: "/retirement-gap-method",
      title: "Retirement Gap Method™",
      description: "Educational framing for how the calculator toolkit fits together.",
    },
    {
      href: calculatorPagePath("asset-002-retirement-reality-check"),
      title: "Retirement Reality Check",
      description: "Compare desired income against projected capital (illustrative).",
    },
    {
      href: "/about",
      title: "About AS Brokers",
      description: "Independent FSP 17273 · Est. 1998 · Krugersdorp.",
    },
    {
      href: "/contact",
      title: "Request a needs analysis",
      description: "Personal recommendations only after advice with FSP 17273.",
    },
  ],
  "/investments": [
    // CONTAINMENT 2026-07-22 / compliance 2026-07-24: Everest + product-calc related links frozen.
    // Restore after approval: /everest-wealth/about · /calculators#asset-013-everest-income-vs-growth
    {
      href: "/retirement-planning",
      title: "Planning for retirement",
      description: "Pre-retirement accumulation and gap analysis tools.",
    },
    {
      href: "/calculators",
      title: "Educational calculators",
      description: "Illustrative tools available while product calculators complete review.",
    },
    {
      href: "/regulatory-compliance",
      title: "Regulatory and compliance",
      description: "FSP 17273 disclosures, FAIS framing, and statutory information.",
    },
    {
      href: "/contact",
      title: "Request a needs analysis",
      description: "Personal recommendations only after advice with FSP 17273.",
    },
  ],
  "/everest-wealth": [
    {
      href: "/everest-wealth/about",
      title: "Understanding Everest",
      description: "How unlisted preference shares, tax routing, and liquidity work.",
    },
    {
      href: "/calculators#asset-013-everest-income-vs-growth",
      title: "Income vs Growth comparison",
      description: "Compare Everest income and growth scenarios side by side.",
    },
    {
      href: "/retirement",
      title: "Retirement hub",
      description: "Planning and living-annuity guidance for South Africans.",
    },
    {
      href: "/contact",
      title: "Investment strategy call",
      description: "Speak with an independent Category 1.8 adviser.",
    },
  ],
  "/everest-wealth/about": [
    {
      href: "/everest-128-product",
      title: "12.8% Strategic Income",
      description: "Monthly dividends with 10% loyalty bonus at month 60.",
    },
    {
      href: "/immediate-higher-income-calculator",
      title: "14.2% Onyx Income+",
      description: "Maximum day-one yield with no loyalty bonus.",
    },
    {
      href: "/everest-strategic-growth-145",
      title: "14.5% Strategic Growth",
      description: "Pure compounding paid at maturity.",
    },
    {
      href: "/everest-amethyst-living-annuity",
      title: "Amethyst Living Annuity",
      description: "Section 14 transfer, ~10.2% net yield, drawdown 2.5%–17.5%.",
    },
  ],
  "/everest-128-product": [
    {
      href: "/immediate-higher-income-calculator",
      title: "14.2% Onyx Income+",
      description: "Compare maximum day-one income versus loyalty bonus structures.",
    },
    {
      href: "/everest-wealth/about",
      title: "Everest regulatory briefing",
      description: "Structure, fees, tax, and liquidity in plain language.",
    },
    {
      href: "/calculators#asset-013-everest-income-vs-growth",
      title: "Income vs Growth",
      description: "Side-by-side Everest yield comparison.",
    },
    {
      href: "/contact",
      title: "Speak to an adviser",
      description: "Independent Category 1.8 advice, FSP 17273.",
    },
  ],
  "/immediate-higher-income-calculator": [
    {
      href: "/everest-128-product",
      title: "12.8% Strategic Income",
      description: "Lower day-one income with 10% loyalty bonus at month 60.",
    },
    {
      href: "/everest-wealth/about",
      title: "Everest regulatory briefing",
      description: "How unlisted preference shares and DWT work.",
    },
    {
      href: "/investments",
      title: "Investments hub",
      description: "Life-stage investment guidance and Everest education.",
    },
    {
      href: "/contact",
      title: "Request Onyx term sheet",
      description: "Formal product documentation via a licensed adviser.",
    },
  ],
  "/everest-strategic-growth-145": [
    {
      href: "/everest-128-product",
      title: "12.8% Strategic Income",
      description: "Monthly income alternative with loyalty bonus.",
    },
    {
      href: "/calculators#asset-013-everest-income-vs-growth",
      title: "Income vs Growth",
      description: "Compare income and compounding strategies.",
    },
    {
      href: "/everest-wealth/about",
      title: "Everest regulatory briefing",
      description: "Fees, tax efficiency, and illiquidity rules.",
    },
    {
      href: "/contact",
      title: "Discuss suitability",
      description: "Independent Category 1.8 advice, FSP 17273.",
    },
  ],
  "/everest-amethyst-living-annuity": [
    {
      href: "/retirement-planning",
      title: "Retirement planning",
      description: "Pre-retirement accumulation and gap analysis.",
    },
    {
      href: "/retirement",
      title: "Retirement hub",
      description: "Living annuities, drawdown tools, and post-retirement guidance.",
    },
    {
      href: "/everest-wealth/about",
      title: "Everest regulatory briefing",
      description: "Compulsory vs voluntary capital and Section 14 context.",
    },
    {
      href: "/contact",
      title: "Request a quotation",
      description: "Formal living annuity illustration via a licensed adviser.",
    },
  ],
  "/insurance": [
    {
      href: "/solutions/business-insurance",
      title: "Business insurance",
      description: "Commercial property, liability, interruption, and continuity cover.",
    },
    {
      href: "/business-risk-review",
      title: "Free Business Risk Review",
      description: "Find the gaps in your commercial cover before a claim does.",
    },
    {
      href: "/providers",
      title: "Our provider panel",
      description: "The insurers, schemes, and platforms we work with, by service.",
    },
    {
      href: "/contact?source=insurance_related",
      title: "Request a needs analysis",
      description: "Personal cover recommendations after advice with FSP 17273.",
    },
  ],
  "/insights": [
    {
      href: "/retirement-planning",
      title: "Retirement planning",
      description: "Educational hub on capital gaps and retirement planning questions.",
    },
    {
      href: "/estate-planning",
      title: "Estate planning",
      description: "Liquidity concepts, duty framing, and succession education.",
    },
    {
      href: "/investments",
      title: "Investments",
      description: "Factual investment information and Category 1.8 advice services.",
    },
    {
      href: "/calculators",
      title: "Educational calculators",
      description: "Illustrative tools available while product calculators complete review.",
    },
  ],
  "/about": [
    {
      href: "/team",
      title: "Meet the team",
      description: "Albert, Johnny, and the specialists behind AS Brokers.",
    },
    {
      href: "/how-we-work",
      title: "How we work",
      description: "Independent, education-led Category 1.8 process.",
    },
    {
      href: "/regulatory-compliance",
      title: "Regulatory & compliance",
      description: "FSP 17273, FAIS, POPIA, and our compliance framework.",
    },
    {
      href: "/contact",
      title: "Contact us",
      description: "Book a consultation in Krugersdorp or via WhatsApp.",
    },
  ],
  "/contact": [
    {
      href: "/retirement",
      title: "Retirement planning",
      description: "Prepare questions on capital, drawdown, and living annuities.",
    },
    {
      href: "/investments",
      title: "Investments",
      description: "Wealth building and life-stage investment guidance.",
    },
    {
      href: "/insurance",
      title: "Insurance & risk",
      description: "Medical aid, life cover, and business protection.",
    },
    {
      href: "/estate-planning",
      title: "Estate planning",
      description: "Wills, trusts, duty awareness, and succession.",
    },
  ],
  "/calculators": [
    {
      href: "/retirement-gap-method",
      title: "The Retirement Gap Method™",
      description: "How the educational calculators fit together before advice.",
    },
    {
      href: "/retirement-planning",
      title: "Planning for retirement",
      description: "Educational framing on capital, timeline, and retirement planning questions.",
    },
    {
      href: "/investments",
      title: "Investments hub",
      description: "Factual investment information and Category 1.8 advice services.",
    },
    {
      href: "/contact?source=retirement_gap_review",
      title: "Request a needs analysis",
      description: "Talk through Toolkit results with an authorised representative, FSP 17273.",
    },
  ],
  "/retirement-gap-method": [
    {
      href: "/calculators",
      title: "The Retirement Gap Toolkit™",
      description: "Every educational calculator in one hub.",
    },
    {
      href: "/financial-freedom-community",
      title: "Financial Freedom Community™",
      description: "12-week programme after the workshop, members planning tools.",
    },
    {
      href: "/contact?source=retirement_gap_workshop",
      title: "Reserve a Workshop Seat",
      description: "Complimentary educational session on the Method.",
    },
    {
      href: "/contact?source=retirement_gap_review",
      title: "Book a Retirement Gap Review",
      description: "Personalised advice with FSP 17273.",
    },
  ],
  "/financial-freedom-community": [
    {
      href: "/retirement-gap-method",
      title: "The Retirement Gap Method™",
      description: "The cornerstone framework behind the Community.",
    },
    {
      href: "/calculators/goal-engineering-planner",
      title: "Goal Engineering Planner™",
      description: "Members-only planning tool unlocked after payment.",
    },
    {
      href: "/calculators",
      title: "Retirement Gap Toolkit™",
      description: "Public educational calculators before membership.",
    },
    {
      href: "/contact?source=retirement_gap_review",
      title: "Book a Retirement Gap Review",
      description: "Prefer one-to-one advice instead.",
    },
  ],
};

export function getRelatedLinks(path: string): RelatedLink[] {
  if (path.startsWith("/calculators/")) {
    const slug = path.replace("/calculators/", "");
    const config = getCalculatorPageConfig(resolveCalculatorSlug(slug));
    if (config) {
      return [
        {
          href: "/calculators",
          title: "The Retirement Gap Toolkit™",
          description: "Every Retirement Gap calculator in one educational hub.",
        },
        {
          href: "/retirement-gap-method",
          title: "The Retirement Gap Method™",
          description: "How Toolkit results fit together, and what to do next.",
        },
        {
          href: config.categoryHref,
          title: config.categoryLabel,
          description: "Explore related advice and resources on AS Brokers.",
        },
        {
          href: "/contact?source=retirement_gap_review",
          title: "Book a Retirement Gap Review",
          description: "Independent FSP 17273 advice in Krugersdorp.",
        },
      ];
    }
  }
  return SOLUTION_RELATED[path] ?? HUB_RELATED[path] ?? [];
}
