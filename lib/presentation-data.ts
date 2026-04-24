/**
 * Wealth Architecture Timeline / Sales Pitch Canvas
 * Content for advisor-led consultations and screen-sharing.
 * Maps timeline nodes to talking points for "The Three Phases" (Create, Protect, Pass On).
 */

export type PhaseId = "create" | "protect" | "pass-on";

export interface TimelineNodeContent {
  headline: string;
  body: string;
  bullets?: string[];
  highlightPhrases?: string[]; // phrases to render in cinematic-teal
}

export interface TimelineNode {
  id: string;
  label: string;
  phase: PhaseId;
  position: "left" | "center" | "right";
  content: TimelineNodeContent;
  children?: { id: string; label: string; content: TimelineNodeContent }[];
}

export interface PhaseMeta {
  id: PhaseId;
  title: string;
  subtitle: string;
}

export const PHASES: PhaseMeta[] = [
  {
    id: "create",
    title: "Phase 1: Create Wealth",
    subtitle: "Financial Freedom Planning",
  },
  {
    id: "protect",
    title: "Phase 2: Protect Wealth",
    subtitle: "Risk Planning",
  },
  {
    id: "pass-on",
    title: "Phase 3: Pass Wealth to the Next Generation",
    subtitle: "Estate Planning",
  },
];

/**
 * Timeline order (left to right): Left block → Center block → Right block.
 * Each node maps to a Bento popup with the content below.
 */
export const TIMELINE_NODES: TimelineNode[] = [
  // ----- LEFT (Create / Pass On mix for flow) -----
  {
    id: "calculations",
    label: "Calculations",
    phase: "create",
    position: "left",
    content: {
      headline: "Calculations",
      body: "Our calculators answer the critical questions: How much capital do you need? What is the impact of inflation on your purchasing power? How long will your capital last at your current drawdown? These are the foundation of any wealth plan.",
      bullets: [
        "Capital required for retirement",
        "Inflation impact over time",
        "Capital lifespan (run-out)",
        "Tax and estate duty estimates",
      ],
      highlightPhrases: ["How much capital do you need?", "How long will your capital last?"],
    },
  },
  {
    id: "vitality",
    label: "Vitality",
    phase: "pass-on",
    position: "left",
    content: {
      headline: "Vitality Optimisation",
      body: "An additional value service we offer: optimising your wellness and vitality benefits within your overall financial structure. This supports long-term health and can reduce future claims on capital.",
      highlightPhrases: ["Vitality Optimisation", "wellness and vitality benefits"],
    },
  },
  {
    id: "will",
    label: "Last Will & Testament",
    phase: "pass-on",
    position: "left",
    content: {
      headline: "Last Will & Testament",
      body: "Proper structuring ensures your wealth is transferred according to your wishes. A valid will ensures your wishes are carried out and that taxes and executor costs are settled in an orderly way.",
      bullets: [
        "Wishes carried out",
        "Taxes and executor fees settled",
        "Guardians and beneficiaries clearly named",
      ],
      highlightPhrases: ["wishes are carried out", "taxes and executor costs are settled"],
    },
  },
  {
    id: "everest-wealth",
    label: "Everest Wealth",
    phase: "create",
    position: "left",
    content: {
      headline: "Everest Wealth",
      body: "Code 1.8 wealth engineering: fixed-return, unlisted preference share structures. Targeted yields (e.g. 12.8% Strategic Income, 14.5% Strategic Growth, Amethyst Living Annuity) for clients seeking income and growth outside traditional markets.",
      bullets: [
        "12.8% Strategic Income (cash flow)",
        "14.5% Strategic Growth (compounding)",
        "Amethyst Living Annuity (retirement liquidity)",
      ],
      highlightPhrases: ["Code 1.8", "fixed-return", "unlisted preference share structures"],
    },
  },
  {
    id: "trust",
    label: "Trust & Business Structure",
    phase: "pass-on",
    position: "left",
    content: {
      headline: "Trust & Business Structure",
      body: "Trusts and business entities protect assets and ensure intergenerational continuity. They allow you to pass wealth to the next generation in a tax-efficient and controlled manner.",
      bullets: [
        "Asset protection",
        "Intergenerational continuity",
        "Tax-efficient transfer",
      ],
      highlightPhrases: ["intergenerational continuity", "tax-efficient"],
    },
  },
  // ----- CENTER (Protect) -----
  {
    id: "life-assurance",
    label: "Life Assurance",
    phase: "protect",
    position: "center",
    content: {
      headline: "Life Assurance",
      body: "Income protection for your dependants and debt. Covers death (dependants and debt), permanent and temporary disability (when you are consuming but not producing income), and severe illness (capital for treatments).",
      bullets: [
        "Death: dependants and debt cover",
        "Permanent / temporary disability: income replacement",
        "Severe illness: capital for treatments",
      ],
      highlightPhrases: ["consuming but not producing income", "capital for treatments"],
    },
    children: [
      {
        id: "life-death",
        label: "Death",
        content: {
          headline: "Death Cover",
          body: "Ensures your dependants and debt are provided for. The policy pays out to beneficiaries or to settle liabilities so your family is not left with a financial burden.",
          highlightPhrases: ["dependants and debt", "financial burden"],
        },
      },
      {
        id: "life-permanent-disability",
        label: "Permanent Disability",
        content: {
          headline: "Permanent Disability Cover",
          body: "When you are consuming but not producing income, disability cover replaces lost earnings. Permanent disability cover ensures your lifestyle and obligations can be maintained when you cannot return to work.",
          highlightPhrases: ["consuming but not producing income", "replaces lost earnings"],
        },
      },
      {
        id: "life-temporary-disability",
        label: "Temporary Disability",
        content: {
          headline: "Temporary Disability Cover",
          body: "When you are temporarily unable to work, this cover replaces lost earnings so your lifestyle and obligations can be maintained until you return to work.",
          highlightPhrases: ["replaces lost earnings", "return to work"],
        },
      },
      {
        id: "life-illness",
        label: "Severe Illness",
        content: {
          headline: "Severe Illness",
          body: "Provides capital for treatments and lifestyle adjustments. A lump sum can cover medical costs, care, or income shortfall during recovery.",
          highlightPhrases: ["capital for treatments", "lump sum"],
        },
      },
    ],
  },
  {
    id: "short-term",
    label: "Short-term Insurance",
    phase: "protect",
    position: "center",
    content: {
      headline: "Short-term Insurance",
      body: "Asset protection: ensure you do not have to use your investments to replace stolen or damaged goods. Covers both personal (home, car, valuables) and business (commercial property, liability, fleet) risk.",
      bullets: [
        "Personal: home, car, valuables",
        "Business: commercial property, liability, fleet",
      ],
      highlightPhrases: ["do not have to use your investments", "Asset protection"],
    },
    children: [
      {
        id: "short-term-business",
        label: "Business",
        content: {
          headline: "Business Short-term",
          body: "Commercial property, liability, business interruption, and fleet cover. Protects your business assets so operations can continue after a loss.",
          highlightPhrases: ["business interruption", "operations can continue"],
        },
      },
      {
        id: "short-term-personal",
        label: "Personal",
        content: {
          headline: "Personal Short-term",
          body: "Home, car, and valuables. Prevents you from dipping into investments to replace stolen or damaged assets.",
          highlightPhrases: ["dipping into investments", "stolen or damaged assets"],
        },
      },
    ],
  },
  {
    id: "medical-aid",
    label: "Medical Aid",
    phase: "protect",
    position: "center",
    content: {
      headline: "Medical Aid",
      body: "Medical protection is the first line of defense. It ensures you and your family can access private healthcare without eroding your wealth. We help structure medical aid and gap cover for optimal coverage.",
      bullets: [
        "First line of defense",
        "Private healthcare access",
        "Structured for optimal coverage",
      ],
      highlightPhrases: ["first line of defense", "without eroding your wealth"],
    },
  },
  {
    id: "gap-cover",
    label: "Gap Cover",
    phase: "protect",
    position: "center",
    content: {
      headline: "Gap Cover",
      body: "Bridges the shortfall between what medical aid pays and what specialists charge. Without gap cover, a major procedure can create a large out-of-pocket expense that could impact your capital.",
      highlightPhrases: ["shortfall", "out-of-pocket expense", "impact your capital"],
    },
  },
  // ----- RIGHT (Create) -----
  {
    id: "investments",
    label: "Investments",
    phase: "create",
    position: "right",
    content: {
      headline: "Investments (Before & After Retirement)",
      body: "Core focus: building and sustaining wealth through investments that generate sustainable income. We look at both accumulation (before retirement) and decumulation (after retirement) so your capital works for you at every stage.",
      bullets: [
        "Before retirement: accumulation",
        "After retirement: sustainable income",
        "Everest Wealth and traditional structures",
      ],
      highlightPhrases: ["sustainable income", "capital works for you"],
    },
  },
  {
    id: "retirement",
    label: "Retirement Planning",
    phase: "create",
    position: "right",
    content: {
      headline: "Retirement Planning",
      body: "Retirement is not the goal; financial freedom is. We use calculators to show how much you need, the impact of inflation, and how long your capital will last. From there we structure retirement vehicles (RA, pension, living annuity) and, where suitable, Everest Amethyst for insulated retirement liquidity.",
      bullets: [
        "Financial freedom, not just retirement",
        "Capital lifespan and inflation",
        "RA, pension, living annuity, Amethyst",
      ],
      highlightPhrases: ["Retirement is not the goal", "financial freedom"],
    },
  },
  {
    id: "financial-freedom",
    label: "Financial Freedom",
    phase: "create",
    position: "right",
    content: {
      headline: "Financial Freedom",
      body: "The real goal: income exceeding expenses, so you are not dependent on a paycheck. Our unique tools include calculators that answer: How much is needed? What is the impact of inflation? How long will your capital last? From there we build a plan across Create, Protect, and Pass On.",
      bullets: [
        "Income exceeding expenses",
        "Not dependent on a paycheck",
        "Create, Protect, Pass On",
      ],
      highlightPhrases: ["income exceeding expenses", "not dependent on a paycheck"],
    },
  },
];

export function getNodeById(id: string): TimelineNode | undefined {
  for (const node of TIMELINE_NODES) {
    if (node.id === id) return node;
    const child = node.children?.find((c) => c.id === id);
    if (child) return { ...node, id: child.id, label: child.label, content: child.content, children: undefined };
  }
  return undefined;
}

export function getNodesByPosition(position: "left" | "center" | "right"): TimelineNode[] {
  return TIMELINE_NODES.filter((n) => n.position === position);
}
