import { CrmExecutiveDashboard } from "@/components/crm/CrmExecutiveDashboard";
import { requireAdminAccess } from "@/lib/crm/staff-access";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Executive Command Centre",
  description: "Owner dashboard with AI pipeline intelligence.",
};

export default async function CrmExecutivePage() {
  await requireAdminAccess();

  return <CrmExecutiveDashboard />;
}
