import type { FAQItem } from "@/lib/seo";
import { CALCULATOR_REGISTRY, getCalculatorById, type CalculatorRegistryEntry } from "@/lib/calculators/registry";
import { calculatorPagePath, resolveCalculatorSlug } from "@/lib/calculators/page-path";

/** Optional educational layers used by the Retirement Gap Toolkit journey (Asset 000→018). */
export type CalculatorContextBox = {
  heading: string;
  paragraphs: string[];
  highlightQuestion?: string;
};

/**
 * Standard Toolkit decision prompt.
 * Frames the page as a planning decision, not merely a calculator.
 */
export type CalculatorDecisionQuestion = {
  /** Defaults to "Decision Question" */
  label?: string;
  question: string;
  /**
   * after-hero (default): immediately below the hero.
   * before-calculator: immediately above the calculator tool (with optional strategy diagram).
   */
  placement?: "after-hero" | "before-calculator";
};

/** Simple strategy fork diagram (e.g. income now vs wait for growth). */
export type CalculatorStrategyDiagram = {
  heading?: string;
  /** Eyebrow above the fork, e.g. "TODAY" */
  eyebrow?: string;
  branches: {
    question: string;
    outcomes: string[];
  }[];
};

export type CalculatorResultBand = {
  label: string;
  description: string;
  /** Optional tone for 4-level sustainability scales (e.g. Excellent / High Risk). */
  tone?: "excellent" | "reasonable" | "caution" | "high-risk" | "default";
};

export type CalculatorResultGuide = {
  heading: string;
  intro?: string;
  /** e.g. "If your required annual growth rate is:" or "Retirement Gap Status" */
  bandsLead?: string;
  /** Optional outcome cards; omit when the intro alone carries the interpretation. */
  bands?: CalculatorResultBand[];
  /** Metrics the calculator already displays — listed for education only; embed unchanged. */
  metricsListed?: string[];
  /** Metrics to emphasise visually (e.g. effective vs marginal tax rate). */
  highlightMetrics?: { label: string; description: string }[];
  footer?: string;
};

export type CalculatorPracticalItem = string | { label: string; href?: string };

export type CalculatorPracticalWays = {
  heading: string;
  intro: string;
  items: CalculatorPracticalItem[];
  closing: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type CalculatorMethodSection = {
  heading: string;
  paragraphs: string[];
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export type CalculatorMethodProgressStep = {
  stepLabel: string;
  title: string;
  description: string;
  href?: string;
  current?: boolean;
  /** Prior completed step in the Method journey (shows a check affordance). */
  completed?: boolean;
};

export type CalculatorMethodProgress = {
  heading?: string;
  steps: CalculatorMethodProgressStep[];
};

export type CalculatorWithdrawalGuide = {
  heading: string;
  intro: string;
  /** Educational example only — not live calculator output. */
  exampleRateLabel?: string;
  exampleRateNote?: string;
  levels: { label: string; description: string }[];
  closing: string;
};

export type CalculatorTimelineExample = {
  heading: string;
  intro: string;
  ages: number[];
  /** How far the bar fills (0–100), e.g. ~55 ≈ mid-to-late 70s on a 65–90 scale. */
  barPercent: number;
  exhaustedLabel: string;
  footer: string;
};

/** Educational amount progression (e.g. purchasing power over decades). */
export type CalculatorValueProgress = {
  heading: string;
  intro: string;
  assumptionNote?: string;
  steps: { label: string; value: string }[];
  footer?: string;
};

/** Real-world comparison of what the same lifestyle costs later. */
export type CalculatorLifestyleExample = {
  heading: string;
  todayHeading: string;
  todayItems: string[];
  laterHeading: string;
  laterBody: string;
  footer?: string;
};

/** “Who should use this” audience list shown before the calculator. */
export type CalculatorAudienceGuide = {
  heading: string;
  intro?: string;
  items: string[];
  /** Optional capital-source examples (e.g. inheritance, property sale). */
  examplesHeading?: string;
  examples?: string[];
  /** Who this tool is not intended for. */
  exclusionNote?: string;
};

/** Short assumptions / disclaimer callout immediately before the tool. */
export type CalculatorAssumptionCallout = {
  heading: string;
  paragraphs: string[];
};

/** Simple vertical income / money-flow diagram. */
export type CalculatorIncomeFlow = {
  heading: string;
  intro?: string;
  steps: string[];
  footer?: string;
};

/** Educational comparison of which Toolkit tool suits which goal. */
export type CalculatorDecisionComparison = {
  heading: string;
  intro?: string;
  rows: { objective: string; toolLabel: string; href?: string; current?: boolean }[];
  footer?: string;
};

export type CalculatorJourneyItem = {
  assetCode: string;
  title: string;
  description: string;
  href: string;
  /** e.g. Previous Step / Next Step / Then / Complete the Journey */
  stepLabel?: string;
};

export type CalculatorJourney = {
  heading: string;
  items: CalculatorJourneyItem[];
};

export type CalculatorAssessmentSection = {
  heading: string;
  intro: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type CalculatorHeroCta = {
  primaryLabel: string;
  /** Defaults to #calculator-tool */
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type CalculatorTerminalOption = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type CalculatorTerminalOptions = {
  heading: string;
  options: [CalculatorTerminalOption, CalculatorTerminalOption];
};

export type CalculatorTerminalCta = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type CalculatorPageConfig = {
  id: string;
  path: string;
  assetCode: string;
  calculatorSrc: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  kicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  calculatorTitle: string;
  calculatorLead: string;
  sidePanelTitle: string;
  sidePanelParagraphs: string[];
  sidePanelBullets: string[];
  fiduciaryNotes: string[];
  howToSteps: { title: string; description: string }[];
  readingSections: { heading: string; paragraphs: string[] }[];
  faqs: FAQItem[];
  categoryLabel: string;
  categoryHref: string;
  /**
   * Decision Question — standard Toolkit component.
   * Default placement is immediately below the hero; use before-calculator when the brief
   * places the prompt just above the tool.
   */
  decisionQuestion?: CalculatorDecisionQuestion;
  /** Visual strategy fork shown with the Decision Question (typically before the calculator). */
  strategyDiagram?: CalculatorStrategyDiagram;
  /** Shown immediately below the hero (or Decision Question), before how-to / calculator. */
  contextBox?: CalculatorContextBox;
  /** Audience suitability list before how-to / calculator. */
  audienceGuide?: CalculatorAudienceGuide;
  /** Assumptions shown immediately before the calculator tool. */
  assumptionCallout?: CalculatorAssumptionCallout;
  heroCta?: CalculatorHeroCta;
  /** Visual Method journey steps shown immediately before the calculator. */
  methodProgress?: CalculatorMethodProgress;
  /** Plain-language interpretation of calculator outcomes (after the tool). */
  resultGuide?: CalculatorResultGuide;
  /** Educational withdrawal-rate risk framing (does not alter the embed). */
  withdrawalGuide?: CalculatorWithdrawalGuide;
  /** Static illustrative capital-exhaustion timeline (educational example only). */
  timelineExample?: CalculatorTimelineExample;
  /** Static purchasing-power / future-value progression (educational example only). */
  valueProgress?: CalculatorValueProgress;
  /** Tangible lifestyle cost comparison for inflation education. */
  lifestyleExample?: CalculatorLifestyleExample;
  /** Simple gross → tax → net income flow diagram. */
  incomeFlow?: CalculatorIncomeFlow;
  /** Which Toolkit tool to explore for different retirement goals. */
  decisionComparison?: CalculatorDecisionComparison;
  practicalWays?: CalculatorPracticalWays;
  methodSection?: CalculatorMethodSection;
  assessmentSection?: CalculatorAssessmentSection;
  /** Curated next-step calculators; when set, replaces generic RelatedContent. */
  journey?: CalculatorJourney;
  terminalCta?: CalculatorTerminalCta;
  /** Dual decision paths (e.g. Assessment vs Method). Takes precedence over terminalCta. */
  terminalOptions?: CalculatorTerminalOptions;
  /**
   * Where readingSections render after the calculator.
   * Default: after results (before practical ways).
   * Use after-practical when the action plan should come first (e.g. Asset 003).
   */
  readingSectionsPlacement?: "after-results" | "after-practical";
  /**
   * Members-only planners (e.g. Goal Engineering Planner™).
   * Public page stays educational; the calculator iframe is locked behind
   * Financial Freedom Community™ membership (signup → payment → access).
   */
  membersOnly?: boolean;
};

const FIDUCIARY: string[] = [
  "Educational illustration only. Not personalised financial, tax, or legal advice.",
  "Tax tables and product terms may change. Confirm with a qualified practitioner.",
  "FSP 17273 · Category 1.8 independent adviser · Krugersdorp.",
];

type PageContent = Omit<
  CalculatorPageConfig,
  "id" | "path" | "assetCode" | "calculatorSrc" | "calculatorTitle"
> & { shortTitle: string };

const RETIREMENT = { categoryLabel: "Retirement planning", categoryHref: "/retirement-planning" };
const EVEREST = { categoryLabel: "Everest Wealth", categoryHref: "/investments" };
const INSURANCE = { categoryLabel: "Insurance & risk", categoryHref: "/insurance" };
const WEALTH = { categoryLabel: "Wealth building", categoryHref: "/investments" };

const PAGES: Record<string, PageContent> = {
  "asset-001-retirement-growth": {
    shortTitle: "Retirement Growth Rate Calculator",
    seoTitle: "Retirement Growth Rate Calculator South Africa",
    seoDescription:
      "Estimate the annual investment growth rate you may need to reach your retirement capital goal from savings, contributions and time. Educational SA calculator. FSP 17273.",
    keywords: [
      "retirement growth rate calculator",
      "retirement calculator South Africa",
      "required investment return retirement",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 001",
    heroTitle:
      "What annual investment growth rate would you need to reach your retirement goal?",
    heroSubtitle:
      "This calculator estimates the average annual investment return that may be required to achieve your desired retirement capital based on your current retirement savings, future monthly contributions and the time remaining until retirement.",
    heroImage: "/images/calc-lcp/asset-001.webp",
    heroImageAlt: "Couple reviewing long-term retirement savings notes at a kitchen table",
    calculatorLead:
      "Enter current savings, monthly contributions, years to retirement, and your target lump sum. The tool shows an illustrative required growth rate.",
    sidePanelTitle: "Who this is for",
    sidePanelParagraphs: [
      "Still working and asking whether your retirement savings are on track? This calculator translates a target capital number into an illustrative growth rate.",
      "Use it before product conversations so you understand the maths behind compound growth, contributions, and time. Then explore the Retirement Gap Toolkit™ and Retirement Gap Method™ for the fuller picture.",
    ],
    sidePanelBullets: [
      "Set a retirement capital target",
      "Include lump sum and monthly contributions",
      "Stress-test time horizon changes",
      "Prepare informed adviser discussions",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Set your target", description: "Enter the retirement capital you want at your chosen retirement age." },
      { title: "Add what you have", description: "Include current retirement savings and ongoing monthly contributions." },
      { title: "Choose your timeline", description: "Set years until retirement to see how time affects the required rate." },
      { title: "Review the result", description: "Compare the illustrative rate with realistic return assumptions before acting." },
    ],
    contextBox: {
      heading: "Why This Matters",
      paragraphs: [
        "Many South Africans focus on choosing investment products before understanding what investment return they actually need.",
        "This calculator works backwards from your retirement goal to estimate the annual investment growth rate required.",
        "It helps answer one important question:",
      ],
      highlightQuestion: "Is my retirement goal realistic?",
    },
    resultGuide: {
      heading: "Understanding Your Result",
      intro: "Don't simply treat the required percentage as a product promise. Interpret what it generally means.",
      bandsLead: "If your required annual growth rate is:",
      bands: [
        {
          label: "Below 10%",
          description:
            "Generally achievable over long investment periods with a well-diversified investment strategy.",
        },
        {
          label: "10%–15%",
          description:
            "Potentially achievable but may require higher investment risk, disciplined investing and sufficient time.",
        },
        {
          label: "Above 15%",
          description:
            "Your retirement objective may depend on unusually high long-term investment returns. Consider reviewing your retirement age, monthly retirement savings, desired retirement capital, and retirement income expectations.",
        },
      ],
      footer:
        "The purpose is to educate rather than predict investment performance. Results are illustrative only.",
    },
    practicalWays: {
      heading: "Practical Ways to Improve the Result",
      intro:
        "Most people have four practical ways to improve their retirement outcome. The correct solution depends on each person's financial circumstances.",
      items: [
        "Increase monthly retirement contributions.",
        "Invest for longer by delaying retirement.",
        "Adjust retirement income expectations.",
        "Improve long-term investment performance through an appropriate investment strategy.",
      ],
      closing:
        "There is no single answer for everyone. Use these levers as discussion points with an independent adviser before changing products or contribution levels.",
    },
    methodSection: {
      heading: "Your Retirement Gap",
      paragraphs: [
        "The investment growth rate is only one part of retirement planning.",
        "Your retirement outcome is also influenced by retirement income, inflation, investment risk, longevity, tax and estate planning.",
        "The Retirement Gap Method™ explains how all of these factors work together and how each Retirement Gap Toolkit™ calculator fits into the bigger picture.",
      ],
      bullets: [
        "Retirement income",
        "Inflation",
        "Investment risk",
        "Longevity",
        "Tax",
        "Estate planning",
      ],
      ctaLabel: "Understand the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
    },
    journey: {
      heading: "Continue Your Retirement Journey",
      items: [
        {
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Can your retirement savings actually provide the income you will need?",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          assetCode: "ASSET 003",
          title: "Retirement Premium Calculator",
          description: "How much should you save each month to reach your retirement objective?",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          assetCode: "ASSET 016",
          title: "Power of Growth Calculator",
          description:
            "See how different investment returns can dramatically change long-term retirement outcomes.",
          href: calculatorPagePath("asset-016-growth-comparison"),
        },
        {
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description:
            "Bring every Retirement Gap Toolkit™ calculator together into one complete retirement planning framework.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "You've calculated the numbers. Now decide what to do next.",
      body: "Your calculator result is educational. If you'd like a personalised assessment of your retirement savings, investment strategy and retirement income plan, book a consultation with an independent Category I Financial Services Provider.",
      primaryLabel: "Book a Retirement Gap Review",
      primaryHref: "/contact?source=retirement_gap_review_asset_001",
      secondaryLabel: "Explore the Retirement Gap Method™",
      secondaryHref: "/retirement-gap-method",
    },
    readingSections: [],
    faqs: [
      {
        question: "Is the growth rate guaranteed?",
        answer:
          "No. The result is an illustrative required rate based on your inputs. Markets, fees, and tax can change outcomes.",
      },
      {
        question: "Does this include inflation?",
        answer:
          "Use your target in today's money and discuss real vs nominal returns with your adviser for a complete plan.",
      },
      {
        question: "What should I include in current savings?",
        answer:
          "Include retirement annuities, pension funds, preservation funds, and voluntary investments you intend to use at retirement.",
      },
      {
        question: "What return assumption is realistic?",
        answer:
          "Many planners stress-test conservative, moderate, and optimistic bands. Compare the required rate with those bands before acting.",
      },
      {
        question: "Can AS Brokers help me implement a plan?",
        answer:
          "Yes. We are an independent Category 1.8 FSP (17273) serving Krugersdorp and the West Rand.",
      },
      {
        question: "How often should I rerun this calculator?",
        answer:
          "Rerun when your salary, contributions, or retirement date changes, or at least once a year as part of a retirement review.",
      },
    ],
    categoryLabel: "Getting Started",
    categoryHref: "/calculators#getting-started",
  },

  "asset-002-retirement-reality-check": {
    shortTitle: "Retirement Reality Check",
    seoTitle: "Retirement Reality Check | Will Your Retirement Savings Be Enough?",
    seoDescription:
      "Use the Retirement Reality Check to estimate whether your retirement savings are likely to provide the income you need. Discover your Retirement Gap and explore the Retirement Gap Method™ for South Africans.",
    keywords: [
      "retirement reality check",
      "will I have enough to retire",
      "Retirement Gap",
      "retirement income calculator South Africa",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™",
    heroTitle: "Will your retirement savings actually fund the retirement you want?",
    heroSubtitle:
      "Many South Africans have accumulated retirement savings without knowing whether those savings will actually provide the income they need in retirement. The Retirement Reality Check compares the retirement income your current savings may produce with the income you expect to need. It is often the first step in discovering your Retirement Gap.",
    heroImage: "/images/calc-lcp/asset-002.webp",
    heroImageAlt: "Couple discussing whether retirement income will match their lifestyle",
    calculatorLead:
      "Enter your retirement savings, expected income need, and planning assumptions. The tool illustrates whether your savings may fund the retirement you want—educational only, not a guarantee.",
    sidePanelTitle: "The flagship starting point",
    sidePanelParagraphs: [
      "This is the recommended first calculator in the Retirement Gap Toolkit™ because it answers the most important question: will I actually have enough to retire?",
      "Use it before product conversations. Pair it with the Retirement Growth Rate Calculator, Retirement Premium Calculator, and Life of Capital Calculator for a fuller picture—then the Retirement Gap Method™.",
    ],
    sidePanelBullets: [
      "Income need vs projected capital",
      "See your Retirement Gap in plain numbers",
      "Recommended start for first-time visitors",
      "Educational illustration only",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Define income need", description: "Enter the monthly income you want in today's rands." },
      { title: "Enter capital projections", description: "Add expected retirement lump sum and growth assumptions." },
      { title: "Set drawdown rules", description: "Use an illustrative drawdown or annuity assumption where prompted." },
      { title: "Read the gap", description: "A shortfall means planning changes; a surplus may allow more flexibility." },
    ],
    heroCta: {
      primaryLabel: "Check My Retirement Reality",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Explore the Retirement Gap Toolkit™",
      secondaryHref: "/calculators",
    },
    contextBox: {
      heading: "Why this calculator matters",
      paragraphs: [
        "Many South Africans only discover they have a Retirement Gap a few years before retirement.",
        "Most people focus on how much money they have accumulated. The more important question is: how much retirement income will those savings actually produce?",
        "This calculator helps answer one simple question:",
      ],
      highlightQuestion: "Will I have enough?",
    },
    resultGuide: {
      heading: "Retirement Gap Status",
      intro:
        "Instead of treating the numbers as a final answer, use them to understand your position. The calculator illustrates capital, income, shortfall, replacement ratio, Retirement Gap and readiness—interpret the status below in plain language.",
      bandsLead: "What your outcome generally means:",
      bands: [
        {
          label: "On Track",
          description:
            "Your projected retirement income appears capable of supporting your planned retirement lifestyle. Continue reviewing your retirement plan regularly as your circumstances change.",
        },
        {
          label: "Needs Attention",
          description:
            "Your retirement plan may work, but there is little room for unexpected events such as inflation, poor investment returns or living longer than expected. You may wish to review investment strategy, retirement age, contribution levels and retirement income expectations.",
        },
        {
          label: "Retirement Gap Identified",
          description:
            "Your projected retirement income appears to be lower than the income you require. The good news is that identifying the gap early gives you time to improve it.",
        },
      ],
      metricsListed: [
        "Estimated Retirement Capital",
        "Estimated Monthly Retirement Income",
        "Estimated Monthly Shortfall",
        "Income Replacement Ratio",
        "Retirement Gap",
        "Retirement Readiness Score",
      ],
      footer:
        "These figures are educational illustrations produced by the calculator. They are not personalised advice or a prediction of future performance.",
    },
    practicalWays: {
      heading: "How can you improve your Retirement Gap?",
      intro:
        "A Retirement Gap does not necessarily mean retirement is impossible. Many Retirement Gaps can be improved by adjusting one or more of the following:",
      items: [
        "Increasing retirement contributions",
        "Working for longer",
        "Improving long-term investment performance",
        "Reducing unnecessary investment costs",
        "Reviewing retirement income expectations",
        "Optimising existing retirement investments",
      ],
      closing:
        "The most appropriate solution depends on your personal circumstances. Learn how the Toolkit calculators fit together before making major changes.",
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
    },
    assessmentSection: {
      heading: "Not sure if these assumptions are realistic?",
      intro:
        "A Retirement Gap Assessment helps determine whether the assumptions used in this calculator are appropriate for your situation. During the assessment we review:",
      bullets: [
        "Your current retirement savings",
        "Existing retirement investments",
        "Expected retirement income",
        "Investment assumptions",
        "Practical ways to improve your retirement outcome",
      ],
      ctaLabel: "Book a Retirement Gap Assessment",
      ctaHref: "/contact?source=retirement_gap_assessment_asset_002",
    },
    journey: {
      heading: "Continue Your Retirement Gap Journey",
      items: [
        {
          stepLabel: "Previous Step",
          assetCode: "ASSET 001",
          title: "Retirement Growth Rate Calculator",
          description: "Can your retirement objective realistically be achieved?",
          href: calculatorPagePath("asset-001-retirement-growth"),
        },
        {
          stepLabel: "Next Step",
          assetCode: "ASSET 003",
          title: "Retirement Premium Calculator",
          description: "How much should you save every month?",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          stepLabel: "Then",
          assetCode: "ASSET 004",
          title: "Life of Capital Calculator",
          description: "How long is your retirement income likely to last?",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Complete the Journey",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description:
            "Bring every calculator together into one complete retirement planning framework.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalOptions: {
      heading: "Your next decision",
      options: [
        {
          title: "Optimise my existing retirement investments",
          description:
            "For people who already have retirement savings and want to improve their retirement outcome.",
          ctaLabel: "Book a Retirement Gap Assessment",
          ctaHref: "/contact?source=retirement_gap_assessment_asset_002",
        },
        {
          title: "Learn how to close your Retirement Gap",
          description:
            "Understand how all of the Retirement Gap Toolkit™ calculators work together through the Retirement Gap Method™ before making important retirement decisions.",
          ctaLabel: "Explore the Retirement Gap Method™",
          ctaHref: "/retirement-gap-method",
        },
      ],
    },
    readingSections: [
      {
        heading: "What your results mean",
        paragraphs: [
          "A Retirement Gap usually appears when the income your savings may produce is lower than the income you expect to need. It can come from saving too little, starting too late, assuming growth that is too high, underestimating longevity, or spending assumptions that do not match real life.",
          "Investment growth matters because compound returns over decades can change the capital available to generate income. Inflation matters because the same rand buys less each year—so an income that looks fine today may feel tight later.",
          "Retirement planning is an ongoing process, not a once-off calculation. Your salary, contributions, markets, health and family needs change. Revisit this Reality Check when your circumstances change.",
          "The encouraging news: many Retirement Gaps can still be improved. Tools in the Retirement Gap Toolkit™—including the Retirement Growth Rate Calculator, Retirement Premium Calculator and Life of Capital Calculator—help you explore different levers. The Retirement Gap Method™ explains how those pieces fit together.",
        ],
      },
      {
        heading: "Why retirement planning often goes wrong",
        paragraphs: [
          "Many people believe retirement begins when they reach a certain age. In reality, retirement begins when your investments are capable of generating sufficient sustainable income.",
          "Understanding the difference between retirement capital and retirement income is one of the foundations of the Retirement Gap Method™. Capital is what you have accumulated. Income is what that capital can responsibly produce over time.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is a Retirement Gap?",
        answer:
          "A Retirement Gap is the shortfall between the retirement income your savings may produce and the income you expect to need. This Reality Check helps you see that gap in educational, illustrative terms.",
      },
      {
        question: "How accurate is this calculator?",
        answer:
          "It is an educational illustration based on the assumptions you enter. Markets, fees, tax, inflation and longevity can change real outcomes. Treat results as a starting point for learning, not a guarantee.",
      },
      {
        question: "What if my projected retirement income is too low?",
        answer:
          "That usually means a Retirement Gap has been identified. You can explore higher contributions, working longer, adjusting income expectations, or improving investment strategy—often through the Premium, Growth Rate and Life of Capital calculators, then the Retirement Gap Method™.",
      },
      {
        question: "Should I increase my savings or delay retirement?",
        answer:
          "Both can improve a Retirement Gap, and the better choice depends on your circumstances, health, career and income needs. This page educates; a Retirement Gap Assessment with FSP 17273 can help you weigh the options personally.",
      },
      {
        question: "Can better investment returns eliminate my Retirement Gap?",
        answer:
          "Higher long-term returns can help, but chasing returns also increases risk. Many gaps improve through a mix of contributions, time, costs, expectations and suitable strategy—not returns alone.",
      },
      {
        question: "How often should I update this calculation?",
        answer:
          "Update when your salary, contributions, retirement date or income needs change, or at least once a year as part of a retirement review.",
      },
      {
        question: "Is this financial advice?",
        answer:
          "No. The Retirement Reality Check is an educational tool in the Retirement Gap Toolkit™. Personalised financial advice requires a needs analysis with an authorised provider such as AS Brokers CC (FSP 17273).",
      },
    ],
    categoryLabel: "Getting Started",
    categoryHref: "/calculators#getting-started",
  },

  "asset-003-retirement-premium": {
    shortTitle: "Retirement Premium Calculator",
    seoTitle: "Retirement Premium Calculator | Close Your Retirement Gap",
    seoDescription:
      "Estimate the monthly savings that may help close your Retirement Gap. Educational contribution calculator in the Retirement Gap Toolkit™ for South Africans. FSP 17273.",
    keywords: [
      "retirement premium calculator",
      "retirement contribution calculator",
      "monthly retirement savings",
      "close Retirement Gap",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Solution Calculator",
    heroTitle: "What monthly savings could help close your Retirement Gap?",
    heroSubtitle:
      "You've measured your Retirement Gap. Now it's time to build a plan. This calculator estimates the monthly contribution that may be required to achieve your retirement objective based on your current savings, investment period and expected investment growth. It provides an educational estimate to help you understand the actions that could improve your retirement outcome.",
    heroImage: "/images/calc-lcp/asset-003.webp",
    heroImageAlt: "Professional planning the monthly amount needed to close a retirement gap",
    calculatorLead:
      "Enter your funding gap, years to retirement, and growth assumption to see an illustrative monthly premium or contribution. Educational only—not a product quote.",
    sidePanelTitle: "From awareness to action",
    sidePanelParagraphs: [
      "After the Retirement Reality Check, the next question is practical: what monthly number may help close the gap? This is the Solution Calculator in the Retirement Gap Method™.",
      "Use it alongside the Retirement Growth Rate Calculator and Life of Capital Calculator, then explore the Retirement Gap Method™ for the full framework.",
    ],
    sidePanelBullets: [
      "Converts your Retirement Gap into a monthly plan",
      "Stress-test time and growth assumptions",
      "Pairs with Reality Check and Life of Capital",
      "Not a policy quote or personalised advice",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter the shortfall", description: "Use your gap from a Reality Check or your own capital target." },
      { title: "Set years remaining", description: "How long you can still contribute before retirement." },
      { title: "Add growth assumption", description: "Use a conservative illustrative return for stress-testing." },
      { title: "Review monthly result", description: "Treat the output as a planning benchmark, not a product premium." },
    ],
    heroCta: {
      primaryLabel: "Calculate My Monthly Saving",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Explore the Retirement Gap Toolkit™",
      secondaryHref: "/calculators",
    },
    contextBox: {
      heading: "Most Retirement Gaps are not solved overnight",
      paragraphs: [
        "They are closed gradually through disciplined saving, investment growth and time.",
        "This calculator estimates the monthly contribution required to help bridge the gap before retirement.",
        "Small changes made consistently over many years often have a greater impact than large changes made too late.",
      ],
      highlightQuestion: "What do I need to do to close my Retirement Gap?",
    },
    methodProgress: {
      heading: "Where you are in the Retirement Gap Method™",
      steps: [
        {
          stepLabel: "Step 1",
          title: "Measure your Retirement Gap",
          description: "Retirement Reality Check (Asset 002)",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Step 2 — Current Page",
          title: "Calculate the monthly saving required",
          description: "Retirement Premium Calculator (Asset 003)",
          current: true,
        },
        {
          stepLabel: "Step 3",
          title: "Test how long your retirement income may last",
          description: "Life of Capital Calculator (Asset 004)",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
      ],
    },
    resultGuide: {
      heading: "How achievable is this goal?",
      intro:
        "Do not treat the monthly figure as a single impossible target. Interpret how achievable it looks, then explore multiple levers in your action plan.",
      bandsLead: "If the required contribution looks:",
      bands: [
        {
          label: "Relatively achievable",
          description:
            "Your retirement objective appears achievable if you maintain consistent contributions and regularly review your progress.",
        },
        {
          label: "Moderately challenging",
          description:
            "Your retirement objective appears achievable but may require increasing contributions over time or making adjustments to your retirement strategy.",
        },
        {
          label: "Very challenging",
          description:
            "The required monthly contribution is substantial. Most people improve their outcome by combining several strategies rather than relying on one large increase in monthly savings.",
        },
      ],
      footer:
        "These interpretations are educational only. The calculator figures are illustrations based on your inputs—not guarantees or personalised advice.",
    },
    practicalWays: {
      heading: "Your Retirement Gap Action Plan",
      intro:
        "Improving retirement outcomes usually involves adjusting several variables—not only one large monthly saving. Possible improvements include:",
      items: [
        "Increasing monthly contributions",
        "Starting earlier",
        "Working for longer",
        "Reviewing retirement income expectations",
        "Improving long-term investment performance",
        "Reducing unnecessary investment costs",
        "Using more tax-efficient retirement structures",
        "Reviewing existing retirement products",
      ],
      closing:
        "The emphasis is on multiple practical levers you can control. A sustainable combination of changes is usually more successful than one unaffordable jump in monthly savings. Compare approaches with the Retirement Growth Rate Calculator and Life of Capital Calculator in the Toolkit.",
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
    },
    methodSection: {
      heading: "Saving enough each month is only one part of retirement planning",
      paragraphs: [
        "You also need to understand whether your retirement income will last, inflation, sustainable drawdown rates, taxation and investment strategy.",
        "Continue to the Life of Capital Calculator next, or explore how every Retirement Gap Toolkit™ calculator fits together in the Retirement Gap Method™.",
      ],
      bullets: [
        "Whether your retirement income will last",
        "Inflation",
        "Sustainable drawdown rates",
        "Taxation",
        "Investment strategy",
      ],
      ctaLabel: "Continue to the Life of Capital Calculator",
      ctaHref: calculatorPagePath("asset-004-life-of-capital"),
      secondaryCtaLabel: "Learn the Retirement Gap Method™",
      secondaryCtaHref: "/retirement-gap-method",
    },
    assessmentSection: {
      heading: "Unsure whether this monthly saving is realistic?",
      intro:
        "A Retirement Gap Assessment helps determine whether your retirement objective is achievable and identifies practical alternatives where necessary. We can review contributions, time horizon, growth assumptions and other levers alongside your Reality Check results.",
      bullets: [
        "Whether the monthly figure is sustainable for your cash flow",
        "Alternative combinations of saving, time and expectations",
        "Tax-efficient structures and existing product reviews",
        "How this step fits with Life of Capital and the Method™",
      ],
      ctaLabel: "Book a Retirement Gap Assessment",
      ctaHref: "/contact?source=retirement_gap_assessment_asset_003",
    },
    journey: {
      heading: "Continue Your Retirement Gap Journey",
      items: [
        {
          stepLabel: "Previous",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Measure your Retirement Gap",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Current",
          assetCode: "ASSET 003",
          title: "Retirement Premium Calculator",
          description: "Calculate the monthly saving required",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 004",
          title: "Life of Capital Calculator",
          description: "Will your retirement income last?",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Complete Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "Bring every Toolkit calculator into one complete retirement planning framework.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalOptions: {
      heading: "Every Retirement Gap has a solution.",
      options: [
        {
          title: "Which change could have the greatest impact on your retirement future?",
          description:
            "The question isn't whether your current plan is perfect. Book a Retirement Gap Assessment for a personalised review of contributions, time and strategy.",
          ctaLabel: "Book a Retirement Gap Assessment",
          ctaHref: "/contact?source=retirement_gap_assessment_asset_003",
        },
        {
          title: "Continue the Retirement Gap Method™",
          description:
            "Understand how the Reality Check, Premium Calculator, Life of Capital and the rest of the Retirement Gap Toolkit™ work together before you decide.",
          ctaLabel: "Continue the Retirement Gap Method™",
          ctaHref: "/retirement-gap-method",
        },
      ],
    },
    readingSections: [
      {
        heading: "Closing the Retirement Gap is about consistency",
        paragraphs: [
          "Long-term retirement success is rarely achieved by finding the perfect investment. It is usually driven by saving consistently, increasing contributions over time, staying invested, reviewing progress regularly, and giving compound growth sufficient time to work.",
          "A retirement plan you can maintain is usually more successful than a perfect plan you cannot sustain. Revisit this calculator when your income or goals change, and compare outcomes with the Retirement Reality Check and Retirement Growth Rate Calculator in the Toolkit.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this a life insurance premium?",
        answer:
          "It illustrates retirement funding needs. Actual insurance or investment premiums depend on product, age, and underwriting.",
      },
      {
        question: "Is this personalised advice?",
        answer:
          "No. The monthly figure is an educational illustration. Personal advice requires a needs analysis with AS Brokers CC (FSP 17273).",
      },
      {
        question: "Why is my required monthly saving so high?",
        answer:
          "A high figure often means the gap is large relative to the time left, or growth assumptions are conservative. Many people improve the outcome by combining higher contributions with more time, adjusted expectations, or other levers—not only one large monthly increase.",
      },
      {
        question: "Can I close my Retirement Gap by working longer?",
        answer:
          "Working longer can help because you contribute for more years and delay drawdown. Whether it is the best lever depends on your health, career and income needs. Explore scenarios here, then discuss them in a Retirement Gap Assessment.",
      },
      {
        question: "Should I save through a Retirement Annuity or discretionary investments?",
        answer:
          "Both can play a role. RAs may offer tax advantages with contribution and access rules; discretionary investments can be more flexible. The right mix is personal—this calculator does not choose a product for you.",
      },
      {
        question: "Should I change my investment strategy?",
        answer:
          "Strategy can affect long-term growth, but higher returns usually mean higher risk. Closing a gap often needs a balance of saving, time, costs and suitable risk—not returns alone. Pair this tool with the Retirement Growth Rate Calculator for perspective.",
      },
      {
        question: "Can increasing my monthly saving by a small amount really make a difference?",
        answer:
          "Yes. Small, consistent increases over many years can compound significantly. That is why this page emphasises sustainable plans you can maintain rather than a single unaffordable jump.",
      },
    ],
    categoryLabel: "Getting Started",
    categoryHref: "/calculators#getting-started",
    readingSectionsPlacement: "after-practical",
  },

  "asset-004-life-of-capital": {
    shortTitle: "Life of Capital Calculator",
    seoTitle: "Life of Capital Calculator | Will Your Retirement Income Last?",
    seoDescription:
      "Estimate how long your retirement savings may last based on withdrawals, growth and inflation. Educational Life of Capital calculator in the Retirement Gap Toolkit™. FSP 17273.",
    keywords: [
      "life of capital calculator",
      "will my money last in retirement",
      "retirement drawdown calculator",
      "retirement income sustainability",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Income sustainability",
    heroTitle: "Will your retirement income last for the rest of your life?",
    heroSubtitle:
      "Retirement isn't simply about how much money you have. It's about whether your retirement income can remain sustainable throughout your lifetime. This calculator estimates how long your retirement savings may last based on your withdrawals, investment growth and inflation.",
    heroImage: "/images/calc-lcp/asset-004.webp",
    heroImageAlt: "Retiree enjoying a secure lifestyle while capital longevity is planned",
    calculatorLead:
      "Enter lump sum, monthly income draw, growth rate, and inflation to model capital longevity. Educational illustration only—essential before living annuity and voluntary income decisions.",
    sidePanelTitle: "From saving to living off savings",
    sidePanelParagraphs: [
      "This calculator marks the transition from accumulating retirement savings to living off them. After measuring your gap and estimating monthly savings, ask the question that keeps many retirees awake: will I outlive my money?",
      "Next, structure sustainable income with the Living Annuity Income & Sustainability Calculator, then explore the full Retirement Gap Method™.",
    ],
    sidePanelBullets: [
      "Stress-test drawdown sustainability",
      "See inflation and growth sensitivity",
      "Pairs with Reality Check and Premium tools",
      "Primary next step: Living Annuity Sustainability (Asset 014)",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter capital base", description: "Add retirement lump sum or living annuity capital." },
      { title: "Set monthly income", description: "The income you need or are drawing today." },
      { title: "Add growth and inflation", description: "Use conservative assumptions for stress-testing." },
      { title: "Read depletion timeline", description: "If capital runs out too soon, adjust income or strategy with an adviser." },
    ],
    heroCta: {
      primaryLabel: "Test My Retirement Longevity",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Explore the Retirement Gap Toolkit™",
      secondaryHref: "/calculators",
    },
    contextBox: {
      heading: "Will I outlive my money?",
      paragraphs: [
        "Asset 002 asked whether you have enough to retire. Asset 003 asked how much you may need to save. Asset 004 asks the harder question: even if you retire, will your income last?",
        "This page is the emotional centrepiece of the Retirement Gap Toolkit™—the bridge from accumulation to living off capital.",
      ],
      highlightQuestion: "Even if I retire… will my money actually last?",
    },
    methodProgress: {
      heading: "Retirement Gap Journey",
      steps: [
        {
          stepLabel: "Completed",
          title: "Retirement Reality Check",
          description: "Asset 002 — Measure your Retirement Gap",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
          completed: true,
        },
        {
          stepLabel: "Completed",
          title: "Retirement Premium Calculator",
          description: "Asset 003 — Calculate the monthly saving required",
          href: calculatorPagePath("asset-003-retirement-premium"),
          completed: true,
        },
        {
          stepLabel: "You are here",
          title: "Life of Capital Calculator",
          description: "Asset 004 — Will your retirement income last?",
          current: true,
        },
        {
          stepLabel: "Next Step",
          title: "Living Annuity Income & Sustainability Calculator",
          description: "Asset 014 — Is income sustainable?",
          href: calculatorPagePath("asset-014-living-annuity"),
        },
      ],
    },
    resultGuide: {
      heading: "Retirement sustainability outcomes",
      intro:
        "Do not treat the longevity numbers as a final verdict. Classify what the result generally suggests about sustainability under your assumptions.",
      bandsLead: "Interpret your result as one of these outcomes:",
      bands: [
        {
          label: "Excellent",
          tone: "excellent",
          description:
            "Your assumptions suggest your retirement income appears sustainable. Continue reviewing your retirement plan regularly.",
        },
        {
          label: "Reasonable",
          tone: "reasonable",
          description:
            "Your retirement plan appears workable, but regular reviews remain important as markets, inflation and personal circumstances change.",
        },
        {
          label: "Caution",
          tone: "caution",
          description:
            "Your retirement capital may not support your desired retirement income throughout your expected retirement. Small adjustments today could significantly improve long-term sustainability.",
        },
        {
          label: "High Risk",
          tone: "high-risk",
          description:
            "Your assumptions indicate a significant probability of exhausting your retirement savings earlier than expected. Reviewing your withdrawal strategy and retirement income plan is recommended.",
        },
      ],
      footer:
        "These outcomes are educational interpretations only. Calculator results are illustrations based on your inputs—not guarantees or personalised advice.",
    },
    withdrawalGuide: {
      heading: "Understanding your Starting Withdrawal Rate",
      intro:
        "When the calculator shows a starting withdrawal rate, treat it as a sustainability signal—not a product quote. Lower starting withdrawal rates generally improve long-term sustainability, although the appropriate rate depends on individual circumstances.",
      exampleRateLabel: "Starting Withdrawal Rate",
      exampleRateNote:
        "Read the rate the tool produces for your inputs, then compare it with the risk framing below.",
      levels: [
        {
          label: "Green — Lower risk band",
          description: "A more conservative starting rate generally leaves more room for inflation, market shocks and longevity.",
        },
        {
          label: "Yellow — Moderate risk band",
          description: "May be workable with disciplined reviews, but there is less margin for unexpected costs or poor returns.",
        },
        {
          label: "Orange — Elevated risk band",
          description: "Sustainability may be under pressure. Consider reducing withdrawals, delaying retirement, or adjusting expectations.",
        },
        {
          label: "Red — High risk band",
          description: "A high starting rate often signals a material chance of exhausting capital earlier than hoped. Review strategy promptly.",
        },
      ],
      closing:
        "The right withdrawal rate is personal. Pair this illustration with the Living Annuity Income & Sustainability Calculator and a Retirement Gap Review before changing income.",
    },
    timelineExample: {
      heading: "How to read a capital exhaustion timeline",
      intro:
        "A simple timeline communicates longevity faster than paragraphs alone. The example below is educational—use your calculator result to estimate where capital may run out under your own assumptions.",
      ages: [65, 70, 75, 80, 85, 90],
      barPercent: 53,
      exhaustedLabel: "Capital exhausted here · example Age 78 years 4 months",
      footer:
        "Illustrative example only. Your calculator output may show a different depletion point based on withdrawals, growth and inflation.",
    },
    practicalWays: {
      heading: "Four ways to help your retirement savings last longer",
      intro: "If longevity looks tight, focus on levers you can still influence:",
      items: [
        {
          label: "Reduce annual withdrawals.",
          href: calculatorPagePath("asset-014-living-annuity"),
        },
        {
          label: "Improve long-term investment growth.",
          href: calculatorPagePath("asset-001-retirement-growth"),
        },
        {
          label: "Delay retirement where practical.",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          label: "Reduce future living expenses.",
          href: calculatorPagePath("asset-005-future-value"),
        },
      ],
      closing:
        "Related Toolkit tools and Method guidance help you explore these levers. Educational articles will deepen each theme as they are published.",
      ctaLabel: "Continue to the Living Annuity Income & Sustainability Calculator",
      ctaHref: calculatorPagePath("asset-014-living-annuity"),
    },
    methodSection: {
      heading: "Structure income so it lasts",
      paragraphs: [
        "If Asset 004 creates concern, the next practical step is testing whether living annuity income may be sustainable. Asset 014 explores drawdown, tax and capital longevity—education before products.",
        "The Retirement Gap Method™ then brings Reality Check, Premium, Life of Capital, Future Value and Living Annuity tools into one framework.",
      ],
      bullets: [
        "Living annuity drawdown bands",
        "Inflation-aware income planning",
        "Tax and sustainability trade-offs",
        "Review cadence after retirement",
      ],
      ctaLabel: "Open the Living Annuity Income & Sustainability Calculator",
      ctaHref: calculatorPagePath("asset-014-living-annuity"),
      secondaryCtaLabel: "Learn the Retirement Gap Method™",
      secondaryCtaHref: "/retirement-gap-method",
    },
    assessmentSection: {
      heading: "Need help interpreting longevity risk?",
      intro:
        "A Retirement Gap Review helps test whether your withdrawal assumptions, growth outlook and lifestyle needs are realistic—and which changes could improve sustainability.",
      bullets: [
        "Current capital and income needs",
        "Withdrawal rate and longevity assumptions",
        "Inflation and sequence-of-returns sensitivity",
        "Practical next steps including living annuity structure",
      ],
      ctaLabel: "Book a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_004",
    },
    journey: {
      heading: "Continue Your Retirement Gap Journey",
      items: [
        {
          stepLabel: "Previous",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Do I have enough to retire?",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Previous",
          assetCode: "ASSET 003",
          title: "Retirement Premium Calculator",
          description: "How much do I need to save?",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 014",
          title: "Living Annuity Income & Sustainability Calculator",
          description: "How do I structure retirement income so it lasts?",
          href: calculatorPagePath("asset-014-living-annuity"),
        },
        {
          stepLabel: "Also explore",
          assetCode: "ASSET 005",
          title: "Future Value Calculator",
          description: "See how inflation erodes purchasing power over time.",
          href: calculatorPagePath("asset-005-future-value"),
        },
        {
          stepLabel: "Complete Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "The full educational framework connecting every Toolkit calculator.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalOptions: {
      heading: "Your retirement plan should survive your retirement.",
      options: [
        {
          title: "The objective isn't simply generating retirement income.",
          description:
            "It's making sure that income lasts for as long as you do. Book a Retirement Gap Review for a personalised sustainability discussion.",
          ctaLabel: "Book a Retirement Gap Review",
          ctaHref: "/contact?source=retirement_gap_review_asset_004",
        },
        {
          title: "Continue with the Retirement Gap Method™",
          description:
            "See how Life of Capital connects to Living Annuity, Reality Check, Premium and the rest of the Retirement Gap Toolkit™.",
          ctaLabel: "Continue with the Retirement Gap Method™",
          ctaHref: "/retirement-gap-method",
        },
      ],
    },
    readingSections: [
      {
        heading: "Why retirement capital runs out",
        paragraphs: [
          "Retirement savings are usually exhausted because one or more of the following occur: withdrawals are too high; inflation is higher than expected; investment returns disappoint; retirement lasts longer than planned; tax reduces available retirement income; or unexpected expenses arise.",
          "The good news is that many of these factors can still be managed through good retirement planning. Revisit your Reality Check and Premium results, explore Future Value for inflation pressure, then structure income with the Living Annuity Income & Sustainability Calculator.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "What drawdown rate is safe?",
        answer:
          "There is no universal safe rate. It depends on age, portfolio, fees, and inflation. Use this tool to explore scenarios, then seek advice.",
      },
      {
        question: "Does this model living annuities?",
        answer:
          "It illustrates capital longevity. For living annuity income mechanics, use our Living Annuity Income & Sustainability Calculator as well.",
      },
      {
        question: "How much can I safely withdraw each year?",
        answer:
          "Safe withdrawal depends on your age, capital, investment mix, fees, inflation and longevity. This calculator helps you stress-test assumptions; a Retirement Gap Review can personalise the answer.",
      },
      {
        question: "Why can retirement savings run out even when investments perform well?",
        answer:
          "Strong long-term averages can still fail if early withdrawals are high, inflation spikes, or a poor sequence of returns hits early in retirement. Longevity and tax also matter.",
      },
      {
        question: "What is sequence-of-returns risk?",
        answer:
          "It is the risk that poor investment returns early in retirement—while you are withdrawing—permanently damage capital, even if later returns recover. Timing matters as much as average return.",
      },
      {
        question: "Does inflation really make that much difference?",
        answer:
          "Yes. Even moderate inflation compounds over a multi-decade retirement and can quietly turn an adequate income into a shortfall. Pair this tool with the Future Value Calculator.",
      },
      {
        question: "Should I reduce my spending or change my investments?",
        answer:
          "Both can help, and the better mix depends on your circumstances and risk tolerance. Many people improve sustainability by adjusting withdrawals first, then reviewing strategy with an adviser.",
      },
      {
        question: "Can working two more years significantly improve retirement outcomes?",
        answer:
          "Often yes. Extra contribution years, delayed drawdown and a shorter funded retirement can materially improve longevity—though health and career reality still matter.",
      },
    ],
    categoryLabel: "Retirement Income",
    categoryHref: "/calculators#retirement-income",
  },

  "asset-005-future-value": {
    shortTitle: "Future Value Calculator",
    seoTitle: "Purchasing Power & Inflation Calculator South Africa | Future Value",
    seoDescription:
      "See how inflation quietly reduces purchasing power and how much more you may need to keep the same lifestyle. Educational Future Value calculator. FSP 17273.",
    keywords: [
      "purchasing power calculator South Africa",
      "inflation calculator South Africa",
      "future value calculator",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 005",
    heroTitle: "How much more money will you need because of inflation?",
    heroSubtitle:
      "Inflation quietly reduces what your money can buy every year. This calculator estimates how much more you'll need in the future simply to maintain the same lifestyle.",
    heroImage: "/images/calc-lcp/asset-005.webp",
    heroImageAlt: "Couple assessing how inflation shrinks what the same money can buy",
    calculatorLead:
      "Enter today's amount, an illustrative inflation rate and your time horizon. The tool shows how much more you may need in future rands to buy the same lifestyle.",
    sidePanelTitle: "Purchasing power, not just inflation",
    sidePanelParagraphs: [
      "Retirement isn't about how much money you have. It's about what your money will still be able to buy.",
      "Inflation is the cause. Purchasing power is what you feel. Use this calculator to see that difference clearly before setting retirement targets.",
    ],
    sidePanelBullets: [
      "Lifestyle cost in future rands",
      "Why retirement targets must grow",
      "Personal inflation vs headline CPI",
      "Educational illustration only",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter today's amount", description: "A lump sum, annual expense or lifestyle cost you want to protect." },
      { title: "Choose an inflation rate", description: "Use a long-term CPI assumption, then stress-test higher rates." },
      { title: "Set your time horizon", description: "Years until retirement or until you need the money." },
      { title: "Read purchasing power", description: "See how much more you may need for the same goods and services." },
    ],
    heroCta: {
      primaryLabel: "See My Purchasing Power",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Explore the Retirement Gap Toolkit™",
      secondaryHref: "/calculators",
    },
    contextBox: {
      heading: "The Hidden Cost of Waiting",
      paragraphs: [
        "Inflation is largely invisible in the short term, yet extremely powerful over decades. A few percent a year compounds quietly while life feels unchanged.",
        "Retirement plans often fail because people underestimate how much prices increase over time—and how much more capital is needed simply to stand still.",
      ],
      highlightQuestion:
        "Retirement isn't about how much money you have. It's about what your money will still be able to buy.",
    },
    methodProgress: {
      heading: "Where this sits in the Retirement Gap Method™",
      steps: [
        {
          stepLabel: "Earlier",
          title: "Retirement Reality Check",
          description: "Asset 002 — Do I have enough to retire?",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
          completed: true,
        },
        {
          stepLabel: "Earlier",
          title: "Retirement Premium Calculator",
          description: "Asset 003 — How much do I need to save?",
          href: calculatorPagePath("asset-003-retirement-premium"),
          completed: true,
        },
        {
          stepLabel: "You are here",
          title: "Future Value Calculator",
          description: "Asset 005 — What will your money still buy?",
          current: true,
        },
        {
          stepLabel: "Also explore",
          title: "Retirement Growth Rate",
          description: "Asset 001 — What growth rate may you need?",
          href: calculatorPagePath("asset-001-retirement-growth"),
        },
        {
          stepLabel: "Also explore",
          title: "Life of Capital Calculator",
          description: "Asset 004 — Will your income last?",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Framework",
          title: "Retirement Gap Method™",
          description: "Asset 018 — The complete educational path",
          href: "/retirement-gap-method",
        },
      ],
    },
    resultGuide: {
      heading: "What your results really mean",
      intro:
        "If inflation averages 6% per year, R50,000 today may require more than R160,000 in twenty years to buy exactly the same goods and services. Nothing became more luxurious. Money simply became worth less.",
      metricsListed: [
        "Future value needed for the same lifestyle",
        "How purchasing power changes over your chosen years",
        "The compounding effect of even “moderate” inflation",
      ],
      footer:
        "Use the numbers from the calculator as an illustration. The educational examples below show the same idea as a timeline and a lifestyle comparison—so the “aha” moment is clear.",
    },
    valueProgress: {
      heading: "Purchasing power over time",
      intro:
        "People understand progression much faster than isolated numbers. Here is an illustrative path for R50,000 at about 6% inflation a year:",
      assumptionNote: "Educational example only — not a forecast. Your calculator inputs may show a different path.",
      steps: [
        { label: "Today", value: "R50,000" },
        { label: "10 Years", value: "R89,500" },
        { label: "20 Years", value: "R160,000" },
        { label: "30 Years", value: "R287,000" },
      ],
      footer:
        "The lifestyle did not upgrade. The same basket of goods and services simply costs more in future rands.",
    },
    lifestyleExample: {
      heading: "Make inflation tangible",
      todayHeading: "What R50,000 buys today",
      todayItems: [
        "Vehicle deposit",
        "One year's university fees",
        "Kitchen renovation",
        "Approximately six months of groceries",
      ],
      laterHeading: "Twenty years later",
      laterBody:
        "You may need approximately R160,000 to purchase exactly the same things—same deposit, same fees, same renovation, same grocery basket. That is purchasing power at work.",
      footer:
        "Compare this with your calculator result. Then revisit retirement targets in the Reality Check and Premium tools so goals grow with living costs.",
    },
    methodSection: {
      heading: "Purchasing power inside the Retirement Gap Method™",
      paragraphs: [
        "Asset 005 explains why retirement targets need to grow over time. Without that understanding, a plan that looks adequate today can quietly fall short.",
        "Use Growth Rate and Life of Capital next to see whether your savings path and income longevity keep pace with rising living costs—then connect everything through the Retirement Gap Method™.",
      ],
      bullets: [
        "Inflation as the cause; purchasing power as the outcome",
        "Why medical and municipal costs often rise faster than CPI",
        "Growing targets before choosing products",
        "Linking Future Value to Reality Check, Premium and longevity tools",
      ],
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
      secondaryCtaLabel: "Open the Retirement Gap Toolkit™",
      secondaryCtaHref: "/calculators",
    },
    journey: {
      heading: "Continue Your Retirement Gap Journey",
      items: [
        {
          stepLabel: "Start",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Do I have enough to retire?",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Then",
          assetCode: "ASSET 003",
          title: "Retirement Premium Calculator",
          description: "How much do I need to save?",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          stepLabel: "You are here",
          assetCode: "ASSET 005",
          title: "Future Value Calculator",
          description: "What will my money still buy?",
          href: calculatorPagePath("asset-005-future-value"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 001",
          title: "Retirement Growth Rate Calculator",
          description: "What growth rate may close the gap?",
          href: calculatorPagePath("asset-001-retirement-growth"),
        },
        {
          stepLabel: "Then",
          assetCode: "ASSET 004",
          title: "Life of Capital Calculator",
          description: "Will my retirement income last?",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "The complete educational framework.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "I never realised inflation could matter this much.",
      body: "That understanding is the point of Asset 005. When purchasing power is clear, retirement targets, savings rates and longevity plans become far more realistic—and the Retirement Gap Method™ shows how the pieces fit together.",
      primaryLabel: "Continue with the Retirement Gap Method™",
      primaryHref: "/retirement-gap-method",
      secondaryLabel: "Explore the Retirement Gap Toolkit™",
      secondaryHref: "/calculators",
    },
    readingSections: [
      {
        heading: "Your personal inflation rate may be higher than CPI",
        paragraphs: [
          "Everyone's personal inflation rate is different. Official CPI is a useful national average—but it may not match the costs that dominate your retirement.",
          "Retirement expenses such as medical costs, municipal charges, healthcare and insurance often increase faster than headline CPI. Planning with only the official rate can understate how much purchasing power you need to protect.",
          "In the Retirement Gap Method™, inflation is not an abstract macro topic. It is the reason lifestyle targets must grow—and why Future Value belongs beside Reality Check, Premium and Life of Capital.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "What inflation rate should I use?",
        answer:
          "Many planners use long-term CPI bands for illustration. Your adviser may stress-test higher rates—especially for medical and municipal costs—when protecting purchasing power.",
      },
      {
        question: "Is this a forecast of CPI?",
        answer:
          "No. You choose an illustrative inflation rate. Outcomes are not guaranteed and are not a SARS or SARB forecast. The goal is understanding purchasing power, not predicting next year’s CPI print.",
      },
      {
        question: "Why is inflation dangerous during retirement?",
        answer:
          "In retirement you often rely more on capital and fixed or semi-fixed income. Rising prices quietly reduce what that income can buy—so a plan that looked adequate at retirement can feel tight years later.",
      },
      {
        question: "Is CPI the same as my personal inflation rate?",
        answer:
          "Not necessarily. CPI is a broad basket. Your personal rate depends on what you actually spend—housing, medical care, insurance, rates and taxes may move differently from the official average.",
      },
      {
        question: "Why do retirees often experience higher inflation?",
        answer:
          "Retirees typically spend a larger share of income on healthcare, medical aid, municipal services and insurance—categories that often rise faster than headline CPI.",
      },
      {
        question: "How much should retirement income increase each year?",
        answer:
          "There is no single correct increase. Many people aim to grow income at least in line with their personal cost of living. Use this calculator to see how large those increases become over decades, then discuss a sustainable plan with an adviser.",
      },
      {
        question: "Should my investments outperform inflation?",
        answer:
          "Over long periods, investments generally need real (after-inflation) growth to protect and grow purchasing power—especially while you are still accumulating. Required returns depend on your goals, time and risk capacity.",
      },
      {
        question: "Why do healthcare costs usually increase faster than inflation?",
        answer:
          "Medical inflation is often driven by technology, specialised care, demographics and medical-scheme dynamics. That is why retiree budgets can feel the squeeze even when headline CPI looks moderate.",
      },
    ],
    categoryLabel: "Purchasing Power",
    categoryHref: "/calculators",
  },

  "asset-006-income-tax": {
    shortTitle: "South African Income Tax Calculator",
    seoTitle: "South African Income Tax Calculator 2026/27 | PAYE & SARS Tax",
    seoDescription:
      "Calculate income tax South Africa with the latest SARS 2026/27 tax brackets. Free PAYE calculator showing annual tax, effective rate, marginal rate and retirement planning insight. FSP 17273.",
    keywords: [
      "South African Income Tax Calculator",
      "Income Tax Calculator South Africa",
      "PAYE Calculator",
      "SARS Tax Calculator",
      "Income Tax 2026/27",
      "South African Tax Brackets",
      "Calculate Income Tax South Africa",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 006",
    heroTitle: "Calculate Your South African Income Tax",
    heroSubtitle:
      "Understand how much of your income goes to SARS. Estimate your annual income tax, monthly tax, effective tax rate and marginal tax rate using the latest South African SARS tax tables. Then discover how tax affects your retirement planning and long-term financial freedom.",
    heroImage: "/images/calc-lcp/asset-006.webp",
    heroImageAlt: "Professional reviewing take-home pay after personal income tax",
    calculatorLead:
      "Enter your gross monthly income and age. The tool uses the latest SARS individual tax tables (currently 2026/27) to estimate tax payable, net income, and your effective and marginal rates.",
    sidePanelTitle: "Tax & retirement insight",
    sidePanelParagraphs: [
      "This is the Tax & Retirement Calculator inside the Retirement Gap Toolkit™. It answers how much income tax you will probably pay—then points to what that means for retirement.",
      "Knowing your bracket helps you discuss retirement contributions, living annuity withdrawals and lifetime tax efficiency with clearer numbers.",
    ],
    sidePanelBullets: [
      "Latest SARS tax year tables",
      "Effective vs marginal rate clarity",
      "Retirement contribution context",
      "Educational estimate only",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter gross monthly income", description: "Use salary or typical monthly earnings before tax." },
      { title: "Add your age", description: "Age rebates can change the estimate for older taxpayers." },
      { title: "Review tax and net income", description: "See annual tax, monthly PAYE, net income and both tax rates." },
      { title: "Connect to retirement", description: "Read the insight, then continue into the Retirement Gap Method™ tools." },
    ],
    heroCta: {
      primaryLabel: "Calculate My Income Tax",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Explore the Retirement Gap Toolkit™",
      secondaryHref: "/calculators",
    },
    contextBox: {
      heading: "How much income tax will I probably pay?",
      paragraphs: [
        "There are many South African tax calculators online. This one is different because it sits inside the Retirement Gap Toolkit™—connecting SARS estimates to retirement planning.",
        "First understand what you pay. Then ask the more important question: how does tax affect my retirement over decades?",
      ],
      highlightQuestion: "Tax is not only a payroll issue. It is a lifetime retirement planning variable.",
    },
    audienceGuide: {
      heading: "Who should use this calculator?",
      intro: "Suitable for anyone who wants a clear, educational estimate of South African income tax before connecting the numbers to retirement planning.",
      items: [
        "Employees paying PAYE",
        "Self-employed taxpayers",
        "Individuals wanting to estimate annual tax",
        "People planning for retirement",
        "Anyone comparing salary increases or retirement contributions",
      ],
    },
    assumptionCallout: {
      heading: "Calculator assumptions",
      paragraphs: [
        "Calculations use the latest SARS individual income tax tables available in this tool (currently the 2026/27 tax year). When SARS updates brackets, only the tax tables in the calculator need to change.",
        "Results are estimates. Individual tax circumstances may differ because of deductions, medical tax credits, allowances, bonuses and other factors not fully modelled here.",
        "Professional tax advice may be appropriate for complex situations. This page is educational and is not a SARS assessment or personalised tax advice.",
      ],
    },
    resultGuide: {
      heading: "How to read your tax results",
      intro:
        "After you calculate, the tool shows Annual Tax, Monthly Tax, Net Annual Income, Net Monthly Income, Effective Tax Rate and Marginal Tax Rate. The summary inside the calculator interprets your own figures in plain language—including how many cents of every rand go to tax, and what your marginal rate means for additional income.",
      metricsListed: [
        "Annual Tax",
        "Monthly Tax (PAYE)",
        "Net Annual Income",
        "Net Monthly Income",
        "Effective Tax Rate",
        "Marginal Tax Rate",
      ],
      highlightMetrics: [
        {
          label: "Effective tax rate",
          description:
            "Your overall average. If it is 22%, roughly 22 cents of every rand you earn goes to income tax across your whole income.",
        },
        {
          label: "Marginal tax rate",
          description:
            "The rate that may apply to your next rand of taxable income. Extra salary, bonuses or taxable investment income can be taxed at this rate—not at your effective rate.",
        },
      ],
      footer:
        "Many South Africans confuse these two rates. Your effective rate describes the overall burden; your marginal rate describes the tax on the next rand. Both matter for retirement contribution and income decisions.",
    },
    incomeFlow: {
      heading: "Where your income goes",
      intro: "A simple flow helps you visualise the path from gross pay to what you can actually use—or save for retirement.",
      steps: [
        "Gross Income",
        "Income Tax (PAYE)",
        "Net Income",
        "Retirement Savings (optional)",
        "Disposable Income",
      ],
      footer:
        "Qualifying retirement contributions can reduce taxable income while building capital for later. That is one reason tax and retirement planning belong together.",
    },
    methodSection: {
      heading: "Income tax should never be viewed in isolation",
      paragraphs: [
        "Retirement contributions, investment structures, estate planning and retirement income all influence your lifetime tax position.",
        "Good retirement planning is often about legally reducing tax over decades rather than simply reducing tax in a single year. The goal is lifetime tax efficiency—not tax avoidance.",
      ],
      bullets: [
        "How brackets affect contribution decisions",
        "Living annuity withdrawals and taxable income",
        "Estate duty and liquidity alongside income tax",
        "Connecting tax insight to the Retirement Gap Method™",
      ],
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
      secondaryCtaLabel: "Open the Retirement Gap Toolkit™",
      secondaryCtaHref: "/calculators",
    },
    assessmentSection: {
      heading: "Want Personalised Retirement Tax Planning?",
      intro:
        "If you would like professional guidance on reducing lifetime tax, improving retirement income and building a more tax-efficient retirement strategy, book a Retirement Gap Review with AS Brokers.",
      bullets: [
        "Current income tax and PAYE position",
        "Retirement contribution opportunities",
        "Retirement income and living annuity tax",
        "Lifetime tax efficiency aligned to your goals",
      ],
      ctaLabel: "Book a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_006",
    },
    journey: {
      heading: "Continue Your Retirement Planning",
      items: [
        {
          stepLabel: "Next",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "See how tax and savings fit your Retirement Gap.",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 014",
          title: "Living Annuity Income & Sustainability Calculator",
          description: "Understand how retirement income withdrawals are taxed.",
          href: calculatorPagePath("asset-014-living-annuity"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 007",
          title: "Estate Duty Calculator",
          description: "Connect income tax thinking to estate liquidity.",
          href: calculatorPagePath("asset-007-estate-duty"),
        },
        {
          stepLabel: "Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "See how tax supports the full retirement framework.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "Want Personalised Retirement Tax Planning?",
      body: "If you would like professional guidance on reducing lifetime tax, improving retirement income and building a more tax-efficient retirement strategy, book a Retirement Gap Review with AS Brokers. The focus remains educational, compliant and aligned with the Retirement Gap Method™.",
      primaryLabel: "Book a Retirement Gap Review",
      primaryHref: "/contact?source=retirement_gap_review_asset_006",
      secondaryLabel: "Continue with the Retirement Gap Method™",
      secondaryHref: "/retirement-gap-method",
    },
    readingSections: [
      {
        heading: "South African income tax in plain English",
        paragraphs: [
          "South Africa uses progressive taxation: as taxable income rises, higher portions of income can fall into higher tax brackets. That does not mean your whole income is taxed at the top rate.",
          "Your effective tax rate is the overall average across your income. Your marginal tax rate is the rate that may apply to the next rand. Tax rebates reduce tax payable and can depend on age. Medical tax credits and qualifying retirement fund deductions can also change what you ultimately owe.",
          "Two people earning similar incomes may pay different amounts of tax because of age rebates, retirement contributions, medical credits, deductions and the mix of income types. That is why this calculator is an estimate—and why advice still matters for complex cases.",
        ],
      },
      {
        heading: "Why tax belongs in the Retirement Gap Method™",
        paragraphs: [
          "Asset 006 answers: how much income tax will I probably pay? The Method then asks the deeper question: how does tax affect my retirement?",
          "Use this supporting calculator for clarity and authority, then return to Reality Check, Living Annuity, Estate Duty and the Retirement Gap Method™ so tax never sits in isolation.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "What is PAYE?",
        answer:
          "PAYE means Pay As You Earn. It is income tax usually deducted from an employee's salary each month and paid over to SARS. This calculator estimates a simplified PAYE-style monthly tax figure.",
      },
      {
        question: "What is income tax?",
        answer:
          "Income tax is tax charged on taxable income according to SARS rules and tables for the tax year. Individuals may also qualify for rebates and certain deductions or credits.",
      },
      {
        question: "What is my marginal tax rate?",
        answer:
          "It is the tax rate that may apply to your next rand of taxable income based on the SARS bracket your income reaches. Extra earnings can be taxed at this rate.",
      },
      {
        question: "What is my effective tax rate?",
        answer:
          "It is your overall average: total income tax divided by total income. It is usually lower than your marginal rate because not all of your income is taxed at the top bracket.",
      },
      {
        question: "Why are they different?",
        answer:
          "Progressive brackets and rebates mean your average (effective) rate across all income differs from the rate on the next rand (marginal). Confusing them can lead to poor salary, bonus and retirement contribution decisions.",
      },
      {
        question: "How can retirement fund contributions reduce tax?",
        answer:
          "Qualifying contributions to retirement funds can reduce taxable income within SARS limits, which may lower tax payable while building retirement capital. Limits and eligibility depend on your circumstances.",
      },
      {
        question: "Do pensioners pay income tax?",
        answer:
          "Often yes, depending on total taxable income. Older taxpayers may qualify for higher age rebates, which can reduce tax payable. Living annuity and other retirement income can still be taxable.",
      },
      {
        question: "How are living annuity withdrawals taxed?",
        answer:
          "Living annuity income is generally taxed as income at your marginal rates. Use the Living Annuity Income & Sustainability Calculator (Asset 014) alongside this tool when planning retirement income.",
      },
      {
        question: "What tax year does this calculator use?",
        answer:
          "It uses the latest SARS individual tax tables built into the tool—currently the 2026/27 tax year. When SARS updates tables, the calculator tables are updated so the page stays current.",
      },
      {
        question: "How often are SARS tax tables updated?",
        answer:
          "SARS tax tables are typically reviewed annually with the national Budget. Always confirm the current year if you need an official assessment.",
      },
      {
        question: "Are these the official SARS rates?",
        answer:
          "The tool implements the illustrative latest tables available in this calculator. Legislation may change. Verify with SARS or your tax practitioner for filing.",
      },
      {
        question: "Can I use this for my tax return?",
        answer:
          "No. It is an educational estimate only. File via SARS eFiling or your tax practitioner for an official assessment.",
      },
    ],
    categoryLabel: "Tax & Retirement",
    categoryHref: "/calculators",
  },

  "asset-007-estate-duty": {
    shortTitle: "Estate Duty Calculator",
    seoTitle: "Estate Duty Calculator South Africa",
    seoDescription:
      "Estate Cost & Liquidity Calculator for South Africa. Estimate estate duty, executor's fees and whether your family will have enough cash to wind up your estate. Free educational tool. FSP 17273.",
    keywords: [
      "Estate Duty Calculator",
      "estate duty calculator South Africa",
      "estate liquidity calculator",
      "executor fees calculator",
      "estate planning calculator",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 007",
    heroTitle: "Will your family have enough cash to wind up your estate?",
    heroSubtitle:
      "Many South African estates are asset-rich but cash-poor. Estimate your estate duty, executor's fees and the cash your estate may need after your death. Discover whether your family could face a liquidity shortfall that may force the sale of assets or delay the administration of your estate.",
    heroImage: "/images/calc-lcp/asset-007.webp",
    heroImageAlt: "Family member facing estate duty, keys, and executor cost decisions",
    calculatorLead:
      "Enter your gross estate, liabilities, spouse bequests and immediately available liquidity. The primary insight is your Estimated Estate Liquidity Gap—not estate duty alone.",
    sidePanelTitle: "Estate Cost & Liquidity Calculator",
    sidePanelParagraphs: [
      "Clients rarely lose sleep over estate duty percentages. They worry whether children will have enough cash, whether the house must be sold, and whether the estate becomes a burden.",
      "This flagship Toolkit calculator estimates duty and executor costs, then compares them with available liquidity so you can see the cash shortfall risk clearly.",
    ],
    sidePanelBullets: [
      "Liquidity gap as the primary result",
      "R3.5m Section 4A abatement",
      "20% / 25% estate duty bands",
      "Executor's fees at 3.5% plus VAT shown separately",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Estate planning requires qualified legal and tax advice alongside financial planning. All figures are estimates.",
    ],
    howToSteps: [
      { title: "Enter estate values", description: "Gross estate, liabilities and bequests to a surviving spouse." },
      { title: "Add available liquidity", description: "Cash, money market, immediate-access savings, life cover payable to the estate and other liquid amounts." },
      { title: "Review the liquidity gap", description: "See whether estimated estate costs exceed available cash." },
      { title: "Plan the next step", description: "Use Estate Reduction, Reality Check and a Retirement Gap Review to close gaps." },
    ],
    heroCta: {
      primaryLabel: "Estimate My Estate Liquidity Gap",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Explore the Retirement Gap Toolkit™",
      secondaryHref: "/calculators",
    },
    contextBox: {
      heading: "Will my family have enough cash?",
      paragraphs: [
        "This is the conversation very few advisers have well. Property, businesses and portfolios can look impressive on paper—yet estates still struggle when cash is short.",
        "Asset 007 is a flagship Retirement Gap Toolkit™ calculator because it exposes a hidden problem most families only discover too late.",
      ],
      highlightQuestion:
        "Will my family have enough cash to settle my estate without being forced to sell assets?",
    },
    audienceGuide: {
      heading: "Who should use this calculator?",
      intro: "Especially useful if you own property, run a business, hold investments, or want to protect your family from forced sales and administration delays.",
      items: [
        "Parents concerned about estate cash for children",
        "Homeowners and business owners",
        "Anyone with life cover payable to the estate",
        "Families reviewing wills and executor appointments",
        "People comparing estate duty with real liquidity risk",
      ],
    },
    assumptionCallout: {
      heading: "Calculator assumptions",
      paragraphs: [
        "Calculations use the current South African estate duty framework illustrated in this tool: Section 4A abatement of R3.5 million, estate duty at 20% on dutiable estate up to R30 million and 25% thereafter, and executor's remuneration at 3.5% of gross estate plus 15% VAT.",
        "Results are estimates only. Master's fees, conveyancing, valuations, CGT, income tax in the estate and other costs are not fully modelled.",
        "Confirm all figures during professional legal, tax and financial planning. This is not legal advice.",
      ],
    },
    resultGuide: {
      heading: "How to read your estate results",
      intro:
        "The headline number is your Estimated Estate Liquidity Gap. Estate duty still matters—but cash shortfall is what forces asset sales and delays. The calculator also walks through gross estate, liabilities, abatement, dutiable estate, duty, executor's fees (with VAT shown separately), total costs, available liquidity and what may remain for beneficiaries.",
      metricsListed: [
        "Estimated Estate Liquidity Gap (primary)",
        "Gross Estate",
        "Less Liabilities",
        "Net Estate Before Abatement",
        "Abatement Applied",
        "Dutiable Estate",
        "Estimated Estate Duty",
        "Estimated Executor's Fees (before VAT and incl. VAT)",
        "Total Estimated Estate Costs",
        "Available Estate Liquidity",
        "Estimated Estate Available for Beneficiaries",
      ],
      highlightMetrics: [
        {
          label: "Total estate costs",
          description:
            "Estate duty plus executor's fees including VAT. This is the cash demand the estate may need to settle early in administration.",
        },
        {
          label: "Available estate liquidity vs liquidity gap",
          description:
            "Liquidity is what can pay costs quickly. The gap is what may still be missing—and why property or investments might need to be sold.",
        },
      ],
      footer:
        "If the gap is material, review life cover ownership, cash reserves and estate reduction strategies before your family has to make decisions under pressure.",
    },
    methodSection: {
      heading: "Why estate liquidity matters",
      paragraphs: [
        "Many South African families inherit valuable assets such as property, businesses or investment portfolios. However, those assets cannot always be converted into cash quickly.",
        "Without sufficient liquidity, estates may need to sell assets at an unfavourable time simply to pay estate costs. Good estate planning therefore focuses on both reducing unnecessary costs and ensuring sufficient liquidity.",
        "Connect this insight to the Retirement Gap Toolkit™, Income Tax planning, Estate Reduction strategies and the Retirement Gap Method™ so legacy planning is not left as an afterthought.",
      ],
      bullets: [
        "Reduce unnecessary estate costs where appropriate",
        "Ensure enough cash and life cover liquidity",
        "Coordinate wills, trusts and beneficiary nominations",
        "Review regularly as assets and family needs change",
      ],
      ctaLabel: "Open the Estate Reduction Calculator",
      ctaHref: calculatorPagePath("asset-008-estate-reduction"),
      secondaryCtaLabel: "Learn the Retirement Gap Method™",
      secondaryCtaHref: "/retirement-gap-method",
    },
    assessmentSection: {
      heading: "Want help closing an estate liquidity gap?",
      intro:
        "A Retirement Gap Review can help you test whether life cover, cash reserves, wills and donation strategies are enough to protect your family from forced sales and administration delays.",
      bullets: [
        "Current estate cost and liquidity estimate",
        "Life cover payable to the estate vs beneficiaries",
        "Wills, spouses and abatement planning",
        "Links to retirement and legacy goals",
      ],
      ctaLabel: "Book a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_007",
    },
    journey: {
      heading: "Continue Your Retirement Gap Journey",
      items: [
        {
          stepLabel: "Toolkit",
          assetCode: "ASSET 000",
          title: "Retirement Gap Toolkit™",
          description: "Return to the full calculator hub.",
          href: "/calculators",
        },
        {
          stepLabel: "Related",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "See how retirement capital and estate thinking connect.",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Related",
          assetCode: "ASSET 006",
          title: "Income Tax Calculator",
          description: "Understand lifetime tax alongside estate costs.",
          href: calculatorPagePath("asset-006-income-tax"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 008",
          title: "Estate Reduction Strategy Calculator",
          description: "Explore structured giving that may reduce dutiable estate.",
          href: calculatorPagePath("asset-008-estate-reduction"),
        },
        {
          stepLabel: "Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "Connect estate liquidity to the full Method.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "Protect your family from a cash-poor estate.",
      body: "If this calculator raises concern, do not wait until administration begins. Book a Retirement Gap Review to discuss liquidity, life cover and legacy planning within the Retirement Gap Method™.",
      primaryLabel: "Book a Retirement Gap Review",
      primaryHref: "/contact?source=retirement_gap_review_asset_007",
      secondaryLabel: "Continue with the Retirement Gap Method™",
      secondaryHref: "/retirement-gap-method",
    },
    readingSections: [
      {
        heading: "What this means for your family",
        paragraphs: [
          "Your estate may require substantial cash for estate duty and executor's fees even when the family balance sheet looks strong. If sufficient cash is unavailable, assets such as property or investments may need to be sold, or beneficiaries could experience delays while the estate is administered.",
          "Many South African estates are asset-rich but cash-poor. Planning for estate liquidity is often just as important as reducing estate duty. Explore the Retirement Gap Toolkit™, compare scenarios in the Estate Reduction Calculator, and use a Retirement Gap Review when you want personalised guidance.",
        ],
      },
      {
        heading: "Estate costs inside the Retirement Gap Method™",
        paragraphs: [
          "Asset 007 answers a practical family question first, then leads into broader retirement and legacy planning. Pair it with the Retirement Reality Check for overall readiness, the Income Tax Calculator for lifetime tax context, and the Estate Reduction Strategy Calculator for possible cost-reduction levers.",
          "The Retirement Gap Method™ brings these tools into one educational framework so estate planning is not treated as a standalone tax exercise.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "What is estate duty?",
        answer:
          "Estate duty is a tax that may apply to the dutiable value of a deceased estate above the available abatement, at rates illustrated in this calculator (currently 20% and 25% bands).",
      },
      {
        question: "What assets form part of my estate?",
        answer:
          "Typically property, investments, business interests, cash and other assets owned at death, subject to exclusions and structuring. Ownership and beneficiary nominations matter—confirm with a legal adviser.",
      },
      {
        question: "How much is the estate duty abatement?",
        answer:
          "This tool uses the Section 4A abatement of R3.5 million. Confirm current legislation with your estate planner because rules can change.",
      },
      {
        question: "What happens if my spouse dies first?",
        answer:
          "Spousal planning, bequests and abatement usage can change the duty and liquidity picture for the surviving spouse's later estate. Model both scenarios and take advice.",
      },
      {
        question: "How are trusts treated for estate planning?",
        answer:
          "Trusts can form part of broader estate and legacy planning, but treatment depends on structure, funding and law. This calculator does not model trusts in detail—seek professional advice.",
      },
      {
        question: "What are executor's fees?",
        answer:
          "Executor's remuneration is commonly illustrated at 3.5% of the gross estate plus VAT. This calculator shows the fee before VAT and VAT as separate line items before total costs.",
      },
      {
        question: "Does life insurance form part of my estate?",
        answer:
          "It depends on ownership and who the policy is payable to. Cover payable to the estate can increase liquidity available to pay estate costs; cover payable to nominated beneficiaries may sit outside the estate. Structure carefully with advice.",
      },
      {
        question: "How long does it take to wind up an estate?",
        answer:
          "Timing varies widely based on complexity, documentation, Master's Office processes and whether assets must be sold. Liquidity shortfalls often lengthen delays.",
      },
      {
        question: "What is an estate liquidity gap?",
        answer:
          "It is the estimated shortfall between total estate costs (such as duty and executor's fees) and immediately available cash or liquid assets. A gap raises the risk of forced sales or delayed administration.",
      },
      {
        question: "Is this legal advice?",
        answer:
          "No. All calculations are educational estimates. Confirm figures during professional legal, tax and financial planning with qualified advisers, including FSP 17273 where financial advice is required.",
      },
    ],
    categoryLabel: "Estate Cost & Liquidity",
    categoryHref: "/estate-planning",
  },

  "asset-008-estate-reduction": {
    shortTitle: "Estate Reduction Strategy Calculator",
    seoTitle: "Estate Reduction Calculator | Annual Donations South Africa",
    seoDescription:
      "Legacy planning calculator: see how planned lifetime wealth transfers may change your future estate, estate costs and what your family receives. Educational SA tool. FSP 17273.",
    keywords: [
      "estate reduction calculator",
      "donation tax calculator South Africa",
      "annual donation limit",
      "legacy planning calculator",
      "estate planning during lifetime",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 008",
    heroTitle: "Could your family benefit more from their inheritance while you're still alive?",
    heroSubtitle:
      "Most estate planning happens too late. By gradually reducing the size of your estate during your lifetime, you may improve estate liquidity, reduce future estate costs and help your family when they need it most. This calculator estimates how planned wealth transfers could affect your future estate and the value ultimately passed to your beneficiaries.",
    heroImage: "/images/calc-lcp/asset-008.webp",
    heroImageAlt: "Grandfather gifting to family — planned giving to reduce estate later",
    calculatorLead:
      "Enter an illustrative estate value, annual transfer band, ages and growth rate. The projection compares estate value without planning versus with planned reductions—then estimates duty saved, executor's fee reduction and additional wealth that may reach beneficiaries.",
    sidePanelTitle: "Legacy planning during life",
    sidePanelParagraphs: [
      "This is the legacy planning calculator in the Retirement Gap Toolkit™. It completes the educational journey from retirement readiness and tax to estate duty—and then asks what you can still influence while you are alive.",
      "Use it after the Estate Duty Calculator to explore timing. It does not recommend gifts or transfers; it shows how timing can change long-term outcomes.",
    ],
    sidePanelBullets: [
      "Side-by-side estate projection",
      "Duty and executor fee differences",
      "Additional wealth to beneficiaries highlighted",
      "Educational illustration only",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Donation and trust strategies must be documented and tax-compliant. Confirm SARS limits and structure with qualified legal and tax advisers.",
    ],
    howToSteps: [
      { title: "Set an estate starting point", description: "Enter an illustrative current estate value for the projection." },
      { title: "Choose a transfer illustration", description: "Select a single-person or couple annual band used for education." },
      { title: "Set the time horizon", description: "Current age, planned age and an assumed growth rate." },
      { title: "Read the legacy insight", description: "Compare with vs without planning, then continue into the Method." },
    ],
    heroCta: {
      primaryLabel: "Run My Estate Planning Projection",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Estimate current estate costs first",
      secondaryHref: calculatorPagePath("asset-007-estate-duty"),
    },
    contextBox: {
      heading: "Legacy planning begins during life, not at death",
      paragraphs: [
        "Retirement asks whether you will have enough. Tax asks how much SARS may receive. Estate duty asks what happens when you die. This calculator asks what you can still do while you are alive to improve the outcome for your family.",
        "Estimate what your estate could currently owe with the Estate Duty Calculator, then return here to explore timing—always within professional advice.",
      ],
      highlightQuestion:
        "How could thoughtful estate planning during my lifetime improve the financial legacy I leave to my family?",
    },
    audienceGuide: {
      heading: "Who should explore this calculator?",
      intro: "Useful if you want to understand lifetime planning concepts before speaking to advisers about family wealth, liquidity or succession.",
      items: [
        "Parents wanting to assist children earlier in life",
        "Families concerned about estate liquidity and delays",
        "People comparing estate duty with legacy timing",
        "Business owners thinking about succession",
        "Anyone reviewing wills, trusts and beneficiary nominations",
      ],
    },
    assumptionCallout: {
      heading: "Before you calculate",
      paragraphs: [
        "This tool does not recommend making gifts or transferring assets. Its purpose is to demonstrate how timing can influence long-term estate outcomes.",
        "Tax parameters (abatement, duty bands, executor fee and VAT) are centralised in the calculator so they can be updated when legislation changes. Confirm current SARS and fiduciary rules before acting.",
        "Every solution depends on individual legal, tax and financial circumstances.",
      ],
    },
    resultGuide: {
      heading: "Your Estate Planning Projection",
      intro:
        "After you calculate, read the side-by-side estate values first, then the estimated estate duty saved, executor's fee reduction and the highlighted additional wealth that may reach beneficiaries. The Legacy Planning Insight inside the tool explains what changed, why it changed, which assumptions created the difference, and why regular reviews matter.",
      metricsListed: [
        "Estate Value Without Planning",
        "Estate Value With Planned Reductions",
        "Estimated Estate Duty Saved",
        "Estimated Executor's Fee Reduction",
        "Estimated Additional Wealth Passed to Beneficiaries",
      ],
      highlightMetrics: [
        {
          label: "Focus on legacy, not only tax",
          description:
            "Duty savings matter, but the educational goal is whether more value may reach your family—with better timing and potentially less administration friction.",
        },
        {
          label: "Pair with estate liquidity",
          description:
            "Reducing estate size can help, yet families still need cash to wind up an estate. Revisit the Estate Duty & Liquidity Calculator alongside any timing discussion.",
        },
      ],
      footer:
        "Assumptions and disclaimers appear directly under the calculator results. Treat every figure as an estimate for education—not a recommendation to gift or restructure.",
    },
    withdrawalGuide: {
      heading: "Estate reduction concepts to understand",
      intro:
        "These ideas are educational only. This page does not recommend any strategy. Suitability depends on your legal, tax and financial circumstances.",
      levels: [
        {
          label: "Annual tax exemptions",
          description:
            "South African donations tax rules include annual exemption bands that advisers often use in illustrations. Limits and eligibility must be confirmed for your situation.",
        },
        {
          label: "Lifetime donations",
          description:
            "Transfers during life may assist family earlier and change the size of a future estate. They also create legal, tax and liquidity consequences that need advice.",
        },
        {
          label: "Trust planning (where appropriate)",
          description:
            "Trusts can form part of broader legacy planning for some families. Structure, funding and tax treatment vary widely and require specialist advice.",
        },
        {
          label: "Life insurance for estate liquidity",
          description:
            "Cover payable in the right way can help families settle estate costs without forced sales. Ownership and beneficiary design matter.",
        },
        {
          label: "Ownership structures",
          description:
            "How assets are owned—individually, jointly, via companies or other vehicles—affects what falls into an estate and how easily value can be transferred.",
        },
        {
          label: "Business succession planning",
          description:
            "Business interests often need a written succession path so value and control do not freeze when an owner dies.",
        },
        {
          label: "Reviewing beneficiary nominations",
          description:
            "Retirement funds and policies may pay according to nominations rather than a will. Out-of-date nominations can undo careful planning.",
        },
        {
          label: "Keeping your Will current",
          description:
            "A current will supports clearer administration. It should align with ownership, nominations and liquidity planning.",
        },
        {
          label: "Regular estate reviews",
          description:
            "Asset values, family needs, legislation and retirement income all change. Reviews keep legacy planning connected to the Retirement Gap Method™.",
        },
      ],
      closing:
        "Understand how taxation affects lifetime wealth with the Income Tax Calculator, how retirement assets are treated with the Living Annuity Income & Sustainability Calculator, and how the pieces fit in the Retirement Gap Method™.",
    },
    methodSection: {
      heading: "Giving while you can see the difference",
      paragraphs: [
        "Many people assume wealth should only transfer after death. In reality, appropriate lifetime planning may allow families to assist children earlier in life, improve estate liquidity, reduce administration delays, simplify the eventual estate and create intergenerational wealth.",
        "This calculator does not recommend making gifts or transferring assets. Its purpose is to demonstrate how timing can influence long-term estate outcomes—then point you toward professional advice inside the Retirement Gap Method™.",
      ],
      bullets: [
        "Assist family when support may matter most",
        "Improve liquidity and reduce administration friction",
        "Coordinate with wills, trusts and nominations",
        "Review regularly as life and law change",
      ],
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
      secondaryCtaLabel: "Book a Retirement Gap Review",
      secondaryCtaHref: "/contact?source=retirement_gap_review_asset_008",
    },
    assessmentSection: {
      heading: "Ready for a personalised legacy discussion?",
      intro:
        "If this projection raises questions about trusts, donations, estate liquidity or succession, a Retirement Gap Review can help you explore options without treating any calculator output as advice.",
      bullets: [
        "Current estate cost and liquidity picture",
        "Lifetime versus death-timed transfers",
        "Retirement assets and living annuity treatment",
        "Family goals and review cadence",
      ],
      ctaLabel: "Book a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_008",
    },
    journey: {
      heading: "Continue Your Retirement Gap Journey",
      items: [
        {
          stepLabel: "Estimate",
          assetCode: "ASSET 007",
          title: "Estate Duty Calculator",
          description: "Estimate what your estate could currently owe.",
          href: calculatorPagePath("asset-007-estate-duty"),
        },
        {
          stepLabel: "Related",
          assetCode: "ASSET 006",
          title: "Income Tax Calculator",
          description: "Understand how taxation affects lifetime wealth.",
          href: calculatorPagePath("asset-006-income-tax"),
        },
        {
          stepLabel: "Related",
          assetCode: "ASSET 014",
          title: "Living Annuity Income & Sustainability Calculator",
          description: "See how retirement assets are treated differently for estate planning.",
          href: calculatorPagePath("asset-014-living-annuity"),
        },
        {
          stepLabel: "Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "Understand how retirement, tax and estate planning work together.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "Building wealth is only one part of financial freedom.",
      body: "Deciding how that wealth will support your retirement, your family and your legacy is equally important. The Retirement Gap Method™ brings retirement planning, taxation and estate planning together into one complete financial framework.",
      primaryLabel: "Learn the Retirement Gap Method™",
      primaryHref: "/retirement-gap-method",
      secondaryLabel: "Book a Retirement Gap Review",
      secondaryHref: "/contact?source=retirement_gap_review_asset_008",
    },
    readingSections: [
      {
        heading: "From estate duty to legacy timing",
        paragraphs: [
          "Start with a clear picture of estate costs and liquidity using the Estate Duty Calculator—estimate what your estate could currently owe. Then use this page to explore whether lifetime timing could change what your family receives.",
          "Understand how taxation affects lifetime wealth with the Income Tax Calculator, and see how retirement assets are treated differently for estate planning with the Living Annuity Income & Sustainability Calculator. The Retirement Gap Method™ connects retirement, tax and estate planning into one framework.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "What are the annual donation limits?",
        answer:
          "This tool illustrates commonly discussed annual bands for education (currently R100,000 for a single-person illustration and R200,000 for a couple illustration). Confirm current SARS donations tax exemptions and limits with your practitioner before acting.",
      },
      {
        question: "Should I donate without advice?",
        answer:
          "No. This calculator does not recommend gifts or transfers. Donation and trust strategies must be documented and tax-compliant. Confirm structure with qualified legal, tax and financial advisers.",
      },
      {
        question: "Why would someone reduce their estate while they are still alive?",
        answer:
          "Some people choose to transfer wealth during their lifetime to assist family members when support may matter most, improve estate liquidity, reduce future estate costs or simplify future estate administration. Whether that is appropriate depends entirely on personal circumstances and advice.",
      },
      {
        question: "Does this calculator consider inflation?",
        answer:
          "You can reflect inflation thinking through the growth-rate assumption (for example by using a lower real rate). Future inflation, investment returns and legislation cannot be predicted, so treat every projection as illustrative only.",
      },
      {
        question: "Does this replace the Estate Duty Calculator?",
        answer:
          "No. Asset 007 estimates current estate costs and liquidity risk. Asset 008 explores how planned lifetime reductions might change future outcomes. Use them together.",
      },
      {
        question: "Is this legal or tax advice?",
        answer:
          "No. All figures are educational estimates. Confirm legislation, exemptions and structuring during professional legal, tax and financial planning.",
      },
    ],
    categoryLabel: "Legacy Planning",
    categoryHref: "/estate-planning",
  },

  "asset-009-everest-142-income": {
    shortTitle: "14.2% Retirement Income Calculator",
    seoTitle: "14.2% Retirement Income Calculator South Africa | After-Tax Monthly Income",
    seoDescription:
      "Estimate how much retirement income a 14.2% distribution investment could produce after dividend withholding tax. Educational Retirement Gap Toolkit calculator. FSP 17273.",
    keywords: [
      "14.2% income calculator",
      "retirement income calculator South Africa",
      "dividend withholding tax income",
      "Everest 14.2 calculator",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 009",
    heroTitle: "How much retirement income could your investment produce?",
    heroSubtitle:
      "Retirement isn't funded by percentages—it is funded by reliable income. Use this calculator to estimate the monthly and annual income a 14.2% distribution investment could generate, understand the impact of dividend withholding tax, and see how much income may actually be available to support your retirement.",
    heroImage: "/images/calc-lcp/asset-009.webp",
    heroImageAlt: "Retiree enjoying day-one monthly income lifestyle on a veranda",
    calculatorLead:
      "Enter your investment amount (R100,000 minimum for this illustration). Monthly income after tax is the focal result. Distribution rate and dividend withholding tax are adjustable so assumptions stay easy to update.",
    sidePanelTitle: "Income outcome, not just a percentage",
    sidePanelParagraphs: [
      "This calculator sits later in the Retirement Gap journey. Choose an income solution after you understand the retirement problem—Reality Check, Premium and Life of Capital come first.",
      "A 14.2% distribution is one possible solution inside a diversified plan. Compare it with the 12.8% income illustration and the Income Comparison Calculator before making decisions.",
    ],
    sidePanelBullets: [
      "Monthly after-tax income prioritised",
      "Gross vs net yields shown clearly",
      "DWT and distribution rate configurable",
      "Educational illustration only",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Voluntary income investments may be illiquid. Suitability review with FSP 17273 is required before investing.",
    ],
    howToSteps: [
      { title: "Enter investment amount", description: "Use at least R100,000 for this educational illustration." },
      { title: "Confirm rate and tax", description: "Adjust the targeted distribution and dividend withholding tax if needed." },
      { title: "Read monthly income first", description: "Focus on after-tax monthly income—the practical retirement question." },
      { title: "Continue the Method", description: "Compare with 12.8% income and review liquidity, risk and sustainability." },
    ],
    heroCta: {
      primaryLabel: "Calculate My Retirement Income",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Start with the Reality Check",
      secondaryHref: calculatorPagePath("asset-002-retirement-reality-check"),
    },
    contextBox: {
      heading: "Percentages do not fund retirement. Income does.",
      paragraphs: [
        "Asset 009 answers a practical question: if I invested this amount, how much retirement income could I realistically receive after tax?",
        "It also reinforces that investment income is only one part of a complete retirement strategy inside the Retirement Gap Toolkit™ and Retirement Gap Method™.",
      ],
      highlightQuestion: "How much money could I receive every month after tax?",
    },
    methodProgress: {
      heading: "Where this sits in the Retirement Gap journey",
      steps: [
        {
          stepLabel: "Earlier",
          title: "Retirement Reality Check",
          description: "Asset 002 — Understand the retirement problem first",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
          completed: true,
        },
        {
          stepLabel: "Earlier",
          title: "Retirement Premium Calculator",
          description: "Asset 003 — How much may you need to save?",
          href: calculatorPagePath("asset-003-retirement-premium"),
          completed: true,
        },
        {
          stepLabel: "Earlier",
          title: "Life of Capital Calculator",
          description: "Asset 004 — Will income last?",
          href: calculatorPagePath("asset-004-life-of-capital"),
          completed: true,
        },
        {
          stepLabel: "Compare",
          title: "12.8% Income Calculator",
          description: "Asset 010 — Another income illustration",
          href: calculatorPagePath("asset-010-everest-128-income"),
        },
        {
          stepLabel: "You are here",
          title: "14.2% Income Calculator",
          description: "Asset 009 — Estimate after-tax monthly income",
          current: true,
        },
        {
          stepLabel: "Next",
          title: "Income Comparison Calculator",
          description: "Asset 011 — Compare income solutions side by side",
          href: calculatorPagePath("asset-011-everest-128-vs-142"),
        },
      ],
    },
    assumptionCallout: {
      heading: "Understanding liquidity",
      paragraphs: [
        "Liquidity means how quickly you can access your capital when you need it. In retirement, unexpected expenses, healthcare costs and changing plans make access important—even when income is the main goal.",
        "Higher-income investments may offer attractive distributions while having different liquidity characteristics than cash or listed unit trusts. That trade-off between income and access to capital should be understood before investing.",
        "This illustration currently reflects liquidity after approximately 120 days, subject to the applicable product terms and conditions. Early exit may attract penalties where product rules apply. Confirm the latest terms during advice.",
      ],
    },
    resultGuide: {
      heading: "Retirement Planning Insight",
      intro:
        "Do not stop at the monthly figure. Ask whether this income could cover your expected retirement expenses, whether relying on a single investment is appropriate, what happens if distributions reduce, whether your plan needs income growth as inflation rises, and whether combining multiple income sources would improve sustainability.",
      metricsListed: [
        "Monthly Income After Tax (primary)",
        "Annual Income After Tax",
        "Gross Monthly Income",
        "Gross Annual Income",
        "Dividend Withholding Tax",
        "Effective Net Yield",
      ],
      highlightMetrics: [
        {
          label: "Think in rand income",
          description:
            "A percentage is only a means to an end. The Retirement Gap Method™ starts with the income you need, then tests whether any solution can support it sustainably.",
        },
        {
          label: "Tax-aware income matters",
          description:
            "Dividend withholding tax reduces what you take home. Pair this tool with the Income Tax Calculator when comparing different income structures.",
        },
      ],
      footer:
        "Use Life of Capital to stress-test longevity, then compare 12.8% and 14.2% illustrations before booking a Retirement Gap Review.",
    },
    withdrawalGuide: {
      heading: "Investment risks",
      intro:
        "Separate from calculator assumptions, keep these risks in view whenever you consider a distribution investment as part of retirement income.",
      levels: [
        {
          label: "Distributions are not guaranteed",
          description: "Targeted rates can change. Future income may increase or decrease depending on product performance and terms.",
        },
        {
          label: "Capital values may fluctuate",
          description: "The value of invested capital is not assured. Treat illustrations as educational, not promises of capital protection.",
        },
        {
          label: "Future income may rise or fall",
          description: "Retirement plans that assume a fixed rand income forever can fail when distributions or inflation move against you.",
        },
        {
          label: "Diversification remains important",
          description: "Relying on one income investment concentrates risk. Multiple sources may improve sustainability.",
        },
        {
          label: "Part of an overall strategy",
          description:
            "Investments should form part of an overall retirement strategy rather than being viewed in isolation inside the Retirement Gap Toolkit™.",
        },
      ],
      closing:
        "Compare alternatives with the 12.8% Income Calculator and Income Comparison Calculator, then return to the Retirement Gap Method™ for the full framework.",
    },
    methodSection: {
      heading: "Choosing income after understanding the problem",
      paragraphs: [
        "A successful retirement is not built by chasing the highest percentage. It is built by creating sustainable, tax-aware income that can support your lifestyle over the long term.",
        "Understanding how investment income fits into your overall Retirement Gap is the next step—after Reality Check, Premium and Life of Capital have framed the need.",
      ],
      bullets: [
        "Measure the Retirement Gap first",
        "Estimate after-tax income second",
        "Compare income solutions third",
        "Review liquidity, tax and risk before committing",
      ],
      ctaLabel: "Compare 12.8% vs 14.2% income",
      ctaHref: calculatorPagePath("asset-011-everest-128-vs-142"),
      secondaryCtaLabel: "Open the 12.8% Income Calculator",
      secondaryCtaHref: calculatorPagePath("asset-010-everest-128-income"),
    },
    assessmentSection: {
      heading: "Want help fitting income into your Retirement Gap?",
      intro:
        "A Retirement Gap Review can help you test whether this after-tax income, combined with other sources, is realistic for your lifestyle, tax position and liquidity needs.",
      bullets: [
        "Required retirement income vs illustrated income",
        "Tax, DWT and net yield implications",
        "Liquidity and diversification",
        "Next steps inside the Retirement Gap Method™",
      ],
      ctaLabel: "Book a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_009",
    },
    journey: {
      heading: "Continue Your Retirement Gap Journey",
      items: [
        {
          stepLabel: "Toolkit",
          assetCode: "ASSET 000",
          title: "Retirement Gap Toolkit™",
          description: "Return to the full calculator hub.",
          href: "/calculators",
        },
        {
          stepLabel: "Earlier",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Understand the retirement problem first.",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Earlier",
          assetCode: "ASSET 003",
          title: "Retirement Premium Calculator",
          description: "Estimate the saving required to close the gap.",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          stepLabel: "Earlier",
          assetCode: "ASSET 004",
          title: "Life of Capital Calculator",
          description: "Test whether retirement income may last.",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Related",
          assetCode: "ASSET 006",
          title: "Income Tax Calculator",
          description: "See how taxation affects lifetime wealth and income.",
          href: calculatorPagePath("asset-006-income-tax"),
        },
        {
          stepLabel: "Compare",
          assetCode: "ASSET 010",
          title: "12.8% Income Calculator",
          description: "Estimate income from the alternative illustration.",
          href: calculatorPagePath("asset-010-everest-128-income"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 011",
          title: "Income Comparison Calculator",
          description: "Compare income solutions side by side.",
          href: calculatorPagePath("asset-011-everest-128-vs-142"),
        },
        {
          stepLabel: "Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "Connect income to the complete framework.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "A successful retirement is not built by chasing the highest percentage.",
      body: "It is built by creating sustainable, tax-aware income that can support your lifestyle over the long term. Understanding how investment income fits into your overall Retirement Gap is the next step.",
      primaryLabel: "Learn the Retirement Gap Method™",
      primaryHref: "/retirement-gap-method",
      secondaryLabel: "Book a Retirement Gap Review",
      secondaryHref: "/contact?source=retirement_gap_review_asset_009",
    },
    readingSections: [
      {
        heading: "Income inside the Retirement Gap Method™",
        paragraphs: [
          "Start with the Retirement Reality Check and Retirement Premium Calculator to understand need and contribution. Use Life of Capital to test longevity. Only then compare income illustrations such as this 14.2% page, the 12.8% Income Calculator and the Income Comparison Calculator.",
          "Return to the Retirement Gap Toolkit™ and Retirement Gap Method™ so any income solution stays connected to tax, liquidity and long-term sustainability—not a standalone product decision.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "Is a higher distribution always better?",
        answer:
          "Not necessarily. A higher targeted rate may come with different liquidity, risk or opportunity-cost trade-offs. Sustainable after-tax income that fits your Retirement Gap matters more than the headline percentage.",
      },
      {
        question: "How does dividend withholding tax affect my retirement income?",
        answer:
          "Dividend withholding tax reduces gross distributions before you receive income. This calculator shows both gross and after-tax figures so you can plan with net income in mind.",
      },
      {
        question: "Why is liquidity important in retirement?",
        answer:
          "Retirees often need access to capital for unexpected costs. Investments that pay attractive income may still restrict withdrawals. Understand notice periods and penalties before committing.",
      },
      {
        question: "Should I invest all my retirement savings in one income investment?",
        answer:
          "Usually no. Diversification remains important. This page treats the illustration as one possible income source within a broader retirement strategy.",
      },
      {
        question: "How does inflation affect retirement income over time?",
        answer:
          "Rising living costs can erode fixed income. Ask whether your plan needs income growth and use Future Value and Life of Capital tools to explore purchasing-power and longevity pressure.",
      },
      {
        question: "How does this compare with other retirement income options?",
        answer:
          "Use the 12.8% Income Calculator and Income Comparison Calculator for side-by-side illustrations, then discuss living annuities and other structures in a Retirement Gap Review.",
      },
      {
        question: "Can the distribution rate change?",
        answer:
          "Yes. Targeted distributions are not guarantees. Future income may increase or decrease. Stress-test lower rates in the calculator fields.",
      },
      {
        question: "Is this calculator financial advice?",
        answer:
          "No. It is an educational illustration only. Personalised advice requires a suitability process with an authorised adviser (FSP 17273).",
      },
      {
        question: "Is 14.2% guaranteed?",
        answer:
          "No. It is a targeted return profile subject to issuer performance, product terms and risk. Confirm current terms before investing.",
      },
      {
        question: "Can I withdraw early?",
        answer:
          "Voluntary products may be illiquid. This illustration currently reflects access after approximately 120 days subject to product terms, with possible early-exit penalties. Confirm the latest rules during advice.",
      },
    ],
    categoryLabel: "Retirement Income",
    categoryHref: "/calculators",
  },

  "asset-010-everest-128-income": {
    shortTitle: "12.8% Retirement Income Calculator",
    seoTitle: "12.8% Retirement Income Calculator | Income Today vs Long-Term Value",
    seoDescription:
      "Would you accept slightly lower retirement income today for potentially greater long-term value? Estimate 12.8% distribution income and five-year loyalty bonus trade-offs. Educational Toolkit tool. FSP 17273.",
    keywords: [
      "12.8% income calculator",
      "retirement income trade-off",
      "loyalty bonus calculator",
      "Everest 12.8 calculator",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 010",
    heroTitle: "Would you accept slightly lower income today for potentially greater long-term value?",
    heroSubtitle:
      "Not every retirement income investment is designed to maximise today's income. Some investors choose a slightly lower annual distribution in exchange for additional long-term benefits. This calculator estimates your monthly income from a 12.8% distribution and illustrates how a loyalty bonus after five years may affect your overall return.",
    heroImage: "/images/calc-lcp/asset-010.webp",
    heroImageAlt: "Couple walking an estate path — patient income with long-term reward",
    calculatorLead:
      "Enter investment amount and period. Monthly after-tax income is prioritised. The loyalty bonus is included only when your selected period is five years or longer.",
    sidePanelTitle: "A retirement decision, not a product pitch",
    sidePanelParagraphs: [
      "Asset 009 asks whether you want the highest income available today. This page asks whether you are prepared to accept lower income today for potential long-term value. Asset 011 helps you compare both objectively.",
      "Use this illustration after you understand your Retirement Gap—not as a standalone product page.",
    ],
    sidePanelBullets: [
      "Income today vs long-term value trade-off",
      "Bonus included only at 5+ years",
      "Tax-aware monthly income focus",
      "Educational illustration only",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Voluntary income investments may be illiquid. Suitability review with FSP 17273 is required before investing.",
    ],
    howToSteps: [
      { title: "Enter capital and period", description: "Use at least R100,000 and set how many years you may stay invested." },
      { title: "Confirm rate, tax and bonus", description: "Adjust assumptions if you want to stress-test the trade-off." },
      { title: "Read the Retirement Insight", description: "See whether the loyalty bonus is included for your period." },
      { title: "Compare strategies", description: "Open the 14.2% calculator or the Income Comparison tool next." },
    ],
    heroCta: {
      primaryLabel: "Calculate My Income Trade-off",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Compare higher immediate income",
      secondaryHref: calculatorPagePath("asset-009-everest-142-income"),
    },
    contextBox: {
      heading: "Higher income today is not always the better retirement outcome",
      paragraphs: [
        "Some retirees prioritise higher immediate income. Others prioritise higher long-term value, greater certainty over a holding period, or different liquidity needs.",
        "This calculator helps illustrate one possible trade-off inside the Retirement Gap Toolkit™—then points you to compare both strategies objectively.",
      ],
      highlightQuestion:
        "Would I prefer higher income today, or am I willing to accept slightly lower income now for the possibility of greater long-term value?",
    },
    methodProgress: {
      heading: "Connected income journey",
      steps: [
        {
          stepLabel: "Option A",
          title: "14.2% Income Calculator",
          description: "Asset 009 — Highest income available today",
          href: calculatorPagePath("asset-009-everest-142-income"),
        },
        {
          stepLabel: "You are here",
          title: "12.8% Income Calculator",
          description: "Asset 010 — Lower income today for potential long-term value",
          current: true,
        },
        {
          stepLabel: "Next",
          title: "Income Comparison Calculator",
          description: "Asset 011 — Compare both strategies objectively",
          href: calculatorPagePath("asset-011-everest-128-vs-142"),
        },
      ],
    },
    assumptionCallout: {
      heading: "Before you calculate",
      paragraphs: [
        "Illustrative purposes only. Distribution rates are assumptions and may change. Loyalty bonuses remain subject to the investment's terms and conditions. Capital values may rise or fall. Past performance does not guarantee future returns.",
        "Set your investment period carefully: the loyalty bonus illustration is included only when the period is five years or longer.",
      ],
    },
    resultGuide: {
      heading: "Retirement Gap Insight",
      intro:
        "A higher distribution does not automatically lead to a better retirement outcome. The right strategy depends on your income needs, investment horizon, tax position, liquidity requirements and overall retirement plan. This calculator illustrates one possible income strategy. It should always be considered alongside your broader Retirement Gap.",
      metricsListed: [
        "Monthly Income After Tax",
        "Annual Income After Tax",
        "Loyalty bonus (included only at 5+ years)",
        "Total net income over selected period",
        "Effective net yield",
      ],
      highlightMetrics: [
        {
          label: "Interpret the period first",
          description:
            "If your period is under five years, the loyalty bonus is excluded. At five years or longer, the estimated bonus is included—still subject to terms, conditions and performance.",
        },
        {
          label: "Decide with the Method in mind",
          description:
            "Compare higher immediate income, then use the Income Comparison Calculator. Living Annuity and income-vs-growth tools help place the choice in a full retirement plan.",
        },
      ],
      footer:
        "Remember that future distributions and bonuses remain subject to the investment's terms, conditions and performance.",
    },
    decisionComparison: {
      heading: "Which approach may suit different retirement goals?",
      intro: "These calculators work together rather than competing with one another.",
      rows: [
        {
          objective: "Maximise income today",
          toolLabel: "Asset 009 — 14.2% Income Calculator",
          href: calculatorPagePath("asset-009-everest-142-income"),
        },
        {
          objective: "Balance income with potential long-term value",
          toolLabel: "Asset 010 — 12.8% Income Calculator",
          current: true,
        },
        {
          objective: "Compare both options side by side",
          toolLabel: "Asset 011 — Income Comparison Calculator",
          href: calculatorPagePath("asset-011-everest-128-vs-142"),
        },
      ],
      footer:
        "Also compare income and growth strategies with Asset 013, and estimate retirement income needs with the Living Annuity Income & Sustainability Calculator.",
    },
    withdrawalGuide: {
      heading: "Why some investors choose lower income today",
      intro:
        "Retirees do not all optimise for the same outcome. Priorities may include higher immediate income, higher long-term value, greater certainty over a planned holding period, or different liquidity needs. This calculator illustrates one possible trade-off—not a recommendation.",
      levels: [
        {
          label: "Sustainability of income",
          description: "Can the income support your lifestyle if distributions change?",
        },
        {
          label: "Inflation",
          description: "Will tomorrow's living costs still fit today's income illustration?",
        },
        {
          label: "Taxation",
          description: "Dividend withholding tax and other tax rules affect what you keep.",
        },
        {
          label: "Investment risk",
          description: "Targeted rates are not guarantees; capital values may rise or fall.",
        },
        {
          label: "Liquidity requirements",
          description: "Access to capital may be restricted; confirm notice periods and penalties.",
        },
        {
          label: "Diversification",
          description: "One income illustration should not be your entire retirement strategy.",
        },
        {
          label: "Capital preservation",
          description: "Decide how much risk to capital you can accept for income today.",
        },
        {
          label: "Estate planning objectives",
          description: "Income timing can interact with legacy and liquidity planning for heirs.",
        },
      ],
      closing:
        "These considerations naturally lead into the Retirement Gap Method™—where retirement, tax and estate planning work together.",
    },
    methodSection: {
      heading: "Education first. Product second.",
      paragraphs: [
        "This page must not feel like a product brochure. It exists to help you answer a retirement planning question about income timing versus long-term value.",
        "Compare higher immediate income, compare both strategies side by side, then place the decision inside the Retirement Gap Method™ and a Retirement Gap Review when you want personalised advice.",
      ],
      bullets: [
        "Asset 009 — highest income today",
        "Asset 010 — income/long-term value trade-off",
        "Asset 011 — objective comparison",
        "Method + Review — personalised next step",
      ],
      ctaLabel: "Compare both strategies",
      ctaHref: calculatorPagePath("asset-011-everest-128-vs-142"),
      secondaryCtaLabel: "Compare higher immediate income",
      secondaryCtaHref: calculatorPagePath("asset-009-everest-142-income"),
    },
    assessmentSection: {
      heading: "Need help choosing an income trade-off?",
      intro:
        "A Retirement Gap Review can help you test whether higher income today or potential long-term value better fits your horizon, tax position, liquidity needs and overall plan.",
      bullets: [
        "Income need vs illustrated monthly income",
        "Holding period and bonus eligibility",
        "Liquidity, tax and diversification",
        "Links to living annuity and growth comparisons",
      ],
      ctaLabel: "Book a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_010",
    },
    journey: {
      heading: "Continue Your Retirement Gap Journey",
      items: [
        {
          stepLabel: "Toolkit",
          assetCode: "ASSET 000",
          title: "Retirement Gap Toolkit™",
          description: "Return to the full calculator hub.",
          href: "/calculators",
        },
        {
          stepLabel: "Compare",
          assetCode: "ASSET 009",
          title: "14.2% Income Calculator",
          description: "Compare higher immediate income.",
          href: calculatorPagePath("asset-009-everest-142-income"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 011",
          title: "Income Comparison Calculator",
          description: "Compare both strategies objectively.",
          href: calculatorPagePath("asset-011-everest-128-vs-142"),
        },
        {
          stepLabel: "Also",
          assetCode: "ASSET 013",
          title: "Income vs Growth Comparison",
          description: "Compare income and growth strategies.",
          href: calculatorPagePath("asset-013-everest-income-vs-growth"),
        },
        {
          stepLabel: "Also",
          assetCode: "ASSET 014",
          title: "Living Annuity Income & Sustainability Calculator",
          description: "Estimate retirement income needs and drawdown.",
          href: calculatorPagePath("asset-014-living-annuity"),
        },
        {
          stepLabel: "Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "Connect income choices to the full Method.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "Choose the trade-off that fits your Retirement Gap—not the highest percentage.",
      body: "Asset 009, Asset 010 and Asset 011 form a connected educational journey: highest income today, income for potential long-term value, then an objective comparison. Continue with the Retirement Gap Method™ or book a Retirement Gap Review for personalised advice.",
      primaryLabel: "Learn the Retirement Gap Method™",
      primaryHref: "/retirement-gap-method",
      secondaryLabel: "Book a Retirement Gap Review",
      secondaryHref: "/contact?source=retirement_gap_review_asset_010",
    },
    readingSections: [
      {
        heading: "Place this trade-off inside a complete plan",
        paragraphs: [
          "Retirement income decisions should also consider sustainability, inflation, taxation, investment risk, liquidity, diversification, capital preservation and estate planning objectives.",
          "Compare income and growth strategies, estimate living annuity income needs, and return to the Retirement Gap Toolkit™ so any illustration stays connected to your broader Retirement Gap—not a one-product decision.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "Why would someone choose a lower distribution?",
        answer:
          "Some people accept slightly lower income today for potential long-term benefits such as a loyalty bonus, a preferred holding-period structure, or a better fit with their overall retirement plan. Suitability depends on personal circumstances.",
      },
      {
        question: "What happens if I withdraw before five years?",
        answer:
          "In this illustration the loyalty bonus is not included when the investment period is under five years. Early exit may also be subject to liquidity rules, notice periods and penalties. Confirm actual product terms during advice.",
      },
      {
        question: "Is the loyalty bonus guaranteed?",
        answer:
          "No. Loyalty bonuses remain subject to the investment's terms, conditions and performance. Treat calculator outputs as educational estimates only.",
      },
      {
        question: "Can the distribution rate change?",
        answer:
          "Yes. Distribution rates are assumptions and may change. Stress-test different rates in the calculator fields.",
      },
      {
        question: "Is this investment suitable for retirees?",
        answer:
          "It may be suitable for some retirees and unsuitable for others. Suitability depends on income needs, horizon, liquidity, tax, risk tolerance and the rest of your Retirement Gap. Advice is required.",
      },
      {
        question: "How does this compare with the 14.2% Income Calculator?",
        answer:
          "Asset 009 illustrates higher immediate income. This page illustrates lower income today with potential long-term value. Use the Income Comparison Calculator for a side-by-side view.",
      },
      {
        question: "Should I compare income only, or total return?",
        answer:
          "Compare both. Monthly income matters for lifestyle funding; total return over your holding period matters for long-term value. Asset 011 helps compare strategies objectively.",
      },
      {
        question: "Does this calculator include tax?",
        answer:
          "Yes. It applies an adjustable dividend withholding tax assumption to income and to the loyalty bonus when included.",
      },
      {
        question: "Is this financial advice?",
        answer:
          "No. It is an educational illustration only. Personalised advice requires a suitability process with an authorised adviser (FSP 17273).",
      },
      {
        question: "Is 12.8% guaranteed?",
        answer:
          "No. It is a targeted return profile subject to issuer performance and risk. Liquidity constraints and a suitability review apply.",
      },
    ],
    categoryLabel: "Retirement Income",
    categoryHref: "/calculators",
  },

  "asset-011-everest-128-vs-142": {
    shortTitle: "Income Strategy Comparison Calculator",
    seoTitle: "Which Income Strategy Fits Your Investment? | Retirement Gap Toolkit™",
    seoDescription:
      "Compare income, tax, liquidity trade-offs and five-year benefits of 12.8% and 14.2% income strategies. Educational decision tool—not a product pitch. FSP 17273.",
    keywords: [
      "income strategy comparison",
      "12.8 vs 14.2 income",
      "retirement income trade-off",
      "voluntary investment capital",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 011",
    heroTitle: "Which Income Strategy Fits Your Investment?",
    heroSubtitle:
      "If you have voluntary investment capital, choosing between income investments involves more than comparing yields. This calculator estimates the income, tax implications, liquidity and total five-year benefits of two different income strategies so you can better understand the trade-offs before making a financial decision.",
    heroImage: "/images/calc-lcp/asset-011.webp",
    heroImageAlt: "Homeowner weighing two income strategy options on a terrace",
    calculatorLead:
      "Enter the same lump sum once. Review the comparison table, then the two factual summary cards—Higher Monthly Income and More Total Value After Five Years. No recommendation is made.",
    sidePanelTitle: "Outcomes first. Products second.",
    sidePanelParagraphs: [
      "This is a cornerstone decision tool inside the Retirement Gap Toolkit™. It helps you compare financial outcomes—not branded investments.",
      "Option A is a 12.8% Income Strategy. Option B is a 14.2% Income Strategy. Underlying product names may appear in assumptions only.",
    ],
    sidePanelBullets: [
      "Same capital, two strategies",
      "Income, tax and five-year benefit",
      "Loyalty benefit on Option A where illustrated",
      "Educational comparison only",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Voluntary income investments may be illiquid. Confirm notice periods, penalties and suitability with FSP 17273 before investing.",
    ],
    howToSteps: [
      { title: "Enter capital and tax", description: "Use one voluntary lump sum and an assumed dividends tax rate." },
      { title: "Review the comparison table", description: "Compare income, tax and total five-year benefit side by side." },
      { title: "Read the summary cards", description: "See which option shows higher monthly income and which shows more total five-year value." },
      { title: "Interpret, then plan", description: "Use What This Means for You, then book a Retirement Gap Review if you want personalised advice." },
    ],
    heroCta: {
      primaryLabel: "Compare Income Strategies",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Open the Retirement Gap Toolkit™",
      secondaryHref: "/calculators",
    },
    contextBox: {
      heading: "A decision point—not a product page",
      paragraphs: [
        "The journey is: Can I afford to retire? How much income can my capital generate? Which income strategy best fits my objectives? Then develop a personalised strategy in a Retirement Gap Review.",
        "Estimate income with the 14.2% and 12.8% Income Calculators first if you have not already, then return here to compare outcomes objectively.",
      ],
      highlightQuestion:
        "I have voluntary capital to invest for income over the next five years. Which income strategy best aligns with my objectives?",
    },
    methodProgress: {
      heading: "Connected income journey",
      steps: [
        {
          stepLabel: "Earlier",
          title: "14.2% Income Calculator",
          description: "Asset 009 — Highest income available today",
          href: calculatorPagePath("asset-009-everest-142-income"),
        },
        {
          stepLabel: "Earlier",
          title: "12.8% Income Calculator",
          description: "Asset 010 — Income today vs long-term value",
          href: calculatorPagePath("asset-010-everest-128-income"),
        },
        {
          stepLabel: "You are here",
          title: "Income Strategy Comparison",
          description: "Asset 011 — Which strategy fits your objectives?",
          current: true,
        },
      ],
    },
    assumptionCallout: {
      heading: "Assumptions (product names secondary)",
      paragraphs: [
        "Option A – 12.8% Income Strategy may illustrate a Strategic Income–style structure with an illustrative five-year loyalty benefit. Option B – 14.2% Income Strategy may illustrate an Onyx Income+–style structure with higher day-one income and no loyalty benefit in this model.",
        "Rates, tax and bonuses are assumptions and may change. Capital values may rise or fall. This tool does not model reinvestment, capital growth, compound growth, withdrawals or variable periods.",
      ],
    },
    resultGuide: {
      heading: "What This Means for You",
      intro:
        "Investors often face a trade-off between higher income today and greater overall value after remaining invested. The better option depends on your objectives, income needs, liquidity requirements and investment horizon. This section educates—it does not persuade or recommend either strategy.",
      metricsListed: [
        "Net monthly income (both options)",
        "Annual dividends tax",
        "Five-year net income",
        "Loyalty benefit (Option A illustration)",
        "Total five-year benefit",
      ],
      highlightMetrics: [
        {
          label: "Higher income today",
          description:
            "If immediate cash flow is your priority, the summary card labelled Higher Monthly Income shows which strategy pays more from day one.",
        },
        {
          label: "Greater overall value later",
          description:
            "If remaining invested for five years is realistic, More Total Value After Five Years shows which strategy illustrates the larger five-year benefit after loyalty benefits where applicable.",
        },
      ],
      footer:
        "Neither card is a recommendation. Use them as facts, then decide which outcome aligns with your Retirement Gap.",
    },
    withdrawalGuide: {
      heading: "Choosing Between Income Strategies",
      intro:
        "Present this as educational guidance only. Do not treat either option as superior. Suitability depends on personal circumstances and advice.",
      levels: [
        {
          label: "14.2% Income Strategy — highest income immediately",
          description: "Choose this illustration path if you require the highest possible income immediately.",
        },
        {
          label: "14.2% Income Strategy — shorter horizon",
          description: "Choose this path if you may not remain invested for the full five years.",
        },
        {
          label: "14.2% Income Strategy — cash flow first",
          description: "Choose this path if immediate cash flow is your primary objective.",
        },
        {
          label: "12.8% Income Strategy — accept lower income today",
          description: "Choose this illustration path if you can accept slightly lower income today.",
        },
        {
          label: "12.8% Income Strategy — five-year horizon",
          description: "Choose this path if you expect to remain invested for five years.",
        },
        {
          label: "12.8% Income Strategy — total benefit focus",
          description:
            "Choose this path if maximising your total benefit over the investment term is more important than maximising immediate income.",
        },
      ],
      closing:
        "After comparing strategies, explore Strategic Growth and Income vs Growth tools, then place the decision inside the Retirement Gap Method™.",
    },
    methodSection: {
      heading: "Retirement Planning Insight",
      paragraphs: [
        "Retirement success is not determined solely by investment returns. Selecting an investment should support an overall retirement strategy rather than maximise a single performance measure.",
        "Connect this comparison back to the Retirement Gap Toolkit™ and the Retirement Gap Method™ so income strategy choice stays aligned with sustainable income, tax efficiency, liquidity, flexibility and long-term objectives.",
      ],
      bullets: [
        "Sustainable income",
        "Tax efficiency",
        "Liquidity",
        "Investment flexibility",
        "Long-term financial objectives",
      ],
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
      secondaryCtaLabel: "Open the 12.8% Income Calculator",
      secondaryCtaHref: calculatorPagePath("asset-010-everest-128-income"),
    },
    assessmentSection: {
      heading: "Develop a personalised retirement income strategy",
      intro:
        "A Retirement Gap Review can help you translate this educational comparison into a suitability-led plan that fits your income need, horizon, tax position and liquidity requirements.",
      bullets: [
        "Voluntary capital and income objectives",
        "Trade-off between income today and five-year value",
        "Tax, liquidity and diversification",
        "Next steps inside the Retirement Gap Method™",
      ],
      ctaLabel: "Book a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_011",
    },
    journey: {
      heading: "Related Calculators",
      items: [
        {
          stepLabel: "Toolkit",
          assetCode: "ASSET 000",
          title: "Retirement Gap Toolkit™",
          description: "Return to the full calculator hub.",
          href: "/calculators",
        },
        {
          stepLabel: "Earlier",
          assetCode: "ASSET 009",
          title: "14.2% Income Calculator",
          description: "Estimate higher immediate income.",
          href: calculatorPagePath("asset-009-everest-142-income"),
        },
        {
          stepLabel: "Earlier",
          assetCode: "ASSET 010",
          title: "12.8% Income Calculator",
          description: "Estimate income with long-term value trade-off.",
          href: calculatorPagePath("asset-010-everest-128-income"),
        },
        {
          stepLabel: "Also",
          assetCode: "ASSET 012",
          title: "Strategic Growth Calculator",
          description: "Illustrate compounding when income is not required.",
          href: calculatorPagePath("asset-012-strategic-growth"),
        },
        {
          stepLabel: "Also",
          assetCode: "ASSET 013",
          title: "Income vs Growth Comparison",
          description: "Compare income and growth strategies.",
          href: calculatorPagePath("asset-013-everest-income-vs-growth"),
        },
        {
          stepLabel: "Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "Connect strategy choice to the full Method.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "Compare outcomes. Then build a personalised strategy.",
      body: "This calculator is the decision point within the Retirement Gap Method™: after you know your gap and can estimate income, choose which income strategy best fits your objectives—then book a Retirement Gap Review for advice.",
      primaryLabel: "Learn the Retirement Gap Method™",
      primaryHref: "/retirement-gap-method",
      secondaryLabel: "Book a Retirement Gap Review",
      secondaryHref: "/contact?source=retirement_gap_review_asset_011",
    },
    readingSections: [
      {
        heading: "Keep the journey connected",
        paragraphs: [
          "Start with Retirement Gap tools if you have not yet measured need. Use the 14.2% Income Calculator and 12.8% Income Calculator to estimate each strategy alone, then return here to compare outcomes. Strategic Growth and Income vs Growth help when capital growth is also in scope.",
          "When you are ready for personalised advice, book a Retirement Gap Review so strategy choice supports your overall retirement plan—not a single yield figure.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "What is voluntary investment capital?",
        answer:
          "Voluntary investment capital is money you can invest outside compulsory retirement funds—for example savings, proceeds from a sale, or other discretionary capital. This calculator is designed for that context.",
      },
      {
        question: "Why doesn't this calculator apply to retirement funds?",
        answer:
          "Retirement fund rules, tax treatment, preservation requirements and product structures differ from voluntary income investments. Use Living Annuity and other Toolkit tools for fund-related illustrations, and seek advice for fund decisions.",
      },
      {
        question: "Why do two investments with different income rates produce different long-term outcomes?",
        answer:
          "A higher day-one rate can produce more monthly income immediately. A lower rate with a loyalty benefit after five years can produce a larger total five-year benefit if you remain invested. Timing of cash flows changes the five-year picture even when capital is the same.",
      },
      {
        question: "What is the five-year loyalty benefit?",
        answer:
          "In this illustration, Option A includes an assumed loyalty benefit after five years (default 10% of capital before dividends tax). It is educational only and remains subject to investment terms, conditions and performance.",
      },
      {
        question: "How is dividend withholding tax treated?",
        answer:
          "The calculator applies your assumed dividends tax rate to gross annual income and to Option A's illustrated loyalty benefit. Defaults use 20% DWT. Confirm your actual tax treatment with an adviser or tax professional.",
      },
      {
        question: "Why does liquidity matter?",
        answer:
          "Liquidity is how quickly you can access capital. Income strategies may restrict withdrawals with notice periods or penalties. A higher yield is less useful if you cannot access funds when you need them. Confirm liquidity terms before investing.",
      },
      {
        question: "Which investment is better for retirement income?",
        answer:
          "Neither is universally better. The better fit depends on income needs, horizon, liquidity, tax and overall retirement objectives. This tool presents facts only; personalised advice is required for a recommendation.",
      },
      {
        question: "Can I switch between income strategies later?",
        answer:
          "Switching depends on product rules, liquidity, notice periods, costs and tax consequences. Do not assume you can move freely between strategies. Confirm switching options during a suitability review.",
      },
      {
        question: "Is this calculator financial advice?",
        answer:
          "No. It is an educational illustration inside the Retirement Gap Toolkit™. Personalised advice requires a suitability process with an authorised adviser (FSP 17273).",
      },
    ],
    ...EVEREST,
  },

  "asset-012-strategic-growth": {
    shortTitle: "Strategic Growth Calculator",
    seoTitle: "Strategic Growth Decision Tool | Leave Capital Untouched for Five Years?",
    seoDescription:
      "Can you leave capital untouched for five years to maximise growth, or will you need income sooner? Educational compound-growth decision tool. FSP 17273.",
    keywords: [
      "strategic growth calculator",
      "compound growth retirement",
      "five year growth investment",
      "growth vs income decision",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Asset 012",
    heroTitle: "Should you preserve capital for long-term growth?",
    heroSubtitle:
      "This decision-support tool illustrates the effect of compound growth over a fixed investment term when no monthly income is withdrawn. It is designed to support investment decisions—not to recommend or promote any investment product.",
    heroImage: "/images/calc-lcp/asset-012.webp",
    heroImageAlt: "Patient capital growth — waiting for maturity in a thriving field",
    calculatorLead:
      "Enter your voluntary lump sum. Review the growth journey card and projected maturity value. Then decide whether leaving capital untouched for growth fits your circumstances—or whether you need income instead.",
    sidePanelTitle: "A growth decision—not a product pitch",
    sidePanelParagraphs: [
      "Asset 012 asks whether you can leave capital invested for growth. Asset 011 helps if you need income instead. Asset 013 compares growth versus income based on your circumstances.",
      "This mirrors a professional financial planning conversation inside the Retirement Gap Method™.",
    ],
    sidePanelBullets: [
      "Capital remains fully invested",
      "No monthly income withdrawn",
      "Compounding over a fixed term",
      "Educational illustration only",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Fixed-term growth illustrations may be illiquid. Early exit may attract penalties. Suitability review with FSP 17273 is required before investing.",
    ],
    howToSteps: [
      { title: "Answer the Decision Question", description: "Can you leave capital untouched for five years, or will you need income sooner?" },
      { title: "Enter capital and assumptions", description: "Use at least R100,000 voluntary capital and review rate, term and tax." },
      { title: "Read the growth journey", description: "See starting capital → investment term → projected value." },
      { title: "Compare if you need income", description: "Open Growth vs Income Comparison before booking a Review." },
    ],
    decisionQuestion: {
      question:
        "Can you leave your capital untouched for five years to maximise growth, or will you need income before then?",
    },
    heroCta: {
      primaryLabel: "Illustrate My Growth Outcome",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Compare growth vs income",
      secondaryHref: calculatorPagePath("asset-013-everest-income-vs-growth"),
    },
    contextBox: {
      heading: "Decision support for voluntary capital",
      paragraphs: [
        "This page helps you answer a fundamental retirement planning question: should I preserve my capital for long-term growth, or do I need it to generate an income today?",
        "It illustrates compound growth over a fixed term so you can understand the opportunity of leaving capital untouched—before comparing income strategies or booking advice.",
      ],
      highlightQuestion:
        "Should I preserve my capital for long-term growth, or do I need it to generate an income today?",
    },
    audienceGuide: {
      heading: "Who this calculator is for",
      intro: "This calculator is intended for investors who:",
      items: [
        "Have voluntary investment capital",
        "Do not require regular monthly income",
        "Are comfortable leaving their investment untouched for five years",
        "Want to maximise long-term capital growth through compounding",
      ],
      examplesHeading: "Examples include",
      examples: [
        "Sale of a business",
        "Sale of a property",
        "Inheritance",
        "Cash savings",
        "Discretionary investments",
        "Company surplus cash",
        "Trust investments",
      ],
      exclusionNote:
        "This calculator is not intended for retirement funds such as retirement annuities, pension funds, provident funds, preservation funds or living annuities.",
    },
    methodProgress: {
      heading: "Connected capital journey",
      steps: [
        {
          stepLabel: "You are here",
          title: "Strategic Growth",
          description: "Asset 012 — Can I leave capital invested for growth?",
          current: true,
        },
        {
          stepLabel: "If you need income",
          title: "Income Strategy Comparison",
          description: "Asset 011 — Which income strategy is more suitable?",
          href: calculatorPagePath("asset-011-everest-128-vs-142"),
        },
        {
          stepLabel: "Next",
          title: "Growth vs Income Comparison",
          description: "Asset 013 — Choose based on your circumstances",
          href: calculatorPagePath("asset-013-everest-income-vs-growth"),
        },
      ],
    },
    assumptionCallout: {
      heading: "Before you calculate",
      paragraphs: [
        "Illustrative purposes only. Assumed rates and tax treatment may change. Capital values may rise or fall. Past performance does not guarantee future returns.",
        "This tool supports investment decisions by illustrating compound growth over a fixed term. It does not recommend or promote any investment product.",
      ],
    },
    resultGuide: {
      heading: "Why projected value can grow significantly",
      intro:
        "Your capital remains fully invested for the entire five-year investment term. Because no monthly income is withdrawn, all investment growth remains invested and continues compounding over time.",
      metricsListed: [
        "Projected value at maturity",
        "Capital invested",
        "Net growth after dividends tax",
        "Gross value before tax",
        "Net return over term",
      ],
      highlightMetrics: [
        {
          label: "Compounding needs patience",
          description:
            "The growth journey card shows capital → term → projected value so compounding is easy to understand at a glance.",
        },
        {
          label: "Growth or income?",
          description:
            "If you cannot leave capital untouched, compare approaches with the Growth vs Income Comparison Calculator before deciding.",
        },
      ],
      footer:
        "Use Retirement Premium and Life of Capital tools if you still need to measure contribution need or income longevity inside your Retirement Gap.",
    },
    valueProgress: {
      heading: "A simple growth journey",
      intro:
        "Compounding is easier to grasp when you see the path. This educational example uses R1,000,000 at a 14.5% annual assumption over five years with 20% dividends tax on growth.",
      assumptionNote:
        "Figures match the default illustration in the tool. Change your inputs above to recalculate your own journey.",
      steps: [
        { label: "Starting capital", value: "R1,000,000" },
        { label: "Investment term", value: "Five years" },
        { label: "Projected value", value: "R1,774,408" },
      ],
      footer:
        "No monthly income is withdrawn, so growth stays invested and compounds. Confirm actual product terms, tax and liquidity during advice.",
    },
    methodSection: {
      heading: "Need monthly income instead?",
      paragraphs: [
        "This calculator assumes your capital remains invested for the full five years.",
        "If your objective is to generate an income rather than maximise growth, compare the two approaches before making a decision.",
      ],
      bullets: [
        "Asset 012 — leave capital for growth?",
        "Asset 011 — which income strategy fits?",
        "Asset 013 — growth or income for my circumstances?",
        "Then contact AS Brokers for a Retirement Gap Review",
      ],
      ctaLabel: "Compare Growth vs Income Investments",
      ctaHref: calculatorPagePath("asset-013-everest-income-vs-growth"),
      secondaryCtaLabel: "Compare income strategies",
      secondaryCtaHref: calculatorPagePath("asset-011-everest-128-vs-142"),
    },
    assessmentSection: {
      heading: "Ready for a personalised growth-versus-income decision?",
      intro:
        "A Retirement Gap Review can help you test whether leaving capital untouched for growth—or generating income today—better fits your horizon, liquidity and overall plan.",
      bullets: [
        "Voluntary capital and emergency savings buffer",
        "Five-year commitment vs income need",
        "Links to Retirement Premium and Life of Capital",
        "Next steps inside the Retirement Gap Method™",
      ],
      ctaLabel: "Book a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_012",
    },
    journey: {
      heading: "Next Steps",
      items: [
        {
          stepLabel: "Toolkit",
          assetCode: "ASSET 000",
          title: "Retirement Gap Toolkit™",
          description: "Return to the full calculator hub.",
          href: "/calculators",
        },
        {
          stepLabel: "Earlier",
          assetCode: "ASSET 003",
          title: "Retirement Premium Calculator",
          description: "Estimate the saving required to close your gap.",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          stepLabel: "Earlier",
          assetCode: "ASSET 004",
          title: "Life of Capital Calculator",
          description: "Test whether retirement income may last.",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Related",
          assetCode: "ASSET 011",
          title: "Voluntary Capital Income Comparison",
          description: "If you need income, compare income strategies.",
          href: calculatorPagePath("asset-011-everest-128-vs-142"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 013",
          title: "Growth vs Income Comparison",
          description: "Choose growth or income based on your circumstances.",
          href: calculatorPagePath("asset-013-everest-income-vs-growth"),
        },
        {
          stepLabel: "Framework",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "Connect this decision to the full Method.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "Growth first only if you can leave capital untouched.",
      body: "Asset 012, Asset 011 and Asset 013 form a structured digital advice journey: can I leave capital for growth, which income strategy fits if I cannot, and should I choose growth or income overall? Continue with the Retirement Gap Method™ or book a Retirement Gap Review.",
      primaryLabel: "Compare Growth vs Income Investments",
      primaryHref: calculatorPagePath("asset-013-everest-income-vs-growth"),
      secondaryLabel: "Book a Retirement Gap Review",
      secondaryHref: "/contact?source=retirement_gap_review_asset_012",
    },
    readingSections: [
      {
        heading: "Place growth inside your Retirement Gap",
        paragraphs: [
          "If you still need to know how much to save, use the Retirement Premium Calculator. If you need to know how long capital may last when drawing income, use Life of Capital. If income is required, compare strategies with the Voluntary Capital Income Comparison tool, then decide growth versus income with Asset 013.",
          "Return to the Retirement Gap Method™ so any growth illustration stays connected to tax, liquidity and long-term sustainability—not a standalone product decision.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "What happens if I need my money before the five years have ended?",
        answer:
          "The investment is designed as a fixed five-year investment. Early withdrawals may be restricted. Penalties or reduced returns may apply depending on the product rules. Investors should ensure they have sufficient emergency savings before investing. Clients should seek financial advice before committing capital.",
      },
      {
        question: "Can I draw monthly income from this growth strategy?",
        answer:
          "This illustration assumes no monthly income is withdrawn so growth can compound. If you need income, use the Income Strategy Comparison and Growth vs Income Comparison tools, then discuss suitability with an adviser.",
      },
      {
        question: "Is the illustrated return guaranteed?",
        answer:
          "No. Rates are assumptions for education. Capital values may rise or fall. Confirm current terms, risk and liquidity during a suitability review with FSP 17273.",
      },
      {
        question: "Who is this tool for?",
        answer:
          "Investors with voluntary capital who do not need regular monthly income and can leave capital untouched for about five years. It is not intended for retirement funds such as RAs, pension, provident, preservation funds or living annuities.",
      },
      {
        question: "How does this relate to my Retirement Gap?",
        answer:
          "Use Retirement Premium and Life of Capital to measure contribution need and income longevity. Use this page to test whether growth-without-income fits, then compare with income strategies and the Retirement Gap Method™.",
      },
      {
        question: "Is this calculator financial advice?",
        answer:
          "No. It is an educational decision-support tool inside the Retirement Gap Toolkit™. Personalised advice requires a suitability process with an authorised adviser (FSP 17273).",
      },
    ],
    ...EVEREST,
  },

  "asset-013-everest-income-vs-growth": {
    shortTitle: "Income vs Growth Strategy Comparison",
    seoTitle: "Which Retirement Investment Strategy Suits Your Goals? | Toolkit",
    seoDescription:
      "Compare income versus growth investment strategies side by side. Educational decision engine for voluntary capital—before product selection. FSP 17273.",
    keywords: [
      "income vs growth calculator",
      "retirement investment strategy",
      "compare income and growth",
      "Retirement Gap Toolkit",
      "education before product selection",
    ],
    kicker: "Retirement Gap Toolkit™",
    heroTitle: "Which retirement investment strategy suits your goals?",
    heroSubtitle:
      "Choosing an investment is not simply about selecting the product with the highest return. Some investors need reliable monthly income today. Others can leave their capital invested to maximise long-term growth. This calculator compares three different investment strategies side by side, helping you understand the trade-offs before making an informed decision.",
    heroImage: "/images/calc-lcp/asset-013.webp",
    heroImageAlt:
      "Three paths diverge at a countryside crossroads with wooden signposts labelled Income, Higher Income and Growth",
    calculatorLead:
      "Enter the same voluntary capital once. Compare monthly income, five-year outcomes and growth maturity—strategy first, products second.",
    sidePanelTitle: "Compare investment strategies",
    sidePanelParagraphs: [
      "This page is the strategic decision engine for income versus growth—not a product catalogue. It completes the educational journey before the Retirement Gap Method™ and personalised advice.",
      "AS Brokers remains independent: education before product selection.",
    ],
    sidePanelBullets: [
      "Three strategies, one capital base",
      "Income versus growth trade-offs",
      "Education before product selection",
      "Not a recommendation",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Voluntary strategies may be illiquid. Confirm notice periods, penalties and suitability with FSP 17273 before investing.",
    ],
    howToSteps: [
      { title: "Answer the Decision Question", description: "Income today, or growth over five years?" },
      { title: "Enter one capital amount", description: "Compare all three strategies on the same voluntary lump sum." },
      { title: "Read which strategy suits whom", description: "Use the interpretation cards as education—not recommendations." },
      { title: "Continue the journey", description: "Open the Retirement Gap Method™ or book a Retirement Gap Review." },
    ],
    decisionQuestion: {
      placement: "before-calculator",
      question:
        "Would you benefit more from receiving income today, or from allowing your capital to grow over the next five years?",
    },
    strategyDiagram: {
      heading: "Two strategic paths",
      eyebrow: "TODAY",
      branches: [
        {
          question: "Need regular income?",
          outcomes: ["12.8% Income Strategy", "or", "14.2% Income Strategy"],
        },
        {
          question: "Can wait five years?",
          outcomes: ["14.5% Growth Strategy"],
        },
      ],
    },
    heroCta: {
      primaryLabel: "Compare Investment Strategies",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Learn the Retirement Gap Method™",
      secondaryHref: "/retirement-gap-method",
    },
    contextBox: {
      heading: "The final comparison stage before advice",
      paragraphs: [
        "Before comparing strategies, measure need with the Retirement Reality Check and Life of Capital tools. Estimate each approach alone with the 12.8% Income, 14.2% Income and Strategic Growth calculators—then return here to decide.",
        "Which investment strategy best matches my retirement objective? That is the only question this page exists to illuminate.",
      ],
      highlightQuestion: "Which investment strategy best matches my retirement objective?",
    },
    audienceGuide: {
      heading: "Who this calculator is for",
      intro: "Suitable for visitors who:",
      items: [
        "Have discretionary investment capital",
        "Are comparing income and growth strategies",
        "Want to understand different investment objectives",
        "Are approaching retirement",
        "Want to make informed decisions before speaking to an adviser",
      ],
    },
    methodProgress: {
      heading: "Where you are in the Retirement Gap journey",
      steps: [
        {
          stepLabel: "Earlier",
          title: "Retirement Reality Check",
          description: "Asset 002 — Understand the retirement problem",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Earlier",
          title: "Life of Capital",
          description: "Asset 004 — Test income longevity",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "You are here",
          title: "Income vs Growth Comparison",
          description: "Asset 013 — Strategy decision engine",
          current: true,
        },
        {
          stepLabel: "Next",
          title: "Retirement Gap Method™",
          description: "Asset 018 — Framework before advice",
          href: "/retirement-gap-method",
        },
      ],
    },
    assumptionCallout: {
      heading: "Before you compare",
      paragraphs: [
        "Illustrative purposes only. Rates, tax and loyalty benefits are assumptions and may change. Capital values may rise or fall.",
        "This tool compares retirement income approaches and income versus growth—it does not identify a best product or provide financial advice.",
      ],
    },
    resultGuide: {
      heading: "Retirement Planning Insight",
      intro:
        "Higher income today often means sacrificing future growth. Investors who do not currently need income may benefit from allowing capital to compound. Retirement planning is about balancing income needs, liquidity requirements and long-term sustainability. The best strategy depends on your objectives—not simply the highest percentage.",
      metricsListed: [
        "Highest monthly income (factual)",
        "Highest total five-year outcome (factual)",
        "Net monthly and annual income by strategy",
        "Loyalty bonus / accumulated growth",
        "Projected capital or maturity value",
      ],
      highlightMetrics: [
        {
          label: "12.8% Income Strategy",
          description:
            "Suitable for investors seeking dependable income together with additional long-term value through the five-year loyalty bonus.",
        },
        {
          label: "14.2% Income Strategy",
          description:
            "Suitable for investors whose highest priority is maximising current income, even if long-term capital growth is not the primary objective.",
        },
        {
          label: "14.5% Growth Strategy",
          description:
            "Suitable for investors who do not require current income and are comfortable leaving their investment untouched for the full five-year term to maximise capital growth.",
        },
      ],
      footer: "These descriptions educate—they do not recommend. Suitability requires personalised advice.",
    },
    withdrawalGuide: {
      heading: "Which strategy suits which investor?",
      intro:
        "Use this as educational guidance only. The same strategy may be ideal for one person and entirely inappropriate for another.",
      levels: [
        {
          label: "Need income + long-term value",
          description: "Explore the 12.8% Income Strategy illustration and the dedicated 12.8% Income Calculator.",
        },
        {
          label: "Maximise income today",
          description: "Explore the 14.2% Income Strategy illustration and the dedicated 14.2% Income Calculator.",
        },
        {
          label: "Can leave capital untouched",
          description: "Explore the 14.5% Growth Strategy illustration and the Strategic Growth Calculator.",
        },
        {
          label: "Still unsure overall",
          description: "Continue to the Retirement Gap Method™, then book a Retirement Gap Review with AS Brokers.",
        },
      ],
      closing:
        "Individual strategy calculators deepen each path; this page keeps the trade-offs visible in one view.",
    },
    methodSection: {
      heading: "Education Before Product Selection",
      paragraphs: [
        "Selecting an investment should begin with understanding your financial objective—not choosing the product with the highest advertised return.",
        "The same investment may be ideal for one person and entirely inappropriate for another. By comparing different strategies first, you can better understand the trade-offs between current income, future growth and capital preservation before discussing the most suitable solution with a financial adviser.",
      ],
      bullets: [
        "Compare retirement income approaches first",
        "Understand income versus growth trade-offs",
        "Then discuss product solutions with an adviser",
        "Independent advice — FSP 17273",
      ],
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
      secondaryCtaLabel: "Contact AS Brokers",
      secondaryCtaHref: "/contact?source=retirement_gap_review_asset_013",
    },
    assessmentSection: {
      heading: "Ready for personalised financial advice?",
      intro:
        "A Retirement Gap Review translates this educational comparison into a suitability-led plan that fits your income need, horizon, liquidity and overall retirement objectives.",
      bullets: [
        "Income need vs growth capacity",
        "Liquidity and five-year commitment",
        "Links to Reality Check and Life of Capital",
        "Independent product selection after strategy clarity",
      ],
      ctaLabel: "Contact AS Brokers",
      ctaHref: "/contact?source=retirement_gap_review_asset_013",
    },
    journey: {
      heading: "Continue the Retirement Gap Journey",
      items: [
        {
          stepLabel: "Before",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Understand the retirement problem first.",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Before",
          assetCode: "ASSET 004",
          title: "Life of Capital Calculator",
          description: "Test whether retirement income may last.",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Strategy",
          assetCode: "ASSET 010",
          title: "12.8% Income Calculator",
          description: "Deepen the income + loyalty-bonus path.",
          href: calculatorPagePath("asset-010-everest-128-income"),
        },
        {
          stepLabel: "Strategy",
          assetCode: "ASSET 009",
          title: "14.2% Income Calculator",
          description: "Deepen the highest-income-today path.",
          href: calculatorPagePath("asset-009-everest-142-income"),
        },
        {
          stepLabel: "Strategy",
          assetCode: "ASSET 012",
          title: "Strategic Growth Calculator",
          description: "Deepen the leave-capital-for-growth path.",
          href: calculatorPagePath("asset-012-strategic-growth"),
        },
        {
          stepLabel: "Next",
          assetCode: "ASSET 018",
          title: "Retirement Gap Method™",
          description: "Framework before personalised advice.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "Strategy clarity first. Product selection second.",
      body: "Asset 013 is the decision engine of the Retirement Gap Toolkit™. It educates on income versus growth trade-offs so you can identify which approach aligns with your objectives—then continue with the Retirement Gap Method™ and a personalised advice conversation.",
      primaryLabel: "Learn the Retirement Gap Method™",
      primaryHref: "/retirement-gap-method",
      secondaryLabel: "Contact AS Brokers",
      secondaryHref: "/contact?source=retirement_gap_review_asset_013",
    },
    readingSections: [
      {
        heading: "Roadmap: a future Strategy Selector",
        paragraphs: [
          "Once the calculator library is complete, a Strategy Selector can ask a few guided questions—Are you retired? Do you need monthly income? Can you leave capital invested for five years?—and route visitors to the most appropriate Toolkit tool.",
          "Until then, this Income vs Growth comparison remains the culmination of the educational journey: Reality Check → Life of Capital → individual strategy tools → this decision engine → Retirement Gap Method™ → personal advice.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "Which strategy provides the highest monthly income?",
        answer:
          "In this illustration, the 14.2% Income Strategy typically provides the highest net monthly income from day one. Confirm with your own capital and tax assumptions in the calculator.",
      },
      {
        question: "Which strategy produces the highest value after five years?",
        answer:
          "It depends on your inputs. The calculator highlights the highest total five-year outcome factually. Growth often wins on maturity value when no income is taken; income strategies can compete when loyalty benefits and paid income are included.",
      },
      {
        question: "Should I choose income or growth?",
        answer:
          "Neither is universally better. Choose based on whether you need income today, can leave capital untouched, and how you balance liquidity with long-term sustainability. This page educates; advice is required for a recommendation.",
      },
      {
        question: "Can I switch strategies later?",
        answer:
          "Switching depends on product rules, liquidity, notice periods, costs and tax. Do not assume free movement between strategies. Confirm options during a suitability review.",
      },
      {
        question: "Is one strategy safer than another?",
        answer:
          "Safety is not determined by the headline percentage. Risk, liquidity, issuer terms and diversification matter. Treat all illustrations as educational and discuss risk with an authorised adviser.",
      },
      {
        question: "What type of investor typically chooses each strategy?",
        answer:
          "12.8% Income: dependable income plus potential loyalty value. 14.2% Income: maximise current income. 14.5% Growth: no current income need and a five-year growth horizon. These are educational profiles only.",
      },
      {
        question: "Does this calculator provide financial advice?",
        answer:
          "No. It is an educational decision-support tool inside the Retirement Gap Toolkit™. Personalised advice requires a suitability process with an authorised adviser (FSP 17273).",
      },
      {
        question: "What assumptions are used in the comparison?",
        answer:
          "Default assumptions include targeted distribution or growth rates, an illustrative five-year loyalty benefit on the 12.8% path when the period is five years or longer, and dividends tax on income or growth as modelled in the tool. Change the fields to stress-test alternatives.",
      },
    ],
    ...EVEREST,
  },

  "asset-014-living-annuity": {
    shortTitle: "Living Annuity Income & Sustainability Calculator",
    seoTitle: "Living Annuity Income & Sustainability Calculator | Toolkit",
    seoDescription:
      "Is your retirement income sustainable? Educational Living Annuity Income & Sustainability Calculator for drawdown, tax, capital longevity and sustainability risk. Retirement Gap Toolkit™. FSP 17273.",
    keywords: [
      "Living Annuity Income & Sustainability Calculator South Africa",
      "living annuity sustainability",
      "retirement income sustainability",
      "drawdown rate calculator",
      "Retirement Gap Toolkit",
    ],
    kicker: "Retirement Gap Toolkit™ · Retirement Income",
    heroTitle: "Is your current retirement income sustainable?",
    heroSubtitle:
      "This calculator helps retirees evaluate living annuity income sustainability. It educates first and analyses second. No investment product is promoted inside the tool—product discussions belong after a Living Annuity Review.",
    heroImage: "/images/calc-lcp/asset-014.webp",
    heroImageAlt: "Retiree reviewing whether living annuity income can last through later life",
    calculatorLead:
      "Enter capital, age, drawdown, expected return, fees, income escalation and planning age. See gross and net income, projected capital at key ages, depletion age and a sustainability assessment.",
    sidePanelTitle: "Education before product selection",
    sidePanelParagraphs: [
      "Asset 014 is a core educational calculator in the Retirement Gap Toolkit™. The question is sustainability—not which product to buy.",
      "After you understand your situation, request a Free Living Annuity Review. Only then should any product recommendation be discussed.",
    ],
    sidePanelBullets: [
      "Sustainability-first framing",
      "Statutory 2.5%–17.5% drawdown band",
      "Colour-coded risk education",
      "No product promotion in the tool",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Living annuity drawdowns typically sit between 2.5% and 17.5% a year. Confirm product rules before acting.",
      "This page does not promote a specific living annuity product. Product illustrations, where appropriate, follow a suitability-led advice process.",
    ],
    howToSteps: [
      { title: "Answer the Decision Question", description: "Is my current retirement income sustainable?" },
      {
        title: "Enter planning assumptions",
        description: "Capital, age, drawdown, return, fees, escalation and planning age.",
      },
      {
        title: "Read the sustainability assessment",
        description: "Excellent, Moderate or High Risk—plus projected capital and depletion age.",
      },
      {
        title: "Continue the journey",
        description: "Use Toolkit links, then request a Free Living Annuity Review before any product discussion.",
      },
    ],
    decisionQuestion: {
      placement: "before-calculator",
      question: "Is my current retirement income sustainable?",
    },
    heroCta: {
      primaryLabel: "Assess My Income Sustainability",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Learn the Retirement Gap Method™",
      secondaryHref: "/retirement-gap-method",
    },
    contextBox: {
      heading: "Sustainability before products",
      paragraphs: [
        "Retirement planning starts with lifestyle objectives, required income, available assets and the retirement gap—not with selecting an investment product.",
        "Use this calculator to understand whether your drawdown strategy may support the income you need over a realistic planning horizon.",
      ],
      highlightQuestion: "Is my current retirement income sustainable?",
    },
    audienceGuide: {
      heading: "Who this calculator is for",
      intro: "Suitable for visitors who:",
      items: [
        "Are retired or approaching retirement",
        "Have living annuity or compulsory retirement capital",
        "Want to test whether current income may last",
        "Need drawdown education before speaking to an adviser",
        "Prefer an education-first path before product discussions",
      ],
    },
    methodProgress: {
      heading: "Where you are in the Retirement Gap journey",
      steps: [
        {
          stepLabel: "Earlier",
          title: "Retirement Reality Check",
          description: "Asset 002 — Understand the retirement problem",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Earlier",
          title: "Life of Capital",
          description: "Asset 004 — Test income longevity",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "You are here",
          title: "Living Annuity Sustainability",
          description: "Asset 014 — Is income sustainable?",
          current: true,
        },
        {
          stepLabel: "Next",
          title: "Retirement Gap Method™",
          description: "Asset 018 — Framework before advice",
          href: "/retirement-gap-method",
        },
      ],
    },
    assumptionCallout: {
      heading: "Before you calculate",
      paragraphs: [
        "Defaults use realistic retirement planning assumptions: R2m capital, age 65, 5% drawdown, 8% expected return, 1.5% fees, 5% income escalation and planning age 90.",
        "This is a generic educational calculator. It does not use Everest voluntary-product rates or imply that return minus drawdown equals guaranteed capital growth.",
      ],
    },
    resultGuide: {
      heading: "How to read your results",
      intro:
        "The calculator reports income, tax, projected capital and a sustainability assessment. Treat the assessment as an educational signal—not a personalised recommendation.",
      bandsLead: "Sustainability assessment examples:",
      bands: [
        {
          label: "Excellent",
          tone: "excellent",
          description: "Likely sustainable under the assumptions you entered.",
        },
        {
          label: "Moderate",
          tone: "caution",
          description: "Requires periodic review as markets, fees, inflation and needs change.",
        },
        {
          label: "High Risk",
          tone: "high-risk",
          description: "Your current drawdown may not be sustainable over the long term.",
        },
      ],
      metricsListed: [
        "Gross monthly income",
        "Estimated income tax",
        "Estimated net monthly income",
        "Current drawdown percentage",
        "Projected capital at ages 75, 85 and 90",
        "Estimated depletion age (where applicable)",
        "Sustainability assessment",
      ],
      footer:
        "Green / amber / red drawdown bands educate on relative risk. They are not guarantees and do not replace advice.",
    },
    withdrawalGuide: {
      heading: "Drawdown reference points",
      intro:
        "Rather than choosing any percentage in isolation, use these educational reference points inside the statutory 2.5%–17.5% band.",
      levels: [
        { label: "2.5% — Statutory minimum", description: "Lowest permitted annual drawdown." },
        { label: "4.0% — Conservative starting point", description: "Often associated with a greener sustainability band." },
        {
          label: "5.0% — Retirement planning assumption",
          description: "Default planning starting point used in this calculator.",
        },
        {
          label: "5.6% — Current SA industry average",
          description: "Useful benchmark; still requires personal review.",
        },
        {
          label: "7.5% — Elevated sustainability risk",
          description: "Higher income today; greater long-term pressure on capital.",
        },
        { label: "10.0% — High drawdown", description: "Material sustainability risk for many retirees." },
        { label: "17.5% — Statutory maximum", description: "Highest permitted annual drawdown." },
      ],
      closing:
        "Green: generally sustainable. Amber: requires regular review. Red: high risk of reducing long-term retirement income.",
    },
    methodSection: {
      heading: "Why sustainable income matters",
      paragraphs: [
        "The Retirement Gap Method™ starts with lifestyle objectives rather than investment products. Desired lifestyle drives required income; required income is tested against available assets; the difference is the retirement gap; then a sustainable withdrawal strategy is designed.",
        "Products are one possible outcome of a disciplined advice process—not the starting point.",
      ],
      bullets: [
        "Desired lifestyle → required income",
        "Available assets → retirement gap",
        "Sustainable withdrawal strategy next",
        "Product recommendation only where appropriate after advice",
      ],
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
      secondaryCtaLabel: "Request a Free Living Annuity Review",
      secondaryCtaHref: "/contact?source=living_annuity_review_asset_014",
    },
    assessmentSection: {
      heading: "Request a Free Living Annuity Review",
      intro:
        "Do not treat the calculator as a product decision. A Living Annuity Review assesses sustainability and suitability before any product recommendation.",
      bullets: [
        "Current drawdown rate",
        "Income sustainability",
        "Investment strategy",
        "Fees",
        "Tax efficiency",
        "Estate planning implications",
        "Retirement Gap assessment",
        "Alternative strategies where appropriate",
      ],
      ctaLabel: "Request a Free Living Annuity Review",
      ctaHref: "/contact?source=living_annuity_review_asset_014",
    },
    journey: {
      heading: "Continue the Retirement Gap Journey",
      items: [
        {
          stepLabel: "Problem",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Understand the retirement problem first.",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Longevity",
          assetCode: "ASSET 004",
          title: "Life of Capital Calculator",
          description: "Test whether retirement income may last.",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Inflation",
          assetCode: "ASSET 005",
          title: "Inflation Calculator",
          description: "See how inflation erodes purchasing power.",
          href: calculatorPagePath("asset-005-future-value"),
        },
        {
          stepLabel: "Tax",
          assetCode: "ASSET 006",
          title: "Income Tax Calculator",
          description: "Estimate tax on retirement income.",
          href: calculatorPagePath("asset-006-income-tax"),
        },
        {
          stepLabel: "Method",
          assetCode: "ASSET 018",
          title: "The Retirement Gap Method™",
          description: "Framework before personalised advice.",
          href: "/retirement-gap-method",
        },
      ],
    },
    terminalCta: {
      heading: "Education → Calculator → Advice → Possible solutions",
      body: "Asset 014 is an educational sustainability tool inside the Retirement Gap Toolkit™. Understand your income position first. Request a Free Living Annuity Review next. Product recommendations, where appropriate, come only after that advice process.",
      primaryLabel: "Request a Free Living Annuity Review",
      primaryHref: "/contact?source=living_annuity_review_asset_014",
      secondaryLabel: "Learn the Retirement Gap Method™",
      secondaryHref: "/retirement-gap-method",
    },
    readingSections: [
      {
        heading: "What is a Living Annuity?",
        paragraphs: [
          "A living annuity is a post-retirement income vehicle where you generally retain ownership of the underlying capital (subject to product and regulatory rules). Investment strategy can usually be adjusted within the available options, and you select an annual drawdown within the statutory band.",
          "Income drawn is typically taxed as income. Remaining capital may form part of your estate planning picture, which is one reason living annuities are often compared with life annuities. Confirm ownership, beneficiary and liquidity rules with an authorised adviser.",
        ],
      },
      {
        heading: "How much should I draw?",
        paragraphs: [
          "Higher income today may reduce future income if capital depletes faster than it can recover. Longevity risk, inflation, investment returns, fees and sequence-of-returns risk all affect sustainability.",
          "The educational reference points in the calculator—from statutory minimum to statutory maximum—exist to make that trade-off visible before you lock in a lifestyle income assumption.",
        ],
      },
      {
        heading: "Why sustainable income matters",
        paragraphs: [
          "The Retirement Gap Method™ focuses on lifestyle objectives, required income, available assets, the retirement gap and a sustainable withdrawal strategy.",
          "Visitors should spend time understanding retirement decisions before discovering that AS Brokers also provides regulated financial advice. Education strengthens compliance, credibility and long-term trust.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "Can I transfer my living annuity?",
        answer:
          "South African legislation generally allows transfers between providers, subject to product and regulatory rules. The decision should consider sustainability, fees, investment strategy, taxation, liquidity and estate planning—not performance alone.",
      },
      {
        question: "How much should I withdraw each year?",
        answer:
          "There is a trade-off between current income and preserving future purchasing power. Lower drawdowns generally improve longevity; higher drawdowns raise income now and increase depletion risk. Use this calculator as education, then review personally.",
      },
      {
        question: "Does a higher investment return guarantee my capital will grow?",
        answer:
          "No. Sequence-of-returns risk, fees, inflation, market volatility and changing drawdown requirements can all prevent capital growth even when a targeted return looks higher than your drawdown. Never treat return minus drawdown as guaranteed growth.",
      },
      {
        question: "Should I reduce my drawdown after retirement?",
        answer:
          "Reviewing drawdown rates regularly may improve long-term sustainability depending on markets, health, spending needs and other income sources. A Living Annuity Review can help stress-test alternatives.",
      },
      {
        question: "Does this calculator recommend a product?",
        answer:
          "No. Asset 014 is an educational sustainability tool. Product illustrations and recommendations, where appropriate, follow a Free Living Annuity Review and suitability process with AS Brokers CC (FSP 17273).",
      },
      {
        question: "What assumptions does the calculator use?",
        answer:
          "Defaults include R2,000,000 capital, age 65, 5.0% drawdown, 8.0% expected return, 1.5% fees, 5.0% income escalation and planning age 90. Tax uses illustrative SARS 2026/27 brackets with age rebates. Change any field to stress-test alternatives.",
      },
    ],
    categoryLabel: "Retirement Income",
    categoryHref: "/calculators#retirement-income",
  },

  "asset-015-average-clause": {
    shortTitle: "Average Clause Calculator",
    seoTitle: "How Much Could Underinsurance Reduce Your Insurance Claim?",
    seoDescription:
      "See how underinsurance and the average clause can reduce an insurance claim payout. Free educational underinsurance calculator for homes, contents and commercial property. FSP 17273.",
    keywords: [
      "underinsurance calculator",
      "why was my insurance claim reduced",
      "average clause calculator",
      "underinsured claim payout",
      "how much will insurance pay if underinsured",
      "replacement value vs sum insured",
    ],
    kicker: "Financial Decision Library · Insurance education",
    heroTitle: "How much could underinsurance reduce your insurance claim?",
    heroSubtitle:
      "Most people assume that if they insure their property, their claim will be paid in full. Unfortunately, that is not always the case. If your building or contents are insured for less than their true replacement value, the Average Clause may reduce every claim—even relatively small ones. This calculator shows how underinsurance could affect your payout.",
    heroImage: "/images/calc-lcp/asset-015.webp",
    heroImageAlt: "Homeowners reviewing sum insured against replacement value after a claim shock",
    calculatorLead:
      "Enter replacement value, sum insured and claim amount. The Average Clause Calculator shows the illustrative insurance percentage, claim payable and uninsured portion.",
    sidePanelTitle: "Problem-first insurance education",
    sidePanelParagraphs: [
      "This page is about underinsurance—the problem people search for—not about selling a policy. The Average Clause Calculator demonstrates the principle so you can understand the risk before renewal.",
      "AS Brokers approaches insurance as education, analysis and ongoing review—not product-first selling.",
    ],
    sidePanelBullets: [
      "Underinsurance explained plainly",
      "Average Clause demonstration",
      "Home, contents and commercial relevance",
      "Review-oriented next step",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Replacement value is not the same as market value. Land value is normally excluded from building replacement calculations.",
      "Accurate replacement values should be professionally determined where appropriate. Policy wording and insurer assessment decide actual claim outcomes.",
    ],
    howToSteps: [
      { title: "Enter replacement value", description: "What it would cost to replace the building or contents today (not market value)." },
      { title: "Enter sum insured", description: "The amount shown on your policy schedule." },
      { title: "Add claim amount", description: "The loss you are illustrating—full or partial." },
      { title: "Read the reduced payout", description: "See the insurance percentage, claim payable and uninsured portion." },
    ],
    decisionQuestion: {
      question: "If my property is underinsured, how much of my claim might I actually receive?",
    },
    heroCta: {
      primaryLabel: "Calculate My Claim Reduction",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Explore insurance education",
      secondaryHref: "/insurance",
    },
    contextBox: {
      heading: "Underinsurance is the problem. The Average Clause is the mechanism.",
      paragraphs: [
        "Very few people search for “Average Clause.” They search for why a claim was reduced, why the insurer did not pay in full, or how much insurance will pay if they are underinsured.",
        "This page educates about underinsurance. The calculator demonstrates the Average Clause principle.",
      ],
      highlightQuestion: "How much could underinsurance reduce your insurance claim?",
    },
    audienceGuide: {
      heading: "Who should use this calculator?",
      intro: "This calculator is useful for:",
      items: [
        "Homeowners",
        "Sectional title owners",
        "Landlords",
        "Commercial property owners",
        "Business owners",
        "Anyone reviewing their short-term insurance",
      ],
    },
    assumptionCallout: {
      heading: "Replacement value disclaimer",
      paragraphs: [
        "Replacement value is not the same as market value. Land is normally excluded from building replacement calculations.",
        "Accurate replacement values should be professionally determined where appropriate. This tool is an educational illustration only—it is not a claim assessment, quotation or advice to change cover.",
      ],
    },
    resultGuide: {
      heading: "How to read your result",
      intro:
        "The calculator shows the insurance percentage (sum insured ÷ replacement value), the illustrative claim payable after average, and the uninsured portion you may carry yourself.",
      metricsListed: [
        "Average / insurance percentage",
        "Claim payable",
        "Uninsured portion",
      ],
      footer:
        "If the insurance percentage is below 100%, every claim—even a small one—may be reduced by the same proportion under typical average clause wording.",
    },
    valueProgress: {
      heading: "Why does underinsurance reduce my claim?",
      intro:
        "Insurance is based on the assumption that your property is insured for its full replacement value. If you insure only part of its value, the insurer assumes you have chosen to carry part of the risk yourself. As a result, the same percentage is applied to every claim—even when your claim is much smaller than the total value of the property.",
      assumptionNote: "Simple educational example (50% insured):",
      steps: [
        { label: "Replacement value", value: "R2 000 000" },
        { label: "Sum insured", value: "R1 000 000" },
        { label: "Insurance percentage", value: "50%" },
        { label: "Claim", value: "R1 000 000" },
        { label: "Claim paid", value: "R500 000" },
      ],
      footer:
        "In this example, half the claim may be unpaid—not because the claim exceeded the sum insured, but because the property was only 50% insured relative to replacement value.",
    },
    withdrawalGuide: {
      heading: "Common causes of underinsurance",
      intro: "Underinsurance rarely happens overnight. These are among the most common reasons sums insured fall behind reality:",
      levels: [
        { label: "Rising building costs", description: "Construction and materials inflation lift replacement cost every year." },
        { label: "Renovations not added to the policy", description: "Extensions, kitchens and security upgrades change replacement value." },
        { label: "Inflation", description: "Contents and building costs rise while schedules stay static." },
        { label: "Incorrect replacement values", description: "Guessing or using purchase price instead of rebuild cost." },
        { label: "Outdated annual reviews", description: "Skipping reviews lets drift compound year after year." },
        { label: "Guessing replacement costs", description: "Estimates without professional input are often too low." },
        { label: "Improvements to the property", description: "Solar, pools, outbuildings and fittings add replacement cost." },
      ],
      closing:
        "An annual insurance review is the practical way to keep buildings and contents aligned with replacement value.",
    },
    methodSection: {
      heading: "Annual insurance reviews help prevent underinsurance",
      paragraphs: [
        "Replacement values change over time. An annual insurance review helps ensure your buildings and contents remain insured for their correct replacement value, reducing the risk of unexpected claim reductions.",
        "The goal is not “buy insurance.” The goal is “review my insurance” so cover matches the risk you actually carry.",
      ],
      bullets: [
        "Check building replacement value",
        "Update contents after renovations",
        "Review commercial sums insured",
        "Confirm average clause exposure",
      ],
      ctaLabel: "Request an Insurance Review",
      ctaHref: "/contact?source=insurance_review_asset_015",
      secondaryCtaLabel: "Learn the Retirement Gap Method™",
      secondaryCtaHref: "/retirement-gap-method",
    },
    assessmentSection: {
      heading: "Request an Insurance Review",
      intro:
        "If the calculator shows a material uninsured portion, treat it as a signal to review—not as a product purchase prompt. A review checks whether your sums insured still match replacement reality.",
      bullets: [
        "Buildings and contents replacement values",
        "Commercial property and stock exposures",
        "Recent renovations or improvements",
        "Average clause and related policy wording",
      ],
      ctaLabel: "Request an Insurance Review",
      ctaHref: "/contact?source=insurance_review_asset_015",
    },
    journey: {
      heading: "Continue learning across the Financial Decision Library",
      items: [
        {
          stepLabel: "Insurance",
          assetCode: "LEARN",
          title: "Insurance Education",
          description: "Policy gaps, claims education and short-term risk overview.",
          href: "/insurance",
        },
        {
          stepLabel: "Method",
          assetCode: "ASSET 018",
          title: "The Retirement Gap Method™",
          description: "Cornerstone framework for Toolkit, workshop and reviews.",
          href: "/retirement-gap-method",
        },
        {
          stepLabel: "Estate",
          assetCode: "ASSET 007",
          title: "Estate Duty Calculator",
          description: "Measure estate cost and liquidity risk.",
          href: calculatorPagePath("asset-007-estate-duty"),
        },
        {
          stepLabel: "Retirement",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Measure the Retirement Gap before product talks.",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Library",
          assetCode: "ASSET 000",
          title: "Financial Decision Library",
          description: "All educational calculators in one hub.",
          href: "/calculators",
        },
      ],
    },
    terminalCta: {
      heading: "Learn → Measure → Review",
      body: "Asset 015 is a blueprint for insurance education on this site: answer a real financial question first, demonstrate the principle second, and invite a review—not a product sale—third.",
      primaryLabel: "Request an Insurance Review",
      primaryHref: "/contact?source=insurance_review_asset_015",
      secondaryLabel: "The Retirement Gap Method™",
      secondaryHref: "/retirement-gap-method",
    },
    readingSections: [
      {
        heading: "Why does underinsurance reduce my claim?",
        paragraphs: [
          "Insurance is based on the assumption that your property is insured for its full replacement value. If you insure only part of its value, the insurer assumes you have chosen to carry part of the risk yourself.",
          "As a result, the same percentage is often applied to every claim. This can apply even when your claim is much smaller than the total value of the property—which is why underinsurance surprises so many people after a partial loss.",
        ],
      },
      {
        heading: "Future insurance education tools",
        paragraphs: [
          "This Average Clause / underinsurance calculator is the template for future insurance tools in the Financial Decision Library—each answering one practical question before any product discussion.",
          "Planned education themes include building replacement value, home contents value, storm damage and burst-pipe guides, excess and write-off calculators, credit shortfall, business interruption, stock, fire, liability, cyber risk, rental loss and tenant liability. The objective is to help people understand insurance decisions before they need to make them.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "What is underinsurance?",
        answer:
          "Underinsurance happens when the sum insured is lower than the true replacement value of the building, contents or other insured property. In that situation, many policies apply an average clause that reduces claims proportionally.",
      },
      {
        question: "What is the Average Clause?",
        answer:
          "The Average Clause is the policy mechanism that reduces a claim when you are underinsured. A common educational illustration is: (Sum Insured ÷ Replacement Value) × Claim = Illustrative payout. Exact wording varies by insurer and policy.",
      },
      {
        question: "Why was my insurance claim reduced?",
        answer:
          "One common reason is underinsurance. If your sum insured is below replacement value, the insurer may pay only the insured percentage of the claim—even for a relatively small loss. Other policy conditions can also affect outcomes; this tool focuses on the average principle.",
      },
      {
        question: "Is replacement value the same as market value?",
        answer:
          "No. Replacement value is generally what it would cost to rebuild or replace, often excluding land. Market value is what a buyer might pay. Using market value as a proxy for sum insured can create underinsurance.",
      },
      {
        question: "Does this calculator assess my real claim?",
        answer:
          "No. It is an educational illustration only. Actual claim outcomes depend on policy wording, endorsements, excesses, insurer assessment and professional valuation where required.",
      },
      {
        question: "How do I reduce the risk of underinsurance?",
        answer:
          "Keep replacement values current, update the policy after renovations or improvements, avoid guessing rebuild costs, and request an annual insurance review so sums insured track reality.",
      },
    ],
    categoryLabel: "Insurance & Risk",
    categoryHref: "/calculators#insurance-risk",
  },

  "asset-016-growth-comparison": {
    shortTitle: "Power of Growth Calculator",
    seoTitle: "Power of Growth Calculator | Cost of Waiting | Retirement Gap Toolkit™",
    seoDescription:
      "What is the financial cost of waiting to make a good decision? Measure the opportunity cost of delaying investing, saving or reviewing your plan. Educational Decision Cost Calculator. FSP 17273.",
    keywords: [
      "power of growth calculator",
      "cost of waiting calculator",
      "compound growth calculator South Africa",
      "decision cost calculator",
      "Retirement Gap Toolkit",
      "opportunity cost of delaying investing",
    ],
    kicker: "Retirement Gap Toolkit™",
    heroTitle: "Power of Growth Calculator",
    heroSubtitle:
      "Every important financial decision has a cost. Sometimes the biggest cost isn't making a bad decision. It's waiting too long to make a good one. This calculator demonstrates how compound growth works and helps you estimate the potential financial cost of delaying important decisions such as investing, saving for retirement, reviewing your financial plan or improving your financial knowledge.",
    heroImage: "/images/calc-lcp/asset-016.webp",
    heroImageAlt: "Visual comparison of starting today versus delaying a long-term financial decision",
    calculatorLead:
      "Compare Start Today with Delay Starting. The primary result is the Cost of Waiting—then review future value, contributions, growth and a side-by-side growth-rate comparison.",
    sidePanelTitle: "A Decision Cost Calculator",
    sidePanelParagraphs: [
      "This is one of the cornerstone calculators of the Retirement Gap Method™. It is not primarily a growth calculator—it measures the financial consequence of delaying a good decision.",
      "The recurring principle: time is often more valuable than return. Educational only—not financial, investment or tax advice.",
    ],
    sidePanelBullets: [
      "Cost of waiting first",
      "Start today vs start later",
      "Growth-rate comparison",
      "Toolkit cornerstone tool",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Illustrations depend on the assumptions you enter. Actual investment performance will differ and cannot be guaranteed.",
      "Do not interpret mathematical outcomes as investment recommendations or predictions of future returns.",
    ],
    howToSteps: [
      { title: "Enter Scenario A", description: "Initial investment, years, monthly contribution, annual increase and growth rate." },
      { title: "Choose a delay", description: "Compare start today with delaying 1, 2, 3 or 5 years." },
      { title: "Read the Cost of Waiting", description: "The largest figure is what delay may cost under your assumptions." },
      { title: "Compare growth rates", description: "See mathematical outcomes at 8%, 10%, 12%, 15% and 20%—not product advice." },
    ],
    decisionQuestion: {
      question: "What is the financial cost of waiting to make a good decision?",
    },
    heroCta: {
      primaryLabel: "Calculate the Cost of Waiting",
      primaryHref: "#calculator-tool",
      secondaryLabel: "Learn the Retirement Gap Method™",
      secondaryHref: "/retirement-gap-method",
    },
    contextBox: {
      heading: "The Cost of Waiting",
      paragraphs: [
        "Many people believe delaying a financial decision by one or two years has only a small impact. Compound growth shows the opposite.",
        "Every year that money is not invested—or a good decision is delayed—reduces the time available for growth. The lost opportunity often becomes surprisingly large over long periods. This calculator helps you visualise that difference.",
      ],
      highlightQuestion: "What is the financial cost of waiting to make a good decision?",
    },
    audienceGuide: {
      heading: "Who this calculator is for",
      intro:
        "This calculator is suitable for anyone who wants to understand how the timing of financial decisions can affect long-term outcomes. It is particularly useful for people considering:",
      items: [
        "Retirement planning",
        "Long-term investing",
        "Monthly savings",
        "Financial education",
        "Estate planning",
        "Business investment decisions",
        "Reviewing existing financial strategies",
      ],
    },
    assumptionCallout: {
      heading: "Before you calculate",
      paragraphs: [
        "Scenario A starts today. Scenario B delays the same plan by the years you select; both share the same end date, so the delayed plan has fewer years of compounding and contributions.",
        "Results are mathematical illustrations only. They should not be interpreted as investment advice or predictions of future returns.",
      ],
    },
    resultGuide: {
      heading: "How to read your results",
      intro:
        "The hero result is the Cost of Waiting—not future value alone. People remember what they may lose by delaying. Secondary metrics explain how the gap is formed.",
      metricsListed: [
        "Cost of Waiting (primary)",
        "Future value — started today vs started later",
        "Total contributions",
        "Investment growth",
        "Years lost",
        "Monthly contribution total",
        "Percentage difference",
      ],
      footer:
        "The growth-rate table uses the same capital and period at 8%, 10%, 12%, 15% and 20%. It demonstrates mathematics only—it does not recommend investments.",
    },
    withdrawalGuide: {
      heading: "What this calculator teaches",
      intro: "This Decision Cost edition demonstrates that:",
      levels: [
        { label: "Time matters", description: "Compound growth rewards earlier action." },
        {
          label: "Delay has a measurable cost",
          description: "Waiting to make a good financial decision permanently reduces compounding time.",
        },
        {
          label: "Small differences become large",
          description: "Over decades, one or two years can change outcomes dramatically.",
        },
        {
          label: "Knowledge compounds too",
          description: "Financial education acquired earlier can influence hundreds of later decisions.",
        },
      ],
      closing:
        "One of the biggest causes of a retirement gap is not laziness. Many people were simply never taught the financial principles that compound over decades.",
    },
    methodSection: {
      heading: "Retirement Gap Method™",
      paragraphs: [
        "This calculator demonstrates one stage of the Retirement Gap Method™. Every financial decision follows the same process: understand the principle, measure the impact, quantify the cost of action or inaction, review whether your strategy remains appropriate, then seek personalised advice where necessary.",
        "When visitors understand that every important financial decision has a cost, they become better prepared for the broader Toolkit and for informed advice.",
      ],
      bullets: [
        "Understand the financial principle",
        "Measure the impact using a calculator",
        "Quantify the cost of action or inaction",
        "Review whether your strategy remains appropriate",
        "Seek personalised advice where necessary",
      ],
      ctaLabel: "Learn the Retirement Gap Method™",
      ctaHref: "/retirement-gap-method",
      secondaryCtaLabel: "Open the Retirement Reality Check",
      secondaryCtaHref: calculatorPagePath("asset-002-retirement-reality-check"),
    },
    assessmentSection: {
      heading: "Ready to review your strategy?",
      intro:
        "If the Cost of Waiting is material under your assumptions, treat it as a signal to review timing—not as a product purchase prompt.",
      bullets: [
        "Retirement contribution timing",
        "Investment start dates",
        "Drawdown and living annuity reviews",
        "Estate and insurance decision delays",
      ],
      ctaLabel: "Request a Retirement Gap Review",
      ctaHref: "/contact?source=retirement_gap_review_asset_016",
    },
    journey: {
      heading: "Continue the Retirement Gap Journey",
      items: [
        {
          stepLabel: "Problem",
          assetCode: "ASSET 002",
          title: "Retirement Reality Check",
          description: "Measure the Retirement Gap first.",
          href: calculatorPagePath("asset-002-retirement-reality-check"),
        },
        {
          stepLabel: "Action",
          assetCode: "ASSET 003",
          title: "Retirement Premium Calculator",
          description: "Estimate the monthly saving required.",
          href: calculatorPagePath("asset-003-retirement-premium"),
        },
        {
          stepLabel: "Inflation",
          assetCode: "ASSET 005",
          title: "Future Value Calculator",
          description: "See purchasing-power pressure over time.",
          href: calculatorPagePath("asset-005-future-value"),
        },
        {
          stepLabel: "Longevity",
          assetCode: "ASSET 004",
          title: "Life of Capital Calculator",
          description: "Test whether retirement income may last.",
          href: calculatorPagePath("asset-004-life-of-capital"),
        },
        {
          stepLabel: "Strategy",
          assetCode: "ASSET 013",
          title: "Income vs Growth Comparison",
          description: "Compare income and growth approaches.",
          href: calculatorPagePath("asset-013-everest-income-vs-growth"),
        },
        {
          stepLabel: "Income",
          assetCode: "ASSET 014",
          title: "Living Annuity Sustainability",
          description: "Is retirement income sustainable?",
          href: calculatorPagePath("asset-014-living-annuity"),
        },
      ],
    },
    terminalCta: {
      heading: "Every important financial decision has a cost.",
      body: "This calculator helps you measure the cost of waiting. When that principle is clear, continue into the Retirement Gap Method™ and a personalised review—education first, advice second.",
      primaryLabel: "Learn the Retirement Gap Method™",
      primaryHref: "/retirement-gap-method",
      secondaryLabel: "Request a Retirement Gap Review",
      secondaryHref: "/contact?source=retirement_gap_review_asset_016",
    },
    readingSections: [
      {
        heading: "Real-world examples of the cost of waiting",
        paragraphs: [
          "Retirement: “I’ll start saving next year.” See the potential long-term cost. Investing: “I’ll invest later.” Estimate the value of lost compounding. Living annuities: “I’ll review my drawdown later.” Delayed reviews can affect long-term retirement outcomes.",
          "Estate planning: “I’ll update my estate plan next year.” Delay can create avoidable financial and family consequences. Insurance: “I’ll increase my cover at renewal.” Waiting can leave a period of underinsurance. Business: “I’ll start later.” Lost time is lost compounding. Financial education: “I’ll learn this next year.” Knowledge acquired earlier can influence hundreds of future decisions.",
        ],
      },
      {
        heading: "Educational insight",
        paragraphs: [
          "One of the biggest causes of a retirement gap is not laziness. Many people were simply never taught the financial principles that compound over decades.",
          "Learning earlier allows better decisions to compound for the rest of your life. That is why this Decision Cost Calculator sits at the centre of the Retirement Gap Toolkit™.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "Is this mainly a growth-rate calculator?",
        answer:
          "No. It is a Decision Cost Calculator. Growth maths are used to answer a deeper question: what is the financial cost of waiting to make a good decision?",
      },
      {
        question: "What does Cost of Waiting mean?",
        answer:
          "It is the illustrative difference between starting today and delaying the same plan by the years you select, while keeping the same end date. The delayed plan has fewer years of compounding and contributions.",
      },
      {
        question: "Why compare different growth rates?",
        answer:
          "To show how mathematics changes when long-term growth assumptions change—using the same capital and period. It does not recommend any investment product.",
      },
      {
        question: "Are the results guaranteed?",
        answer:
          "No. Results are mathematical illustrations based on your assumptions. Actual investment performance will differ and cannot be guaranteed.",
      },
      {
        question: "Does this provide investment advice?",
        answer:
          "No. It is educational only and does not constitute financial, investment or tax advice. Personalised advice requires a suitability process with AS Brokers CC (FSP 17273).",
      },
      {
        question: "How does this fit the Retirement Gap Method™?",
        answer:
          "Understand the principle, measure the impact, quantify the cost of action or inaction, review your strategy, then seek advice where necessary. This sequence appears throughout the Toolkit.",
      },
    ],
    categoryLabel: "Retirement Gap Toolkit™",
    categoryHref: "/calculators",
  },

  "asset-017-personal-goal": {
    shortTitle: "Goal Engineering Planner™",
    seoTitle: "Goal Engineering Planner™ | Financial Freedom Community™ Members",
    seoDescription:
      "Can your financial goals realistically be achieved? The Goal Engineering Planner™ is a members-only Retirement Gap Method™ tool. Join the Financial Freedom Community™ to unlock it. FSP 17273.",
    keywords: [
      "Goal Engineering Planner",
      "Financial Freedom Community",
      "Retirement Gap Method members",
      "financial goal roadmap",
      "required growth rate planner",
    ],
    kicker: "Financial Freedom Community™",
    heroTitle: "Can your financial goals realistically be achieved?",
    heroSubtitle:
      "Most people know what they want. Very few know what rate of growth, level of saving or time horizon is actually required to get there. The Goal Engineering Planner™ forms part of the Retirement Gap Method™ and is available exclusively to members of the Financial Freedom Community. It helps members build realistic financial roadmaps rather than relying on guesswork.",
    heroImage: "/images/calc-lcp/asset-017.webp",
    heroImageAlt: "Member building a financial roadmap by working backwards from a clear goal",
    calculatorLead:
      "Members unlock the full Goal Engineering Planner™ after registration and programme payment. Public visitors see education only—the planning engine stays locked.",
    sidePanelTitle: "Members planning tool",
    sidePanelParagraphs: [
      "Unlike public Toolkit calculators, this planner teaches a planning methodology: what must happen to reach a goal—not a product prediction.",
      "Access requires an active Financial Freedom Community™ membership (signup → payment → unlock).",
    ],
    sidePanelBullets: [
      "Members only — lock icon on public site",
      "Reverse-engineer required growth",
      "Month-by-month roadmap",
      "Financial Blueprint™ ready",
    ],
    fiduciaryNotes: [
      "Educational Planning Tool — part of the Retirement Gap Method™ educational programme.",
      "Intended to assist members in understanding financial planning concepts. Not financial, investment, tax or legal advice.",
      "Calculations are illustrative and based on assumptions entered by the member.",
      "FSP 17273 · Category 1.8 independent adviser · Krugersdorp.",
    ],
    howToSteps: [
      { title: "Understand why goals fail", description: "Read the education below before expecting a calculator." },
      { title: "Join the community", description: "Register for the 12-week Financial Freedom Community™." },
      { title: "Complete payment", description: "Active membership unlocks the planner and learning centre." },
      { title: "Engineer your goal", description: "Members work backwards from target, time and contributions." },
    ],
    membersOnly: true,
    decisionQuestion: {
      question: "What must happen for your financial goal to become achievable?",
    },
    heroCta: {
      primaryLabel: "Join the Financial Freedom Community",
      primaryHref: "/financial-freedom-community/register",
      secondaryLabel: "Book a Retirement Planning Session",
      secondaryHref: "/contact?source=retirement_planning_session_asset_017",
    },
    contextBox: {
      heading: "From prediction to planning",
      paragraphs: [
        "Public calculators ask “what will happen?” This members planner asks “what must happen?” That change turns guesswork into a structured roadmap.",
        "Because it teaches proprietary Retirement Gap Method™ methodology, it is not available to the general public.",
      ],
      highlightQuestion: "Can your financial goals realistically be achieved?",
    },
    audienceGuide: {
      heading: "Who this is for",
      intro: "Built for Financial Freedom Community™ members who want to:",
      items: [
        "Reverse-engineer major financial goals",
        "Understand required growth versus available time",
        "Trade off savings, timeframe and target size",
        "Build a living Financial Blueprint™ during the programme",
      ],
      exclusionNote:
        "Not a public marketing calculator. Guests can learn the principle here, then join to unlock the planner.",
    },
    assumptionCallout: {
      heading: "Educational Planning Tool",
      paragraphs: [
        "The Goal Engineering Planner™ forms part of the Retirement Gap Method™ educational programme. It should not be interpreted as financial, investment, tax or legal advice.",
        "Calculations are illustrative and based on the assumptions entered by the user.",
      ],
    },
    resultGuide: {
      heading: "What members see after unlock",
      intro:
        "Once membership is active, the planner emphasises Required Annual Growth Rate as the primary result—then time, capital difference, milestones and a month-by-month table.",
      metricsListed: [
        "Required annual growth rate (primary)",
        "Required monthly growth",
        "Total time / starting / target capital",
        "Capital difference",
        "Month-by-month roadmap table",
        "CSV export for members",
      ],
      footer:
        "Guidance stays educational: if the required return looks unrealistic, members explore more time, higher savings, a lower target—or a combination—not product picks.",
    },
    withdrawalGuide: {
      heading: "Coaching prompts (members)",
      intro: "Reflective questions used in programme discussions—not advice:",
      levels: [
        { label: "Is your timeframe realistic?", description: "Would extending time reduce the return required?" },
        {
          label: "Would increasing monthly savings help?",
          description: "Higher contributions often lower the growth rate needed.",
        },
        {
          label: "Could delaying retirement improve the outcome?",
          description: "More years of compounding and contributions change the maths.",
        },
        {
          label: "Is your target aligned with the lifestyle you want?",
          description: "Goals should match lifestyle objectives—not arbitrary round numbers.",
        },
      ],
      closing: "These prompts support coaching sessions inside the 12-week programme.",
    },
    methodSection: {
      heading: "Join the Financial Freedom Community",
      paragraphs: [
        "Complete the 12-week educational programme and unlock advanced planning tools including the Goal Engineering Planner™.",
        "Prefer personalised advice instead? Meet with an AS Brokers adviser and build your own financial roadmap.",
      ],
      bullets: [
        "12-week Financial Freedom Community™",
        "Members learning centre access",
        "Goal Engineering Planner™ unlock",
        "Optional adviser planning session",
      ],
      ctaLabel: "Join the Financial Freedom Community",
      ctaHref: "/financial-freedom-community/register",
      secondaryCtaLabel: "Learn the Retirement Gap Method™",
      secondaryCtaHref: "/retirement-gap-method",
    },
    assessmentSection: {
      heading: "Book a Retirement Planning Session",
      intro:
        "Prefer a one-to-one roadmap with an authorised adviser? Request a planning session with AS Brokers CC (FSP 17273).",
      bullets: [
        "Clarify lifestyle and capital goals",
        "Review time horizon and savings capacity",
        "Discuss whether community membership fits",
        "Independent advice — education first",
      ],
      ctaLabel: "Book a Retirement Planning Session",
      ctaHref: "/contact?source=retirement_planning_session_asset_017",
    },
    journey: {
      heading: "Continue the Retirement Gap Journey",
      items: [
        {
          stepLabel: "Method",
          assetCode: "ASSET 018",
          title: "The Retirement Gap Method™",
          description: "Cornerstone framework for Toolkit, workshop and Community.",
          href: "/retirement-gap-method",
        },
        {
          stepLabel: "Toolkit",
          assetCode: "ASSET 000",
          title: "Retirement Gap Toolkit™",
          description: "Public educational calculators before membership.",
          href: "/calculators",
        },
        {
          stepLabel: "Community",
          assetCode: "FFC",
          title: "Financial Freedom Community™",
          description: "12-week programme that unlocks this planner.",
          href: "/financial-freedom-community",
        },
        {
          stepLabel: "Decision cost",
          assetCode: "ASSET 016",
          title: "Power of Growth Calculator",
          description: "Measure the financial cost of waiting.",
          href: calculatorPagePath("asset-016-growth-comparison"),
        },
      ],
    },
    terminalOptions: {
      heading: "Choose your next step",
      options: [
        {
          title: "Join the Financial Freedom Community",
          description:
            "Complete the 12-week educational programme and unlock advanced planning tools including the Goal Engineering Planner™.",
          ctaLabel: "Start registration",
          ctaHref: "/financial-freedom-community/register",
        },
        {
          title: "Learn the Retirement Gap Method™",
          description:
            "Understand how the Toolkit, workshop, Community and reviews fit together before you decide.",
          ctaLabel: "Open the Method page",
          ctaHref: "/retirement-gap-method",
        },
      ],
    },
    readingSections: [
      {
        heading: "Why most goals fail",
        paragraphs: [
          "Goals fail when they are wishes without maths. People name a target without knowing the growth, savings rate or time required—then feel surprised when progress stalls.",
          "Examples only: wanting R5 million without a contribution plan; planning a home deposit with no timeline; aiming to retire early while still funding lifestyle spend that fights the goal.",
        ],
      },
      {
        heading: "Why people underestimate time",
        paragraphs: [
          "Compounding needs years. Delaying by one or two years can change the required growth dramatically—the Power of Growth Calculator on the public Toolkit demonstrates that cost of waiting.",
          "Underestimating time leads people to chase unrealistic returns instead of adjusting savings or the target.",
        ],
      },
      {
        heading: "Why growth and regular reviews matter",
        paragraphs: [
          "Growth assumptions shape whether a goal is achievable. Reviews matter because life changes: income, expenses, markets and priorities shift. A living Financial Blueprint™ is reviewed—not set once and forgotten.",
          "Public education stops here. The interactive Goal Engineering Planner™ remains members-only so the methodology stays proprietary to the programme.",
        ],
      },
    ],
    readingSectionsPlacement: "after-results",
    faqs: [
      {
        question: "Why is this planner members only?",
        answer:
          "It teaches proprietary Retirement Gap Method™ planning methodology rather than a simple public illustration. Membership protects that intellectual property and increases the value of the Financial Freedom Community™.",
      },
      {
        question: "How do I unlock the Goal Engineering Planner™?",
        answer:
          "Register for the Financial Freedom Community™, complete programme payment, then sign in. Active membership unlocks this planner and other members-area learning tools.",
      },
      {
        question: "Is this financial advice?",
        answer:
          "No. It is an educational planning tool. Calculations are illustrative. Personalised advice requires a suitability process with AS Brokers CC (FSP 17273).",
      },
      {
        question: "What is My Financial Blueprint™?",
        answer:
          "Members can save goal assumptions—target, time, contributions and required return—into a living blueprint reviewed during the programme. Blueprint save/sync ships with the members area after registration and payment are live.",
      },
    ],
    categoryLabel: "Financial Freedom Community™",
    categoryHref: "/financial-freedom-community",
  },
};

function buildConfig(entry: CalculatorRegistryEntry): CalculatorPageConfig {
  const content = PAGES[entry.id];
  if (!content) {
    throw new Error(`Missing page content for calculator ${entry.id}`);
  }
  const { shortTitle, faqs, ...rest } = content;
  return {
    id: entry.id,
    path: calculatorPagePath(entry.id),
    assetCode: entry.assetCode,
    calculatorSrc: entry.embedPath,
    calculatorTitle: shortTitle,
    /** Page-authored FAQs only — VisibleFaqSection and PageJsonLd share this list (no pad-to-6). */
    faqs,
    ...rest,
  };
}

export function getCalculatorPageConfig(id: string): CalculatorPageConfig | undefined {
  const resolved = resolveCalculatorSlug(id);
  const entry = getCalculatorById(resolved);
  if (!entry) return undefined;
  if (!PAGES[entry.id]) return undefined;
  return buildConfig(entry);
}

export function getAllCalculatorPageConfigs(): CalculatorPageConfig[] {
  return CALCULATOR_REGISTRY.map(buildConfig);
}

const SLUG_ALIASES_FOR_STATIC = [
  "estate-duty-calculator",
  "underinsurance-calculator",
  "goal-engineering-planner",
] as const;

/** Registry ids plus SEO-friendly aliases used by /calculators/[slug]. */
export const CALCULATOR_PAGE_SLUGS = [
  ...CALCULATOR_REGISTRY.map((e) => e.id),
  ...SLUG_ALIASES_FOR_STATIC,
];
