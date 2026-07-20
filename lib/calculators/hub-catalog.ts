/**
 * Public /calculators hub catalog: Retirement Gap Toolkit™ (ASSET 000).
 * Categories, start-here prompts, difficulty, and completion time for ASSET 001–017.
 */

import {
  CALCULATOR_REGISTRY,
  formatPublicCalculatorTitle,
  type CalculatorRegistryEntry,
} from "@/lib/calculators/registry";
import { calculatorPagePath } from "@/lib/calculators/page-path";

export type HubDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type HubCalculator = {
  id: string;
  assetCode: string;
  title: string;
  href: string;
  /** One-line problem the tool answers (client-facing). */
  problem: string;
  estimatedTime: string;
  difficulty: HubDifficulty;
};

export type HubDomain = {
  id: string;
  label: string;
  /** Short section lead for the domain. */
  lead: string;
  ids: readonly string[];
  everestDisclosure?: boolean;
};

export type HubStartHereItem = {
  question: string;
  /** Calculator registry id, or omit when linking to a category. */
  calculatorId?: string;
  /** Category anchor when the answer is a group of tools. */
  categoryHref?: string;
  categoryLabel?: string;
};

/** Client-facing titles for the Toolkit hub (brief Asset 000 naming). */
export const HUB_DISPLAY_TITLES: Record<string, string> = {
  "asset-001-retirement-growth": "Retirement Growth Rate Calculator",
  "asset-002-retirement-reality-check": "Retirement Reality Check",
  "asset-003-retirement-premium": "Retirement Premium Calculator",
  "asset-004-life-of-capital": "Life of Capital Calculator",
  "asset-005-future-value": "Future Value Calculator",
  "asset-006-income-tax": "Income Tax Calculator",
  "asset-007-estate-duty": "Estate Cost & Liquidity Calculator",
  "asset-008-estate-reduction": "Estate Reduction & Legacy Calculator",
  "asset-009-everest-142-income": "14.2% Retirement Income Calculator",
  "asset-010-everest-128-income": "12.8% Retirement Income Calculator",
  "asset-011-everest-128-vs-142": "Income Strategy Comparison Calculator",
  "asset-012-strategic-growth": "Strategic Growth Calculator",
  "asset-013-everest-income-vs-growth": "Income vs Growth Comparison",
  "asset-014-living-annuity": "Living Annuity Calculator",
  "asset-015-average-clause": "Average Clause Calculator",
  "asset-016-growth-comparison": "Growth Comparison Calculator",
  "asset-017-personal-goal": "Personal Goal Calculator",
};

/** Problem-led blurbs keyed by registry id. */
export const HUB_CALCULATOR_PROBLEMS: Record<string, string> = {
  "asset-001-retirement-growth":
    "What growth rate do you need to hit your retirement capital target?",
  "asset-002-retirement-reality-check":
    "Will your capital last, and how big is the shortfall today?",
  "asset-003-retirement-premium":
    "What monthly contribution closes the retirement gap?",
  "asset-004-life-of-capital":
    "How long will a capital pot last at your chosen drawdown?",
  "asset-005-future-value":
    "What is inflation doing to future purchasing power?",
  "asset-006-income-tax": "Estimate SARS income tax on your figures (illustrative).",
  "asset-007-estate-duty":
    "Will your family have enough cash to wind up your estate without selling assets?",
  "asset-008-estate-reduction":
    "How could lifetime planning improve the legacy your family receives?",
  "asset-009-everest-142-income":
    "How much after-tax monthly retirement income could a 14.2% distribution produce?",
  "asset-010-everest-128-income":
    "Would you accept slightly lower income today for potentially greater long-term value?",
  "asset-011-everest-128-vs-142":
    "Which income strategy best fits your voluntary capital objectives?",
  "asset-012-strategic-growth":
    "Can you leave capital untouched for five years to maximise growth?",
  "asset-013-everest-income-vs-growth":
    "Income profiles versus compounding growth, educational only.",
  "asset-014-living-annuity":
    "Model living annuity income within the 2.5% to 17.5% drawdown band.",
  "asset-015-average-clause":
    "How underinsurance can reduce a claim when the average clause applies.",
  "asset-016-growth-comparison":
    "See how different growth rates change long-term capital outcomes.",
  "asset-017-personal-goal":
    "Map a personal capital goal to time, contributions, and growth.",
};

export const HUB_CALCULATOR_META: Record<
  string,
  { estimatedTime: string; difficulty: HubDifficulty }
> = {
  "asset-001-retirement-growth": { estimatedTime: "5–8 min", difficulty: "Intermediate" },
  "asset-002-retirement-reality-check": { estimatedTime: "3–5 min", difficulty: "Beginner" },
  "asset-003-retirement-premium": { estimatedTime: "3–5 min", difficulty: "Beginner" },
  "asset-004-life-of-capital": { estimatedTime: "5–8 min", difficulty: "Intermediate" },
  "asset-005-future-value": { estimatedTime: "3–5 min", difficulty: "Beginner" },
  "asset-006-income-tax": { estimatedTime: "3–5 min", difficulty: "Beginner" },
  "asset-007-estate-duty": { estimatedTime: "5–8 min", difficulty: "Intermediate" },
  "asset-008-estate-reduction": { estimatedTime: "8–12 min", difficulty: "Advanced" },
  "asset-009-everest-142-income": { estimatedTime: "5–8 min", difficulty: "Intermediate" },
  "asset-010-everest-128-income": { estimatedTime: "5–8 min", difficulty: "Intermediate" },
  "asset-011-everest-128-vs-142": { estimatedTime: "8–12 min", difficulty: "Advanced" },
  "asset-012-strategic-growth": { estimatedTime: "8–12 min", difficulty: "Advanced" },
  "asset-013-everest-income-vs-growth": { estimatedTime: "8–12 min", difficulty: "Advanced" },
  "asset-014-living-annuity": { estimatedTime: "5–8 min", difficulty: "Intermediate" },
  "asset-015-average-clause": { estimatedTime: "3–5 min", difficulty: "Beginner" },
  "asset-016-growth-comparison": { estimatedTime: "5–8 min", difficulty: "Intermediate" },
  "asset-017-personal-goal": { estimatedTime: "5–8 min", difficulty: "Intermediate" },
};

/**
 * Asset 000 category order (Albert brief).
 * Remaining ASSET tools sit in Investment Decisions / Insurance so all 001–017 remain visible.
 */
export const HUB_DOMAINS: readonly HubDomain[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    lead: "Begin with the questions most people ask first: affordability, saving, and the growth rate you may need.",
    ids: [
      "asset-002-retirement-reality-check",
      "asset-003-retirement-premium",
      "asset-001-retirement-growth",
    ],
  },
  {
    id: "retirement-income",
    label: "Retirement Income",
    lead: "Explore how long capital may last, living annuity drawdowns, and the effect of inflation on future purchasing power.",
    ids: [
      "asset-014-living-annuity",
      "asset-004-life-of-capital",
      "asset-005-future-value",
    ],
  },
  {
    id: "investment-decisions",
    label: "Investment Decisions",
    lead: "Compare structured income and growth profiles, and see how different rates change long-term outcomes.",
    ids: [
      "asset-010-everest-128-income",
      "asset-009-everest-142-income",
      "asset-012-strategic-growth",
      "asset-013-everest-income-vs-growth",
      "asset-011-everest-128-vs-142",
      "asset-016-growth-comparison",
      "asset-017-personal-goal",
    ],
    everestDisclosure: true,
  },
  {
    id: "estate-planning",
    label: "Estate Planning",
    lead: "Illustrate estate duty, executor fees, and donation-based reduction strategies within SARS annual limits.",
    ids: ["asset-007-estate-duty", "asset-008-estate-reduction"],
  },
  {
    id: "tax-planning",
    label: "Tax Planning",
    lead: "Estimate illustrative SARS income tax using current brackets.",
    ids: ["asset-006-income-tax"],
  },
  {
    id: "insurance",
    label: "Insurance",
    lead: "See how underinsurance can reduce a property claim when the average clause applies.",
    ids: ["asset-015-average-clause"],
  },
] as const;

/** “I want to know…” starter prompts for new visitors. */
export const HUB_START_HERE: readonly HubStartHereItem[] = [
  {
    question: "Can I afford to retire?",
    calculatorId: "asset-002-retirement-reality-check",
  },
  {
    question: "How much should I save?",
    calculatorId: "asset-003-retirement-premium",
  },
  {
    question: "How fast must my investments grow?",
    calculatorId: "asset-001-retirement-growth",
  },
  {
    question: "How long will my retirement income last?",
    calculatorId: "asset-004-life-of-capital",
  },
  {
    question: "How much income can my investments provide?",
    categoryHref: "#retirement-income",
    categoryLabel: "Retirement Income Calculators",
  },
] as const;

/** @deprecated Prefer HUB_START_HERE — kept for any legacy imports. */
export const HUB_FEATURED_IDS = [
  "asset-002-retirement-reality-check",
  "asset-003-retirement-premium",
  "asset-001-retirement-growth",
] as const;

function stripBrand(title: string): string {
  return title.replace(/^AS Brokers\s+/i, "");
}

function toHubCalculator(entry: CalculatorRegistryEntry): HubCalculator {
  const meta = HUB_CALCULATOR_META[entry.id] ?? {
    estimatedTime: "5–8 min",
    difficulty: "Intermediate" as HubDifficulty,
  };
  return {
    id: entry.id,
    assetCode: entry.assetCode,
    title:
      HUB_DISPLAY_TITLES[entry.id] ??
      stripBrand(formatPublicCalculatorTitle(entry)),
    href: calculatorPagePath(entry.id),
    problem:
      HUB_CALCULATOR_PROBLEMS[entry.id] ??
      "Illustrative educational calculator. Not personalised advice.",
    estimatedTime: meta.estimatedTime,
    difficulty: meta.difficulty,
  };
}

export const HUB_CALCULATORS: HubCalculator[] = CALCULATOR_REGISTRY.map(toHubCalculator);

export function getHubCalculatorById(id: string): HubCalculator | undefined {
  return HUB_CALCULATORS.find((c) => c.id === id);
}

export function getHubFeaturedCalculators(): HubCalculator[] {
  return HUB_FEATURED_IDS.map((id) => getHubCalculatorById(id)).filter(
    (c): c is HubCalculator => Boolean(c)
  );
}

export function getHubDomainCalculators(domain: HubDomain): HubCalculator[] {
  return domain.ids
    .map((id) => getHubCalculatorById(id))
    .filter((c): c is HubCalculator => Boolean(c));
}
