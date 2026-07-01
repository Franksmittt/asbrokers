/**
 * Public /calculators hub — curated per Albert CRM export (2026-06-18).
 *
 * Policy: include calculators where keep=true OR Albert's notes explicitly say
 * "keep public" / "should remain". Hide everything else until rebuilt per notes.
 * Individual calculator routes remain live for SEO/bookmarks; hub is the curated front door.
 */

export type HubCalculator = {
  embedId: string;
  sectionId: string;
  sectionTitle: string;
  sectionQuestion?: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  leadsTo: string;
  href: string;
  featured?: boolean;
  leadsToAccent?: boolean;
};

export const PUBLIC_HUB_EMBED_IDS = [
  "retirement-reality",
  "retirement-shortfall",
  "future-value",
  "wealth-building",
] as const;

export const HUB_SECTIONS = {
  retirement: {
    id: "retirement-planning",
    title: "Retirement & Wealth Planning",
    question: "How much capital do I need — and am I on track to get there?",
  },
  inflation: {
    id: "purchasing-power",
    title: "Purchasing Power & Inflation",
    question: "What is inflation doing to my money over time?",
  },
} as const;

/** Public hub is intentionally empty while calculators are rebuilt (June 2026). */
export const HUB_CALCULATORS: HubCalculator[] = [];

export function getHubCalculatorsBySection(sectionId: string): HubCalculator[] {
  return HUB_CALCULATORS.filter((c) => c.sectionId === sectionId);
}
