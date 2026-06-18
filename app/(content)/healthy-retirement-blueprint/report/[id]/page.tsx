import { notFound } from "next/navigation";
import { HealthyRetirementReport } from "@/components/healthy-retirement/HealthyRetirementReport";
import { getHealthyRetirementAssessmentById } from "@/lib/healthy-retirement/repository";
import { getScoreBand } from "@/lib/healthy-retirement/scoring";

export const metadata = {
  title: "Your Healthy Retirement Blueprint™ | AS Brokers",
  description: "Your personalised Healthy Retirement Blueprint™ from AS Brokers.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

export default async function HealthyRetirementReportPage({ params }: Props) {
  const { id } = await params;

  if (id === "preview") {
    return (
      <HealthyRetirementReport
        firstName="Guest"
        healthScore={72}
        healthGap={28}
        bandLabel="Moderate Risk"
        scoreBand="moderate-risk"
      />
    );
  }

  const row = await getHealthyRetirementAssessmentById(id);
  if (!row) notFound();

  const { band, bandLabel } = getScoreBand(row.healthScore);

  return (
    <HealthyRetirementReport
      firstName={row.firstName}
      healthScore={row.healthScore}
      healthGap={row.healthGap}
      bandLabel={bandLabel}
      scoreBand={band}
      deliveredAt={row.createdAt.toISOString()}
    />
  );
}
