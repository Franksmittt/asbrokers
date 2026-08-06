import "server-only";

import type { User } from "@supabase/supabase-js";

import {
  crmPinRole,
  crmPinUser,
  getCrmPinSessionMemberKey,
} from "@/lib/crm/pin-session";
import { canAccessCrmRole, crmRoleFromUser } from "@/lib/crm/session";
import type { CrmRole } from "@/lib/crm/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CrmIdentity = {
  user: User;
  role: CrmRole;
  viaPin: boolean;
};

/** Active CRM identity from Supabase session or demo PIN session. */
export async function resolveCrmIdentity(): Promise<CrmIdentity | null> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const role = crmRoleFromUser(user);
          if (canAccessCrmRole(role)) {
            return { user, role, viaPin: false };
          }
        }
      } catch (error) {
        // Auth blips must not hard-crash /crm — fall through to PIN session.
        console.error("[CRM] resolveCrmIdentity getUser failed:", error);
      }
    }

    const memberKey = await getCrmPinSessionMemberKey();
    if (memberKey) {
      return {
        user: crmPinUser(memberKey),
        role: crmPinRole(memberKey),
        viaPin: true,
      };
    }

    return null;
  } catch (error) {
    console.error("[CRM] resolveCrmIdentity failed:", error);
    return null;
  }
}
