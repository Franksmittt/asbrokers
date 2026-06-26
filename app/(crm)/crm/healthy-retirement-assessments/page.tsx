import { HealthyRetirementAssessmentsAdmin } from "@/components/crm/HealthyRetirementAssessmentsAdmin";
import { listHealthyRetirementAssessments } from "@/lib/healthy-retirement/repository";

export const metadata = {
  title: "Healthy Retirement Assessments | Team office",
  description: "Admin dashboard for Healthy Retirement Blueprint™ submissions.",
  robots: { index: false, follow: false },
};

export default async function HealthyRetirementAssessmentsAdminPage() {
  const rows = await listHealthyRetirementAssessments();
  const serialized = rows.map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString(),
  }));
  return <HealthyRetirementAssessmentsAdmin initialRows={serialized} />;
}
