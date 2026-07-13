"use client";

import { useSearchParams } from "next/navigation";

const TEAL = "#0F766E";

const SOURCE_LABELS: Record<string, string> = {
  investments_terminal: "Continuing from the Investments hub",
  insurance_terminal: "Continuing from the Insurance risk audit",
  estate_terminal: "Continuing from Estate planning",
  insights_terminal: "Continuing from the Insights library",
  about_terminal: "Continuing from About AS Brokers",
  calculators_terminal: "Continuing after the calculator library",
  calculator_terminal: "Continuing after a calculator result",
  everest_terminal: "Continuing from the Everest Wealth hub",
  medical_terminal: "Continuing from medical aid & gap structuring",
  home_hero: "Continuing from the homepage",
  home_journey: "Continuing from the homepage journey",
  home_pathways: "Continuing from the homepage",
  nav_cta: "Continuing from the site navigation",
};

/**
 * Source-context line from ?source= — client-only (useSearchParams).
 * Renders null when no known source (matches prior ContactPageView behavior).
 */
export function ContactIntakeBanner() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "";
  const label = SOURCE_LABELS[source];
  if (!label) return null;
  return (
    <p
      className="mt-5 border-l-2 pl-4 text-sm font-medium text-stone-700"
      style={{ borderColor: TEAL }}
    >
      {label}
    </p>
  );
}
