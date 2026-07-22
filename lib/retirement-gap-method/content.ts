/**
 * Editable content for Asset 018: The Retirement Gap Method™ cornerstone page.
 * Workshop fields stay soft (no hard-coded session dates). Update here when Albert supplies schedules.
 */

import { calculatorPagePath } from "@/lib/calculators/page-path";

export const METHOD_PATH = "/retirement-gap-method";
export const TOOLKIT_PATH = "/calculators";
export const WORKSHOP_REGISTER_HREF = "/contact?source=retirement_gap_workshop";
export const REVIEW_HREF = "/contact?source=retirement_gap_review";
export const FFC_PATH = "/financial-freedom-community";
export const FFC_REGISTER_PATH = "/financial-freedom-community/register";

/** Workshop block, keep dates editable / TBA; never hard-code a stale calendar. */
export const RETIREMENT_GAP_WORKSHOP = {
  eyebrow: "Complimentary educational workshop",
  title: "Retirement Gap Method™ Workshop",
  lead:
    "Learn how the Toolkit calculators, education and advice pathways fit together in one practical session.",
  bullets: [
    "How to understand and measure your Retirement Gap",
    "How the Toolkit calculators work as a journey, not isolated tools",
    "Common retirement planning mistakes to avoid",
    "Where the Financial Freedom Community™ fits after the workshop",
    "When a personalised Retirement Gap Review may help",
  ],
  /** Soft status copy, replace when a live session is confirmed. */
  scheduleNote: "Upcoming session dates are announced periodically. Reserve your interest to be notified.",
  formatNote: "Complimentary educational workshop. No product pitch. Educational purposes only.",
  primaryCtaLabel: "Reserve My Workshop Seat",
  primaryCtaHref: WORKSHOP_REGISTER_HREF,
  secondaryCtaLabel: "Explore the Toolkit first",
  secondaryCtaHref: TOOLKIT_PATH,
} as const;

export const METHOD_JOURNEY_STEPS = [
  {
    step: "01",
    title: "Discover",
    description: "Recognise that a Retirement Gap may exist and why understanding comes before products.",
  },
  {
    step: "02",
    title: "Measure",
    description: "Use the Retirement Gap Toolkit™ to quantify capital, income need, longevity and growth.",
  },
  {
    step: "03",
    title: "Understand",
    description: "Interpret results through the Method, what the numbers mean for decisions that matter.",
  },
  {
    step: "04",
    title: "Improve",
    description: "Identify levers: time, contributions, expectations, strategy and sustainable withdrawals.",
  },
  {
    step: "05",
    title: "Review",
    description: "Revisit progress regularly, and book personalised advice when you are ready.",
  },
] as const;

export const GAP_CAUSE_CARDS = [
  { title: "Started saving too late", description: "Fewer years of compounding leave a larger shortfall to close." },
  { title: "Saved too little", description: "Contribution rates that feel manageable today may not fund tomorrow’s lifestyle." },
  { title: "Inflation", description: "Rising living costs quietly raise the income you will need in retirement." },
  { title: "Investment fees", description: "Costs compound against you, small percentages matter over decades." },
  { title: "Poor investment decisions", description: "Chasing returns or reacting to markets can derail long-term plans." },
  { title: "Early withdrawals", description: "Accessing retirement capital early reduces what remains for later life." },
  { title: "Living longer than expected", description: "Longevity is a gift, and a funding challenge for sustainable income." },
  { title: "Rising retirement expenses", description: "Healthcare, housing and lifestyle costs can outpace early assumptions." },
] as const;

export const LEARN_PATH_CARDS = [
  {
    title: "Learn Independently",
    description: "Read articles and use the Retirement Gap Toolkit™ at your own pace.",
    ctaLabel: "Explore Calculators",
    ctaHref: TOOLKIT_PATH,
  },
  {
    title: "Join the Complimentary Workshop",
    description: "Learn how all the pieces fit together in a guided educational session.",
    ctaLabel: "Reserve My Seat",
    ctaHref: WORKSHOP_REGISTER_HREF,
  },
  {
    title: "Receive Personalised Advice",
    description: "Book a Retirement Gap Review with an authorised AS Brokers adviser.",
    ctaLabel: "Book Appointment",
    ctaHref: REVIEW_HREF,
  },
] as const;

/** Featured Toolkit tools linked from the Method page. */
export const METHOD_TOOLKIT_LINKS = [
  {
    title: "Retirement Reality Check",
    description: "Have I saved enough, and how big is the gap?",
    href: calculatorPagePath("asset-002-retirement-reality-check"),
    assetCode: "ASSET 002",
  },
  {
    title: "Retirement Premium Calculator",
    description: "What monthly saving may close the gap?",
    href: calculatorPagePath("asset-003-retirement-premium"),
    assetCode: "ASSET 003",
  },
  {
    title: "Life of Capital Calculator",
    description: "Will my retirement income last?",
    href: calculatorPagePath("asset-004-life-of-capital"),
    assetCode: "ASSET 004",
  },
  {
    title: "Retirement Growth Rate Calculator",
    description: "What growth rate might I need?",
    href: calculatorPagePath("asset-001-retirement-growth"),
    assetCode: "ASSET 001",
  },
  {
    title: "Living Annuity Income & Sustainability",
    description: "Is my retirement income sustainable?",
    // CONTAINMENT 2026-07-22: Asset 014 frozen pending product/wording review
    href: "/calculators",
    assetCode: "ASSET 014",
  },
  {
    title: "Power of Growth Calculator",
    description: "What is the financial cost of waiting?",
    href: calculatorPagePath("asset-016-growth-comparison"),
    assetCode: "ASSET 016",
  },
] as const;

export const METHOD_FAQS = [
  {
    question: "What is the Retirement Gap Method™?",
    answer:
      "It is a practical educational framework that helps South Africans understand, measure and progressively close their Retirement Gap through better financial decisions, using calculators, education, workshops, community learning and personalised advice where appropriate.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. The Method page, Toolkit calculators and workshop are educational. Personalised financial advice requires a suitability process with AS Brokers CC (FSP 17273).",
  },
  {
    question: "Do I need to complete every calculator?",
    answer:
      "No. Start with the questions that matter most to you. Together the Toolkit tools provide a fuller picture, but you do not need to complete every calculator before taking a next step.",
  },
  {
    question: "How long does the Toolkit take?",
    answer:
      "Most individual calculators take a few minutes. Exploring several tools thoughtfully may take 20–40 minutes. You can return anytime as your circumstances change.",
  },
  {
    question: "Should I complete the calculators before attending the workshop?",
    answer:
      "It helps, but it is not required. Completing a Reality Check or Life of Capital illustration beforehand often makes the workshop more practical.",
  },
  {
    question: "Is the workshop free?",
    answer:
      "Yes. The Retirement Gap Method™ Workshop is positioned as a complimentary educational session. Confirm details when you reserve your seat.",
  },
  {
    question: "Can I use the Toolkit if I am already retired?",
    answer:
      "Yes. Tools such as Life of Capital and the Living Annuity Income & Sustainability Calculator are especially relevant after retirement. The Method still helps you measure and improve your position.",
  },
  {
    question: "Will the Financial Freedom Community be explained during the workshop?",
    answer:
      "Yes. The workshop introduces how the Community fits as a deeper educational pathway after you understand the Method and Toolkit.",
  },
  {
    question: "Can I book an appointment instead?",
    answer:
      "Yes. You can book a Retirement Gap Review at any time if you prefer personalised advice rather than, or in addition to, self-guided learning.",
  },
] as const;
