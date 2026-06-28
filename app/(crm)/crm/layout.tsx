import { redirect } from "next/navigation";

import { getLeads } from "@/app/actions/crm";

/** Auth-gated CRM — skip static prerender (no session at build time). */
export const dynamic = "force-dynamic";
import { CrmProvider } from "@/components/crm/CrmContext";
import { CrmShell } from "@/components/crm/CrmShell";
import {
  canAccessCrmRole,
  crmRoleFromUser,
  staffDisplayName,
} from "@/lib/crm/session";
import { requireCrmAccess } from "@/lib/crm/staff-access";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect("/login?next=/crm");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/crm");
  }

  const role = crmRoleFromUser(user);
  if (!canAccessCrmRole(role)) {
    redirect("/login?next=/crm");
  }

  let showFunnelAdmin = role === "admin";
  try {
    const access = await requireCrmAccess();
    showFunnelAdmin = access.role === "admin" || access.permissions.viewFunnelExports;
  } catch {
    redirect("/login?next=/crm&error=access_revoked");
  }

  const initialLeads = await getLeads();

  return (
    <CrmProvider
      initialLeads={initialLeads}
      role={role}
      staffId={user.id}
      staffName={staffDisplayName(user)}
    >
      <CrmShell staffName={staffDisplayName(user)} role={role} showFunnelAdmin={showFunnelAdmin}>
        {children}
      </CrmShell>
    </CrmProvider>
  );
}
