import { CrmDashboardClient } from "@/components/crm/CrmDashboardClient";

export const metadata = {
  title: "Home | AS Brokers",
  description: "Staff home — Insights, Courses, Newsletter, and leads.",
};

export default function CrmDashboardPage() {
  return <CrmDashboardClient />;
}
