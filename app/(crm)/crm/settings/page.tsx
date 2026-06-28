import { forbidden } from "next/navigation";

import { listCrmUsers } from "@/app/actions/users";
import { CrmSettingsClient } from "@/components/crm/CrmSettingsClient";
import { requireAdminAccess } from "@/lib/crm/staff-access";

export const metadata = {
  title: "Settings · Team access",
  description: "Manage CRM team members, roles, and permissions.",
};

export default async function CrmSettingsPage() {
  await requireAdminAccess();
  const users = await listCrmUsers();

  return <CrmSettingsClient initialUsers={users} />;
}
