import "server-only";

import { isAlbertTeamMember } from "@/lib/crm/team-members";
import type { CrmIdentity } from "@/lib/crm/resolve-session";

/** Gemini CRM assistant is reserved for Albert Schuurman only. */
export function canUseCrmAi(identity: CrmIdentity): boolean {
  return isAlbertTeamMember(identity.user.id);
}
