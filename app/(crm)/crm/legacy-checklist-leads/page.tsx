import { LegacyChecklistLeadsAdmin } from "@/components/crm/LegacyChecklistLeadsAdmin";
import { listLegacyChecklistLeads } from "@/lib/legacy-checklist/repository";

export const metadata = {
  title: "Legacy Checklist Leads | Team office",
  description: "Admin dashboard for Legacy Readiness Checklist™ lead magnet submissions.",
  robots: { index: false, follow: false },
};

export default async function LegacyChecklistLeadsAdminPage() {
  const rows = await listLegacyChecklistLeads();
  const serialized = rows.map((row) => ({
    ...row,
    createdAt:
      row.createdAt instanceof Date
        ? row.createdAt.toISOString()
        : new Date(row.createdAt as string | number).toISOString(),
  }));
  return <LegacyChecklistLeadsAdmin initialRows={serialized} />;
}
