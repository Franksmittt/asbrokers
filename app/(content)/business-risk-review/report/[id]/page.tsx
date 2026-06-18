import { notFound } from "next/navigation";

import { BusinessRiskReportView } from "@/components/business-risk/BusinessRiskReportView";
import { getBusinessRiskReviewById } from "@/lib/business-risk/repository";
import { getProtectionBandLabel } from "@/lib/business-risk/scoring";
import { getRiskCoverById } from "@/lib/business-risk/catalog";

export const metadata = {
  title: "Business Risk Review Report | AS Brokers",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

export default async function BusinessRiskReportPage({ params }: Props) {
  const { id } = await params;
  const row = await getBusinessRiskReviewById(id);
  if (!row) notFound();

  const selectedIds = Array.isArray(row.selectedCoverIds) ? (row.selectedCoverIds as string[]) : [];
  const missingIds = Array.isArray(row.missingCoverIds) ? (row.missingCoverIds as string[]) : [];

  return (
    <BusinessRiskReportView
      business={{
        name: row.name,
        email: row.email,
        phone: row.phone,
        company: row.company,
        industry: row.industry,
        createdAt: row.createdAt.toISOString(),
      }}
      score={{
        coveredCount: row.coverageScore,
        totalCount: row.totalItems,
        gapCount: row.gapCount,
        protectionPercent: row.protectionPercent,
        bandLabel: getProtectionBandLabel(row.protectionBand as "strong" | "moderate" | "high_risk"),
      }}
      selectedLabels={selectedIds.map((cid) => getRiskCoverById(cid)?.label ?? cid)}
      missingLabels={missingIds.map((cid) => getRiskCoverById(cid)?.label ?? cid)}
    />
  );
}
