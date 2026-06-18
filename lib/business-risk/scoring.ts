import { ALL_RISK_COVER_ITEMS, TOTAL_RISK_COVER_COUNT } from "@/lib/business-risk/catalog";

export type ProtectionBand = "strong" | "moderate" | "high_risk";

export type BusinessRiskScore = {
  coveredCount: number;
  totalCount: number;
  gapCount: number;
  protectionPercent: number;
  band: ProtectionBand;
  bandLabel: string;
  selectedIds: string[];
  missingIds: string[];
};

export function calculateBusinessRiskScore(selectedIds: string[]): BusinessRiskScore {
  const selectedSet = new Set(selectedIds);
  const validSelected = ALL_RISK_COVER_ITEMS.filter((item) => selectedSet.has(item.id)).map((i) => i.id);
  const missingIds = ALL_RISK_COVER_ITEMS.filter((item) => !selectedSet.has(item.id)).map((i) => i.id);
  const coveredCount = validSelected.length;
  const totalCount = TOTAL_RISK_COVER_COUNT;
  const gapCount = totalCount - coveredCount;
  const protectionPercent = totalCount > 0 ? Math.round((coveredCount / totalCount) * 100) : 0;
  const band = getProtectionBand(protectionPercent);

  return {
    coveredCount,
    totalCount,
    gapCount,
    protectionPercent,
    band,
    bandLabel: getProtectionBandLabel(band),
    selectedIds: validSelected,
    missingIds,
  };
}

export function getProtectionBand(percent: number): ProtectionBand {
  if (percent >= 70) return "strong";
  if (percent >= 40) return "moderate";
  return "high_risk";
}

export function getProtectionBandLabel(band: ProtectionBand | string): string {
  switch (band) {
    case "strong":
      return "Strong Protection";
    case "moderate":
      return "Moderate Protection";
    case "high_risk":
      return "High Risk Exposure";
    default:
      return "Moderate Protection";
  }
}

export function getProtectionBandColor(band: ProtectionBand): string {
  switch (band) {
    case "strong":
      return "#166534";
    case "moderate":
      return "#c2410c";
    case "high_risk":
      return "#b91c1c";
  }
}
