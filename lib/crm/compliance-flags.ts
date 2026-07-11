import type { CrmLead } from "@/lib/crm/types";

export type ComplianceFlag = {
  severity: "high" | "medium";
  code: string;
  message: string;
};

export const AMETHYST_DRAWDOWN_MAX = 17.5;
export const EVEREST_VOLUNTARY_MIN = 100_000;

function parseDrawdownFromText(text: string): number | null {
  if (!text.trim()) return null;
  const patterns = [
    /drawdown[^0-9]*(\d+(?:\.\d+)?)\s*%/i,
    /(\d+(?:\.\d+)?)\s*%\s*(?:drawdown|income drawdown|annual drawdown)/i,
    /(\d+(?:\.\d+)?)\s*%\s*(?:p\.a\.|per annum)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const value = parseFloat(match[1]);
      if (!Number.isNaN(value)) return value;
    }
  }
  return null;
}

/** Client-safe compliance flags derived from lead data (no DB writes). */
export function getLeadComplianceFlags(lead: CrmLead): ComplianceFlag[] {
  const flags: ComplianceFlag[] = [];

  const sessionPct = lead.calculatorSession?.drawdownPercentage;
  if (sessionPct != null && sessionPct > AMETHYST_DRAWDOWN_MAX) {
    flags.push({
      severity: "high",
      code: "drawdown_exceeded",
      message: `Amethyst drawdown ${sessionPct}% exceeds ${AMETHYST_DRAWDOWN_MAX}% regulatory maximum, suitability review required.`,
    });
  }

  const textSources = [lead.funnelData.keyRisk, lead.intent, lead.funnelData.assessment]
    .filter(Boolean)
    .join(" ");
  const textPct = parseDrawdownFromText(textSources);
  if (
    textPct != null &&
    textPct > AMETHYST_DRAWDOWN_MAX &&
    !flags.some((f) => f.code === "drawdown_exceeded")
  ) {
    flags.push({
      severity: "high",
      code: "drawdown_exceeded",
      message: `Detected ${textPct}% drawdown reference, exceeds Amethyst ${AMETHYST_DRAWDOWN_MAX}% limit.`,
    });
  }

  if (
    lead.service_category === "retirement_everest" &&
    lead.estimatedCapital > 0 &&
    lead.estimatedCapital < EVEREST_VOLUNTARY_MIN
  ) {
    flags.push({
      severity: "medium",
      code: "below_everest_minimum",
      message: "Estimated capital below R100k voluntary Everest minimum, confirm product suitability.",
    });
  }

  return flags;
}

export function hasHighComplianceFlags(lead: CrmLead): boolean {
  return getLeadComplianceFlags(lead).some((f) => f.severity === "high");
}
