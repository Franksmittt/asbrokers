import type { ClientProfile } from "@/lib/mock-portal";

export type RetirementReadinessResult = {
  score: number;
  band: "excellent" | "good" | "attention" | "critical";
  headline: string;
  detail: string;
  impliedDrawdownPct: number;
};

/** Illustrative readiness score from portal profile (no DB). */
export function computeRetirementReadinessScore(profile: ClientProfile): RetirementReadinessResult {
  const annualIncome = profile.monthlyIncome * 12;
  const impliedDrawdownPct =
    profile.totalPortfolioValue > 0
      ? (annualIncome / profile.totalPortfolioValue) * 100
      : 0;

  let score = 100;
  score -= Math.abs(impliedDrawdownPct - 10) * 4;
  if (impliedDrawdownPct > 17.5) score -= 25;
  if (impliedDrawdownPct > 12) score -= 10;
  if (profile.totalPortfolioValue < 1_000_000) score -= 15;

  score = Math.max(0, Math.min(100, Math.round(score)));

  let band: RetirementReadinessResult["band"] = "good";
  if (score >= 85) band = "excellent";
  else if (score >= 65) band = "good";
  else if (score >= 45) band = "attention";
  else band = "critical";

  const headline =
    band === "excellent"
      ? "Strong retirement income resilience"
      : band === "good"
        ? "On track. Monitor drawdown annually"
        : band === "attention"
          ? "Drawdown or capital needs review"
          : "Urgent review recommended";

  const detail =
    impliedDrawdownPct > 17.5
      ? `Implied drawdown ${impliedDrawdownPct.toFixed(1)}% exceeds Amethyst 17.5% regulatory ceiling.`
      : `Implied portfolio drawdown ~${impliedDrawdownPct.toFixed(1)}% p.a. based on current income.`;

  return { score, band, headline, detail, impliedDrawdownPct };
}
