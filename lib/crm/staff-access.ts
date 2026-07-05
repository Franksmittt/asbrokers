import { forbidden } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import type { CrmStaffPermissions } from "@/lib/crm/permissions";
import { resolveStaffPermissions } from "@/lib/crm/permissions";
import { resolveCrmIdentity } from "@/lib/crm/resolve-session";
import { isAdminRole } from "@/lib/crm/session";
import type { CrmRole } from "@/lib/crm/types";
import { crmStaffProfiles, getDb } from "@/lib/db";
import { eq } from "drizzle-orm";

export type CrmAccessContext = {
  user: User;
  role: CrmRole;
  permissions: CrmStaffPermissions;
  canViewAllLeads: boolean;
  canViewAllClients: boolean;
};

async function getActiveProfile(userId: string) {
  const db = getDb();
  if (!db) return null;
  try {
    const [row] = await db
      .select()
      .from(crmStaffProfiles)
      .where(eq(crmStaffProfiles.id, userId))
      .limit(1);
    return row ?? null;
  } catch (error) {
    console.error("[CRM] getActiveProfile failed:", error);
    return null;
  }
}

/** Authenticated CRM user with permissions and active-status check. */
export async function requireCrmAccess(): Promise<CrmAccessContext> {
  const identity = await resolveCrmIdentity();
  if (!identity) forbidden();

  const { user, role, viaPin } = identity;

  if (!viaPin) {
    const profile = await getActiveProfile(user.id);
    if (profile && !profile.isActive) forbidden();

    const permissions = resolveStaffPermissions(
      role,
      profile?.permissions as Partial<CrmStaffPermissions> | undefined
    );

    return {
      user,
      role,
      permissions,
      canViewAllLeads: isAdminRole(role) || permissions.viewAllLeads,
      canViewAllClients: isAdminRole(role) || permissions.viewAllClients,
    };
  }

  const permissions = resolveStaffPermissions(role, undefined);
  return {
    user,
    role,
    permissions,
    canViewAllLeads: isAdminRole(role) || permissions.viewAllLeads,
    canViewAllClients: isAdminRole(role) || permissions.viewAllClients,
  };
}

export async function requireAdminAccess() {
  const access = await requireCrmAccess();
  if (!isAdminRole(access.role)) forbidden();
  return access;
}

export function permissionsPayloadForRole(
  role: CrmRole,
  input?: Partial<CrmStaffPermissions>
): CrmStaffPermissions {
  return role === "admin"
    ? resolveStaffPermissions("admin", undefined)
    : resolveStaffPermissions("staff", input);
}
