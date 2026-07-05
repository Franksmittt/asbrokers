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
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const role = crmRoleFromUser(user);
      if (canAccessCrmRole(role)) {
        return { user, role, viaPin: false };
      }
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
}
