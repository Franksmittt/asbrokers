import type { FAQItem } from "@/lib/seo";
import { CALCULATOR_REGISTRY, getCalculatorById, type CalculatorRegistryEntry } from "@/lib/calculators/registry";
import { calculatorPagePath } from "@/lib/calculators/page-path";

/** Optional educational layers used by the Retirement Gap Toolkit journey (Asset 000→018). */
export type CalculatorContextBox = {
  heading: string;
  paragraphs: string[];
  highlightQuestion?: string;
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
  /** Shown immediately below the hero, before how-to / calculator. */
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
const ESTATE = { categoryLabel: "Estate planning", categoryHref: "/estate-planning" };
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
      "Next, structure sustainable income with the Living Annuity Calculator, then explore the full Retirement Gap Method™.",
    ],
    sidePanelBullets: [
      "Stress-test drawdown sustainability",
      "See inflation and growth sensitivity",
      "Pairs with Reality Check and Premium tools",
      "Primary next step: Living Annuity (Asset 014)",
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
          title: "Living Annuity Calculator",
          description: "Asset 014 — Structure income so it lasts",
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
        "The right withdrawal rate is personal. Pair this illustration with the Living Annuity Calculator and a Retirement Gap Review before changing income.",
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
      ctaLabel: "Continue to the Living Annuity Calculator",
      ctaHref: calculatorPagePath("asset-014-living-annuity"),
    },
    methodSection: {
      heading: "Structure income so it lasts",
      paragraphs: [
        "If Asset 004 creates concern, the next practical step is learning how to structure retirement income. The Living Annuity Calculator (Asset 014) explores drawdown within regulated bands.",
        "The Retirement Gap Method™ then brings Reality Check, Premium, Life of Capital, Future Value and Living Annuity tools into one framework.",
      ],
      bullets: [
        "Living annuity drawdown bands",
        "Inflation-aware income planning",
        "Tax and sustainability trade-offs",
        "Review cadence after retirement",
      ],
      ctaLabel: "Open the Living Annuity Calculator",
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
          title: "Living Annuity Calculator",
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
          "The good news is that many of these factors can still be managed through good retirement planning. Revisit your Reality Check and Premium results, explore Future Value for inflation pressure, then structure income with the Living Annuity Calculator.",
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
          "It illustrates capital longevity. For living annuity income mechanics, use our Living Annuity calculator as well.",
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
          title: "Living Annuity Calculator",
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
          "Living annuity income is generally taxed as income at your marginal rates. Use the Living Annuity Calculator (Asset 014) alongside this tool when planning retirement income.",
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
      "Estimate estate duty, executor fees, and liquidity needs using current abatement rules. Free South African estate duty calculator. FSP 17273.",
    keywords: ["estate duty calculator South Africa", "executor fees calculator", "estate planning calculator"],
    kicker: "Estate planning",
    heroTitle: "Estimate estate duty and executor costs",
    heroSubtitle:
      "Quantify potential duty above the R3.5 million abatement and executor fees so your family is not caught without liquidity.",
    heroImage: "/images/calc-lcp/asset-007.webp",
    heroImageAlt: "Family member facing estate duty, keys, and executor cost decisions",
    calculatorLead:
      "Enter net estate value, deductions, and abatement to see illustrative duty at 20% and 25% bands plus executor fees.",
    sidePanelTitle: "What to enter",
    sidePanelParagraphs: [
      "Estate duty applies to dutiable estate above the abatement. Executor fees and liquidity shortfalls are often underestimated until it is too late.",
      "Use this diagnostic before wills, trusts, and donation strategies with a qualified adviser.",
    ],
    sidePanelBullets: [
      "R3.5m abatement illustration",
      "20% and 25% duty bands",
      "Executor fee at 3.5% plus VAT",
      "Not legal advice",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Estate planning requires qualified legal and tax advice alongside financial planning."],
    howToSteps: [
      { title: "List assets", description: "Enter total estate value including property, investments, and policies." },
      { title: "Apply deductions", description: "Include liabilities and allowable deductions where relevant." },
      { title: "Review duty estimate", description: "See illustrative duty and executor fees." },
      { title: "Plan liquidity", description: "Discuss trusts, donations, and life cover with FSP 17273." },
    ],
    readingSections: [
      {
        heading: "Liquidity at death",
        paragraphs: [
          "Families often have paper wealth but insufficient cash to pay duty, executor fees, and maintenance costs while the estate is wound up.",
          "Life cover, trust structuring, and annual donations may form part of a coordinated estate plan.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the estate duty abatement?",
        answer:
          "The tool uses the R3.5 million abatement as implemented. Confirm current SARS rules with your estate planner.",
      },
      {
        question: "Is this legal advice?",
        answer:
          "No. Estate duty and wills require coordinated legal and tax advice. Use this tool to prepare questions for that review.",
      }
    ],
    ...ESTATE,
  },

  "asset-008-estate-reduction": {
    shortTitle: "Estate Reduction Strategy Calculator",
    seoTitle: "Estate Reduction Calculator | Annual Donations South Africa",
    seoDescription:
      "Model how R100k and R200k annual donations may reduce dutiable estate over time. Free estate reduction calculator. FSP 17273.",
    keywords: ["estate reduction calculator", "donation tax calculator South Africa", "annual donation limit"],
    kicker: "Estate planning",
    heroTitle: "Reduce estate duty with structured giving",
    heroSubtitle:
      "Illustrate how annual donations within SARS limits may transfer wealth during your lifetime and lower eventual duty.",
    heroImage: "/images/calc-lcp/asset-008.webp",
    heroImageAlt: "Grandfather gifting to family — planned giving to reduce estate later",
    calculatorLead:
      "Enter estate value, donation amounts, and planning horizon to see illustrative reduction in dutiable estate.",
    sidePanelTitle: "Planning with donations",
    sidePanelParagraphs: [
      "Annual donations within SARS limits can transfer wealth while reducing eventual estate duty when structured correctly.",
      "Donations must align with wills, trusts, and liquidity. Professional estate planning advice is essential.",
    ],
    sidePanelBullets: [
      "R100k and R200k donation bands",
      "Long-horizon estate reduction",
      "Pairs with duty calculator",
      "Requires professional advice",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Donation strategies must be documented and tax-compliant."],
    howToSteps: [
      { title: "Enter estate value", description: "Start with current net estate estimate." },
      { title: "Set annual donations", description: "Use allowable donation amounts per beneficiary." },
      { title: "Choose horizon", description: "Years you plan to continue structured giving." },
      { title: "Review reduction", description: "See illustrative dutiable estate change, then formalise with advisers." },
    ],
    readingSections: [
      {
        heading: "Donations vs waiting for death",
        paragraphs: [
          "Transferring wealth while you are alive can help children and grandchildren when they need capital, not only when an estate is frozen.",
          "Donation tax, accrual, and trust law interact. Never implement donation plans without coordinated legal and tax review.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the annual donation limits?",
        answer:
          "The tool illustrates R100k and R200k bands as commonly used in planning. Confirm current SARS limits with your practitioner.",
      },
      {
        question: "Should I donate without advice?",
        answer:
          "No. Donation strategies must be documented and tax-compliant. Confirm SARS limits and structure with a qualified practitioner.",
      }
    ],
    ...ESTATE,
  },

  "asset-009-everest-142-income": {
    shortTitle: "Everest 14.2% Income Calculator",
    seoTitle: "Everest 14.2% Income Calculator South Africa",
    seoDescription:
      "Illustrate net monthly income from Everest 14.2% Onyx Income+ after dividend withholding tax. R100k minimum. Educational tool. FSP 17273.",
    keywords: ["Everest 14.2 calculator", "Onyx Income calculator", "high income voluntary investment"],
    kicker: "Everest Wealth",
    heroTitle: "Model Everest 14.2% Onyx Income+",
    heroSubtitle:
      "See illustrative day-one monthly income from targeted 14.2% p.a. profile after 20% dividend withholding tax on voluntary capital.",
    heroImage: "/images/calc-lcp/asset-009.webp",
    heroImageAlt: "Retiree enjoying day-one monthly income lifestyle on a veranda",
    calculatorLead:
      "Enter lump sum (R100,000 minimum) to see gross and net monthly income illustration. Targeted return, not guaranteed.",
    sidePanelTitle: "Who suits 14.2% income?",
    sidePanelParagraphs: [
      "Clients who need maximum cash flow from day one and accept no five-year loyalty bonus may prefer the 14.2% income profile over 12.8% Strategic Income.",
      "Voluntary Everest capital is illiquid. Early exit may require 120-day notice and up to 15% penalty.",
    ],
    sidePanelBullets: [
      "R100,000 minimum lump sum",
      "20% DWT on dividends",
      "Five-year term commitment",
      "Compare with 12.8% tool",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Everest voluntary products are illiquid. Suitability review required."],
    howToSteps: [
      { title: "Enter capital", description: "Minimum R100,000 voluntary lump sum." },
      { title: "Review gross income", description: "See illustrative monthly dividend profile." },
      { title: "See net after DWT", description: "20% dividend withholding tax applied in tool." },
      { title: "Compare strategies", description: "Use 12.8% vs 14.2% comparison before deciding." },
    ],
    readingSections: [
      {
        heading: "Income now vs bonus later",
        paragraphs: [
          "14.2% Onyx Income+ prioritises higher starting income. The 12.8% Strategic Income profile trades some day-one cash flow for a 10% loyalty bonus at year five.",
          "Neither is guaranteed. Category 1.8 advice is required before investing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 14.2% guaranteed?",
        answer: "No. It is a targeted return profile subject to issuer performance and risk.",
      },
      {
        question: "Can I withdraw early?",
        answer:
          "Voluntary products are illiquid. Early exit is subject to issuer discretion, 120-day notice, and possible 15% penalty.",
      },
    ],
    ...EVEREST,
  },

  "asset-010-everest-128-income": {
    shortTitle: "Everest 12.8% Income Calculator",
    seoTitle: "Everest 12.8% Strategic Income Calculator",
    seoDescription:
      "Illustrate Everest 12.8% Strategic Income including 10% loyalty bonus at year five. Net income after DWT. R100k minimum. FSP 17273.",
    keywords: ["Everest 12.8 calculator", "Strategic Income calculator", "Everest Wealth calculator"],
    kicker: "Everest Wealth",
    heroTitle: "Model Everest 12.8% Strategic Income",
    heroSubtitle:
      "Balance monthly dividends with a 10% loyalty bonus at year five. Illustrative net income after dividend withholding tax.",
    heroImage: "/images/calc-lcp/asset-010.webp",
    heroImageAlt: "Couple walking an estate path — patient income with long-term reward",
    calculatorLead:
      "Enter voluntary lump sum to see monthly income illustration and five-year bonus impact. Targeted returns only.",
    sidePanelTitle: "Strategic Income profile",
    sidePanelParagraphs: [
      "12.8% Strategic Income suits clients who can accept slightly lower day-one income for long-term bonus value at maturity.",
      "Discuss liquidity, tax, and suitability with FSP 17273 before committing voluntary capital.",
    ],
    sidePanelBullets: [
      "10% loyalty bonus at year 5",
      "Monthly dividend income",
      "R100,000 minimum",
      "120-day liquidity notice may apply",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Show liquidity warning on voluntary Everest products."],
    howToSteps: [
      { title: "Enter lump sum", description: "R100,000 minimum voluntary investment." },
      { title: "View monthly income", description: "Illustrative gross and net dividends." },
      { title: "See bonus at year 5", description: "10% loyalty bonus on capital illustration." },
      { title: "Book suitability review", description: "Confirm fit with independent Category 1.8 advice." },
    ],
    readingSections: [
      {
        heading: "Understanding the loyalty bonus",
        paragraphs: [
          "The bonus rewards five-year commitment. Clients who may need capital earlier should stress-test liquidity rules before investing.",
          "Dividends are taxed at 20% DWT, which may differ from your marginal income tax rate.",
        ],
      },
    ],
    faqs: [
      {
        question: "How does 12.8% compare to 14.2%?",
        answer: "Use our 12.8% vs 14.2% comparison calculator for a side-by-side five-year illustration.",
      },
      {
        question: "Is 12.8% guaranteed?",
        answer:
          "No. It is a targeted return profile subject to issuer performance and risk. Liquidity constraints and a suitability review apply.",
      }
    ],
    ...EVEREST,
  },

  "asset-011-everest-128-vs-142": {
    shortTitle: "Everest 12.8% vs 14.2% Comparison",
    seoTitle: "Everest 12.8% vs 14.2% Calculator Comparison",
    seoDescription:
      "Compare Everest 12.8% Strategic Income with 14.2% Onyx Income+ over five years on the same capital. Free comparison calculator. FSP 17273.",
    keywords: ["Everest 12.8 vs 14.2", "Everest income comparison", "which Everest product"],
    kicker: "Everest Wealth",
    heroTitle: "12.8% Strategic Income vs 14.2% Onyx Income+",
    heroSubtitle:
      "Side-by-side five-year illustration on identical capital: day-one income, bonus, and total outcome.",
    heroImage: "/images/calc-lcp/asset-011.webp",
    heroImageAlt: "Homeowner weighing two income strategy options on a terrace",
    calculatorLead:
      "Enter the same lump sum for both profiles to compare monthly income and five-year total illustration.",
    sidePanelTitle: "Which income product?",
    sidePanelParagraphs: [
      "The trade-off is cash flow now versus bonus value later. This comparison makes that trade-off visible on the same capital base.",
      "Product selection requires suitability review, liquidity planning, and tax analysis.",
    ],
    sidePanelBullets: [
      "Same capital, two profiles",
      "Five-year horizon",
      "Bonus vs higher day-one income",
      "Not a recommendation",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter capital once", description: "Use the same lump sum for both columns." },
      { title: "Compare monthly income", description: "See day-one cash flow difference." },
      { title: "Review five-year totals", description: "Include bonus effects where applicable." },
      { title: "Discuss with adviser", description: "Choose structure based on income need and liquidity." },
    ],
    readingSections: [
      {
        heading: "Choosing between income profiles",
        paragraphs: [
          "Clients near retirement with high immediate income needs may lean toward 14.2%. Those with flexibility and five-year certainty may prefer 12.8% with bonus.",
          "Everest is one solution among many. AS Brokers remains independent and surveys the market.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which is better?",
        answer:
          "Neither is universally better. Depends on income timing, tax, liquidity, and risk tolerance. Advice is required.",
      },
      {
        question: "What is the R100,000 minimum for?",
        answer:
          "Everest voluntary income products typically require a R100,000 minimum lump sum. Confirm current terms in a suitability review.",
      }
    ],
    ...EVEREST,
  },

  "asset-012-strategic-growth": {
    shortTitle: "Everest 14.5% Strategic Growth Calculator",
    seoTitle: "Everest 14.5% Strategic Growth Calculator",
    seoDescription:
      "Project five-year maturity value for Everest 14.5% Strategic Growth. Compound growth illustration after tax. R100k minimum. FSP 17273.",
    keywords: ["Everest 14.5 calculator", "Strategic Growth calculator", "Everest compound growth"],
    kicker: "Everest Wealth",
    heroTitle: "Model Everest 14.5% Strategic Growth",
    heroSubtitle:
      "Pure compounding with no monthly withdrawals. Returns accumulate over five years and pay at maturity.",
    heroImage: "/images/calc-lcp/asset-012.webp",
    heroImageAlt: "Patient capital growth — waiting for maturity in a thriving field",
    calculatorLead:
      "Enter lump sum to see five-year maturity illustration with growth taxed at maturity per tool assumptions.",
    sidePanelTitle: "Growth without income",
    sidePanelParagraphs: [
      "Strategic Growth suits clients who do not need monthly income and want capital working until maturity.",
      "Illiquid five-year commitment. Early exit subject to issuer rules.",
    ],
    sidePanelBullets: [
      "14.5% targeted compound p.a.",
      "No monthly withdrawals",
      "Tax on growth at maturity",
      "R100,000 minimum",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Five-year illiquid commitment. Early exit penalties may apply."],
    howToSteps: [
      { title: "Enter capital", description: "R100,000 minimum voluntary lump sum." },
      { title: "Review compound path", description: "See illustrative growth to maturity." },
      { title: "Note tax at maturity", description: "20% DWT on growth per tool logic." },
      { title: "Compare income products", description: "Use Income vs Growth comparison if you need cash flow." },
    ],
    readingSections: [
      {
        heading: "When growth beats income",
        paragraphs: [
          "Clients still earning employment income may not need dividends today. Compounding can be tax-efficient relative to frequent drawdowns.",
          "Match product choice to your income timeline and emergency liquidity needs.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I draw income from Strategic Growth?",
        answer: "This profile is designed for compounding without monthly withdrawals. Income products are separate.",
      },
      {
        question: "Is 14.5% guaranteed?",
        answer:
          "No. Strategic Growth uses a targeted return profile. Capital is typically committed for five years with liquidity constraints.",
      }
    ],
    ...EVEREST,
  },

  "asset-013-everest-income-vs-growth": {
    shortTitle: "Everest Income vs Growth Comparison",
    seoTitle: "Everest Income vs Growth Calculator Comparison",
    seoDescription:
      "Compare Everest 12.8% income, 14.2% income, and 14.5% growth strategies side by side. Free three-way calculator. FSP 17273.",
    keywords: ["Everest income vs growth", "Everest comparison calculator", "Everest Wealth strategies"],
    kicker: "Everest Wealth",
    heroTitle: "Compare income and growth strategies",
    heroSubtitle:
      "Three Everest-style profiles on one screen: monthly income, bonus effects, and growth maturity outcomes.",
    heroImage: "/images/calc-lcp/asset-013.webp",
    heroImageAlt: "Couple comparing income-now lifestyle with growth outside the window",
    calculatorLead:
      "Enter capital to compare 12.8% income, 14.2% income, and 14.5% growth illustrations together.",
    sidePanelTitle: "Full strategy selection",
    sidePanelParagraphs: [
      "Most clients need to see income now, bonus trade-offs, and pure growth in one view before they can choose.",
      "This is the education step before a suitability call with FSP 17273.",
    ],
    sidePanelBullets: [
      "Three strategies compared",
      "Income and maturity outcomes",
      "Educational illustration",
      "Liquidity warnings apply",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter lump sum", description: "Same capital across all three strategies." },
      { title: "Compare income lines", description: "12.8% and 14.2% monthly illustrations." },
      { title: "Review growth maturity", description: "14.5% compound outcome at five years." },
      { title: "Book advice", description: "Confirm suitability and liquidity with an adviser." },
    ],
    readingSections: [
      {
        heading: "Education before product selection",
        paragraphs: [
          "Everest voluntary products are unlisted preference share structures with targeted returns, not bank deposits.",
          "Independent advisers explain risk, liquidity, and tax before any application is submitted.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does AS Brokers only recommend Everest?",
        answer:
          "No. We are independent Category 1.8 FSP 17273 and survey the market. Everest is one solution where appropriate.",
      },
      {
        question: "Are these returns guaranteed?",
        answer:
          "No. All figures are targeted structural profiles for education. Suitability, liquidity, and tax review are required before investing.",
      }
    ],
    ...EVEREST,
  },

  "asset-014-living-annuity": {
    shortTitle: "Living Annuity Income Calculator",
    seoTitle: "Living Annuity Calculator South Africa",
    seoDescription:
      "Model living annuity income in the 2.5% to 17.5% drawdown band. Free SA calculator with Amethyst-style notes. Educational only. FSP 17273.",
    keywords: [
      "living annuity calculator",
      "retirement annuity drawdown",
      "Amethyst living annuity calculator",
      "2.5% to 17.5% drawdown",
    ],
    kicker: "Living annuity",
    heroTitle: "Model living annuity drawdown income",
    heroSubtitle:
      "Estimate income from pension, RA, or preservation capital using illustrative growth and drawdown rates in the regulated 2.5% to 17.5% band.",
    heroImage: "/images/calc-lcp/asset-014.webp",
    heroImageAlt: "Retired couple reviewing living annuity drawdown with an adviser",
    calculatorLead:
      "Enter capital, a drawdown percentage between 2.5% and 17.5%, and growth assumptions to see illustrative monthly income and sustainability notes.",
    sidePanelTitle: "Post-retirement capital",
    sidePanelParagraphs: [
      "Retirees with pension, RA, or preservation funds often face living annuity decisions at retirement. Drawdown rate drives income and longevity.",
      "South African living annuities generally allow annual drawdowns between 2.5% and 17.5%. Pair with Life of Capital to stress-test whether income lasts.",
    ],
    sidePanelBullets: [
      "2.5% to 17.5% drawdown band",
      "Inflation and growth stress-tests",
      "Retired client pathway",
      "Not a product quote",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Living annuity drawdowns typically sit between 2.5% and 17.5% a year. Confirm product rules before acting.",
      "Amethyst and other structured yield ideas may complement a living annuity where suitable — liquidity and suitability rules apply.",
    ],
    howToSteps: [
      { title: "Enter annuity capital", description: "Lump sum moving into living annuity." },
      {
        title: "Set drawdown %",
        description: "Use a rate in the 2.5% to 17.5% band. Real products apply specific annual review rules.",
      },
      { title: "Add growth assumption", description: "Stress-test conservative and moderate returns." },
      { title: "Review sustainability", description: "Use Life of Capital tool for longevity check." },
    ],
    readingSections: [
      {
        heading: "Drawdown decisions at retirement",
        paragraphs: [
          "Choosing drawdown is choosing how much future income you keep. Too high early on can destroy capital in a bad sequence of returns.",
          "Amethyst and structured yield solutions may complement living annuities where suitable. Liquidity constraints and a suitability review apply. Advice is essential.",
        ],
      },
    ],
    faqs: [
      {
        question: "What drawdown band applies to living annuities?",
        answer:
          "South African living annuities generally allow annual drawdowns between 2.5% and 17.5%. This tool illustrates scenarios inside that band; confirm your product’s rules with an adviser.",
      },
      {
        question: "Is Amethyst the same as a living annuity?",
        answer:
          "No. Amethyst-style structured yield may complement retirement income where suitable. Living annuities have their own regulatory drawdown band, liquidity, and tax treatment. Suitability review required.",
      },
      {
        question: "Does this replace a product quote?",
        answer:
          "No. Results are educational only. Personal advice requires a needs analysis with AS Brokers CC (FSP 17273).",
      },
    ],
    ...RETIREMENT,
  },

  "asset-015-average-clause": {
    shortTitle: "Average Clause Calculator",
    seoTitle: "Average Clause Calculator South Africa | Underinsurance",
    seoDescription:
      "See how underinsurance reduces insurance claims when the average clause applies. Free average clause calculator for home and business assets. FSP 17273.",
    keywords: ["average clause calculator", "underinsurance calculator", "insurance claim reduction"],
    kicker: "Insurance & risk",
    heroTitle: "How underinsurance cuts your claim",
    heroSubtitle:
      "Illustrate claim reduction when sum insured is below replacement value. Essential for home, contents, and commercial property.",
    heroImage: "/images/calc-lcp/asset-015.webp",
    heroImageAlt: "Homeowners checking cover — underinsurance can cut a claim",
    calculatorLead:
      "Enter replacement value, sum insured, and claim amount to see illustrative payment after average clause application.",
    sidePanelTitle: "The average clause",
    sidePanelParagraphs: [
      "Insurers may reduce claims proportionally when you are underinsured. The average clause catches families and businesses off guard after a loss.",
      "Use this before renewing property cover with your broker.",
    ],
    sidePanelBullets: [
      "Home and contents education",
      "Commercial property risk",
      "Sum insured vs replacement value",
      "Book a risk review",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter replacement value", description: "True cost to replace the asset today." },
      { title: "Enter sum insured", description: "What your policy schedule shows." },
      { title: "Add claim amount", description: "Loss value you are claiming for." },
      { title: "See reduced payout", description: "Illustrative payment after average clause." },
    ],
    readingSections: [
      {
        heading: "Why sums insured drift",
        paragraphs: [
          "Building costs, contents inflation, and renovations push replacement values up while policies stay static. Annual reviews prevent average clause shocks.",
          "AS Brokers reviews short-term and commercial cover across multiple insurers including Santam, Old Mutual, and Bryte.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this apply to all policies?",
        answer:
          "Average clause mechanics depend on policy wording. This tool educates on common principles. Review your schedule with your broker.",
      },
      {
        question: "Does this assess my claim?",
        answer:
          "No. It shows how the average clause can reduce a claim when underinsured. Ask your broker to review sums insured.",
      }
    ],
    ...INSURANCE,
  },

  "asset-016-growth-comparison": {
    shortTitle: "Power of Growth Calculator",
    seoTitle: "Investment Growth Calculator South Africa | Power of Growth",
    seoDescription:
      "Project future value of lump sum plus monthly contributions at your chosen growth rate. Free compound growth calculator. FSP 17273.",
    keywords: ["investment growth calculator", "compound growth calculator South Africa", "wealth calculator"],
    kicker: "Wealth building",
    heroTitle: "See the power of compound growth",
    heroSubtitle:
      "Project how lump sums and monthly contributions may grow over time at an illustrative return rate.",
    heroImage: "/images/calc-lcp/asset-016.webp",
    heroImageAlt: "Father and child watering a young tree — compound growth over time",
    calculatorLead:
      "Enter starting capital, monthly contributions, growth rate, and years to see illustrative future value.",
    sidePanelTitle: "Compound growth education",
    sidePanelParagraphs: [
      "Small contribution increases early in a career often matter more than large lump sums late in life because of compounding time.",
      "Use realistic return assumptions and discuss tax wrappers with an adviser.",
    ],
    sidePanelBullets: [
      "Lump sum plus contributions",
      "Multi-year projection",
      "Life stage wealth building",
      "Not a performance guarantee",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter starting amount", description: "Current investments or lump sum." },
      { title: "Add monthly contributions", description: "Regular savings into the plan." },
      { title: "Set growth and years", description: "Illustrative return and time horizon." },
      { title: "Review projection", description: "Use as motivation, not a promise of returns." },
    ],
    readingSections: [
      {
        heading: "Time beats timing",
        paragraphs: [
          "Consistent contributions through volatile markets often outperform waiting for the perfect entry point.",
          "Tax-free savings, retirement annuities, and voluntary products each have different tax and liquidity rules.",
        ],
      },
    ],
    faqs: [
      {
        question: "What growth rate should I assume?",
        answer:
          "Use conservative bands for planning. Historical returns do not guarantee future performance.",
      },
      {
        question: "Are growth rates guaranteed?",
        answer:
          "No. You choose an illustrative rate. Markets, fees, and tax change real outcomes. Discuss assumptions with FSP 17273.",
      }
    ],
    ...WEALTH,
  },

  "asset-017-personal-goal": {
    shortTitle: "Personal Goal Growth Calculator",
    seoTitle: "Personal Financial Goal Calculator South Africa",
    seoDescription:
      "Set a financial goal, target date, and see required growth and contributions month by month. Free personal goal calculator. FSP 17273.",
    keywords: ["financial goal calculator", "savings goal calculator", "personal goal growth rate"],
    kicker: "Wealth building",
    heroTitle: "Hit your personal financial goal on time",
    heroSubtitle:
      "Set a target amount and date. See the illustrative growth rate and contribution path required to get there.",
    heroImage: "/images/calc-lcp/asset-017.webp",
    heroImageAlt: "Packing for a funded personal goal reached on time",
    calculatorLead:
      "Enter goal amount, target date, starting capital, and contributions to see required growth and month-by-month illustration.",
    sidePanelTitle: "Goal-based planning",
    sidePanelParagraphs: [
      "Goals like education, property deposits, or retirement capital are easier to fund when you know the required return and contribution discipline.",
      "This tool produces a planning spreadsheet mindset before product selection.",
    ],
    sidePanelBullets: [
      "Target date planning",
      "Required return illustration",
      "Contribution schedule view",
      "Pairs with Retirement Growth tool",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Name your goal", description: "Enter target capital and deadline." },
      { title: "Add what you have", description: "Current savings and monthly contributions." },
      { title: "See required rate", description: "Illustrative growth needed to hit the goal." },
      { title: "Adjust inputs", description: "Extend date or raise contributions if rate looks unrealistic." },
    ],
    readingSections: [
      {
        heading: "Goals before products",
        paragraphs: [
          "Product-led advice often fails because the goal was never defined. Start with the outcome, then choose wrappers tax-efficiently.",
          "FSP 17273 advisers help align goals across retirement, estate, and risk cover.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can this plan my retirement?",
        answer:
          "Yes as an educational step. Pair with Retirement Reality Check and Growth Rate calculators for retirement-specific planning.",
      },
      {
        question: "Is this a savings product quote?",
        answer:
          "No. It is an educational goal planner. Product selection and contributions need a personal advice process.",
      }
    ],
    ...WEALTH,
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
  const entry = getCalculatorById(id);
  if (!entry) return undefined;
  if (!PAGES[entry.id]) return undefined;
  return buildConfig(entry);
}

export function getAllCalculatorPageConfigs(): CalculatorPageConfig[] {
  return CALCULATOR_REGISTRY.map(buildConfig);
}

export const CALCULATOR_PAGE_SLUGS = CALCULATOR_REGISTRY.map((e) => e.id);
