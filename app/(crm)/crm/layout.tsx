import { redirect } from "next/navigation";

import { getLeads } from "@/app/actions/crm";

/** Auth-gated CRM — skip static prerender (no session at build time). */
export const dynamic = "force-dynamic";
import { CrmProvider } from "@/components/crm/CrmContext";
import { CrmSidebar } from "@/components/crm/CrmSidebar";
import {
  canAccessCrmRole,
  crmRoleFromUser,
  staffDisplayName,
} from "@/lib/crm/session";
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

  const initialLeads = await getLeads();

  return (
    <CrmProvider
      initialLeads={initialLeads}
      role={role}
      staffId={user.id}
      staffName={staffDisplayName(user)}
    >
      <div className="flex min-h-screen bg-void">
        <CrmSidebar name={staffDisplayName(user)} />
        <div className="flex min-w-0 flex-1 flex-col pt-14 text-gray-100 antialiased md:ml-60 md:pt-0">
          <div className="flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8">{children}</div>
        </div>
      </div>
    </CrmProvider>
  );
}
