import { redirect } from "next/navigation";

import { getLeads } from "@/app/actions/crm";

/** Auth-gated CRM, skip static prerender (no session at build time). */
export const dynamic = "force-dynamic";
import { CrmProvider } from "@/components/crm/CrmContext";
import { CrmShell } from "@/components/crm/CrmShell";
import { canUseCrmAi } from "@/lib/crm/ai-access";
import { crmPinMemberName, getCrmPinSessionMemberKey } from "@/lib/crm/pin-session";
import { resolveCrmIdentity } from "@/lib/crm/resolve-session";
import { staffDisplayName } from "@/lib/crm/session";
import { requireCrmAccess } from "@/lib/crm/staff-access";

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const identity = await resolveCrmIdentity();
  if (!identity) {
    redirect("/login?next=/crm");
  }

  const { user, role } = identity;

  let showFunnelAdmin = role === "admin";
  try {
    const access = await requireCrmAccess();
    showFunnelAdmin = access.role === "admin" || access.permissions.viewFunnelExports;
  } catch (error) {
    // forbidden()/redirect digests must propagate; everything else → re-login.
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof (error as { digest?: unknown }).digest === "string" &&
      String((error as { digest: string }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("[CRM] layout access check failed:", error);
    redirect("/login?next=/crm&error=access_revoked");
  }

  let initialLeads: Awaited<ReturnType<typeof getLeads>> = [];
  try {
    initialLeads = await getLeads();
  } catch (error) {
    console.error("[CRM] layout getLeads failed:", error);
  }

  const pinMemberKey = identity.viaPin ? await getCrmPinSessionMemberKey() : null;
  const displayName =
    identity.viaPin && pinMemberKey
      ? crmPinMemberName(pinMemberKey)
      : staffDisplayName(user);
  const canUseAi = canUseCrmAi(identity);

  return (
    <CrmProvider
      initialLeads={initialLeads}
      role={role}
      staffId={user.id}
      staffName={displayName}
      canUseAi={canUseAi}
    >
      <CrmShell staffName={displayName} role={role} showFunnelAdmin={showFunnelAdmin}>
        {children}
      </CrmShell>
    </CrmProvider>
  );
}
