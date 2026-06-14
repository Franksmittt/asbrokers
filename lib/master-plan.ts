export type MasterPlanPillar = {
  slug: string;
  href: string;
  pillar: "Health" | "Wealth" | "Legacy" | "Business";
  asset: string;
  shortAsset: string;
  theme: string;
  problem: string;
  purpose: string;
  coreQuestion: string;
  leadMagnet: string;
  ctaLabel: string;
  accent: {
    text: string;
    border: string;
    bg: string;
    glow: string;
  };
  topics: string[];
  funnel: string[];
  revenueConversations: string[];
};

export const masterPlanPillars: MasterPlanPillar[] = [
  {
    slug: "104-week-watch-challenge",
    href: "/blueprints/104-week-watch-challenge",
    pillar: "Health",
    asset: "104 Week Watch Challenge",
    shortAsset: "Health Challenge",
    theme: "Create the body that can enjoy retirement.",
    problem: "People are living longer but becoming less healthy.",
    purpose:
      "Help clients improve health, fitness, energy, and quality of life through consistent weekly action.",
    coreQuestion: "Will your body survive retirement?",
    leadMagnet: "Health Scorecard",
    ctaLabel: "Start the health challenge",
    accent: {
      text: "text-teal-300",
      border: "border-teal-400/25",
      bg: "bg-teal-400/10",
      glow: "shadow-[0_0_50px_rgba(45,212,191,0.12)]",
    },
    topics: [
      "Discovery Vitality",
      "VO2 max",
      "Exercise",
      "Weight loss",
      "Sleep",
      "Recovery",
      "Nutrition",
      "Preventative health",
    ],
    funnel: [
      "Health article or video",
      "Health Scorecard",
      "104 Week Watch Challenge",
      "Weekly education and accountability",
      "Medical aid, gap cover, and retirement readiness conversation",
    ],
    revenueConversations: ["Medical aid", "Gap cover", "Wellness planning", "Retirement readiness"],
  },
  {
    slug: "retirement-survival-blueprint",
    href: "/retirement-survival-blueprint",
    pillar: "Wealth",
    asset: "Retirement Survival Blueprint",
    shortAsset: "Retirement Blueprint",
    theme: "Protect retirement income from inflation, drawdown, and capital run-out.",
    problem: "Most retirement plans are built to reach retirement, not survive it.",
    purpose:
      "Help clients determine whether their money can provide sustainable income throughout retirement.",
    coreQuestion: "Will your money survive your retirement?",
    leadMagnet: "Retirement Survival Blueprint",
    ctaLabel: "Get the retirement blueprint",
    accent: {
      text: "text-blue-300",
      border: "border-blue-400/25",
      bg: "bg-blue-400/10",
      glow: "shadow-[0_0_50px_rgba(96,165,250,0.12)]",
    },
    topics: [
      "Retirement planning",
      "Inflation",
      "Living annuities",
      "Investments",
      "Retirement income",
      "Capital preservation",
      "Financial freedom",
    ],
    funnel: [
      "Retirement article or video",
      "Run-out or retirement capital calculator",
      "Retirement Survival Blueprint download",
      "Educational email sequence",
      "Discovery meeting",
      "Financial plan and implementation",
    ],
    revenueConversations: [
      "Financial planning",
      "Investments",
      "Living annuities",
      "Retirement annuities",
      "Ongoing advice",
    ],
  },
  {
    slug: "legacy-blueprint",
    href: "/blueprints/legacy-blueprint",
    pillar: "Legacy",
    asset: "Legacy Blueprint",
    shortAsset: "Legacy Blueprint",
    theme: "Preserve family wealth and transfer it with clarity.",
    problem: "Many families spend a lifetime building wealth but fail to transfer it efficiently.",
    purpose:
      "Help families protect wealth, reduce avoidable estate friction, and transfer assets to the next generation.",
    coreQuestion: "What happens to your family and wealth if you die tomorrow?",
    leadMagnet: "Legacy Conversations Guide",
    ctaLabel: "Get the legacy guide",
    accent: {
      text: "text-amber-300",
      border: "border-amber-400/25",
      bg: "bg-amber-400/10",
      glow: "shadow-[0_0_50px_rgba(251,191,36,0.12)]",
    },
    topics: [
      "Wills",
      "Trusts",
      "Estate planning",
      "Executors",
      "Beneficiary reviews",
      "Family wealth transfer",
      "Estate duty planning",
    ],
    funnel: [
      "Legacy article",
      "Estate duty calculator",
      "Legacy Conversations Guide",
      "Estate planning email sequence",
      "Will or trust review",
      "Estate and liquidity planning",
    ],
    revenueConversations: ["Wills", "Trusts", "Life cover liquidity", "Estate planning", "Ongoing advice"],
  },
  {
    slug: "business-survival-blueprint",
    href: "/blueprints/business-survival-blueprint",
    pillar: "Business",
    asset: "Business Survival Blueprint",
    shortAsset: "Business Blueprint",
    theme: "Protect the business that funds the household and legacy.",
    problem: "A single disruption can damage the owner's income, wealth plan, and family legacy.",
    purpose:
      "Help business owners identify risks that could interrupt, damage, or destroy their business.",
    coreQuestion: "Could your business survive a major disruption?",
    leadMagnet: "Business Insurance Review Workbook",
    ctaLabel: "Get the business workbook",
    accent: {
      text: "text-rose-300",
      border: "border-rose-400/25",
      bg: "bg-rose-400/10",
      glow: "shadow-[0_0_50px_rgba(251,113,133,0.12)]",
    },
    topics: [
      "Commercial insurance",
      "Business assurance",
      "Key person cover",
      "Buy and sell agreements",
      "Cyber risks",
      "Liability",
      "Succession planning",
      "Business continuity",
    ],
    funnel: [
      "Business risk article",
      "Business risk checklist",
      "Business Insurance Review Workbook",
      "Owner email sequence",
      "Business risk review",
      "Commercial and assurance implementation",
    ],
    revenueConversations: [
      "Commercial insurance",
      "Business assurance",
      "Key person cover",
      "Buy and sell cover",
      "Succession planning",
    ],
  },
];

export const masterPlanStatement =
  "We help people build healthier lives, stronger finances, resilient businesses, and lasting legacies through education, planning, protection, and long-term thinking.";

export const marketingSystemSteps = [
  "Article or video",
  "Calculator or assessment",
  "Lead magnet",
  "Email sequence",
  "Appointment invitation",
  "Client advice relationship",
];

export function getMasterPlanPillar(slug: string) {
  return masterPlanPillars.find((pillar) => pillar.slug === slug);
}
