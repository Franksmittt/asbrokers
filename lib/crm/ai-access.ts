import "server-only";

import { isCrmSuperuser } from "@/lib/crm/team-members";
import type { CrmIdentity } from "@/lib/crm/resolve-session";

/** Gemini CRM assistant is reserved for superusers (Albert + Developer). */
export function canUseCrmAi(identity: CrmIdentity): boolean {
  return isCrmSuperuser(identity.user.id);
}
