import { BusinessRiskReviewsAdmin } from "@/components/crm/BusinessRiskReviewsAdmin";
import { listBusinessRiskReviews } from "@/lib/business-risk/repository";

export const metadata = {
  title: "Business Risk Reviews | Team office",
  description: "Admin dashboard for Business Risk Review™ submissions.",
  robots: { index: false, follow: false },
};

export default async function BusinessRiskReviewsAdminPage() {
  const rows = await listBusinessRiskReviews();
  const serialized = rows.map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString(),
  }));
  return <BusinessRiskReviewsAdmin initialRows={serialized} />;
}
