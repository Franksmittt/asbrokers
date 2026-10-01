export {
  canAccessStaffStudio as canAccessCourseStudio,
} from "@/lib/client-studio/staff-access";
import {
  getClientStudioSession,
  isClientStudioConfigured,
} from "@/lib/client-studio/session";
import { resolveCrmIdentity } from "@/lib/crm/resolve-session";

/** True when Course Studio is open for demo (password unset) rather than authenticated. */
export async function isCourseStudioPreviewUnlocked(): Promise<boolean> {
  if (await getClientStudioSession()) return false;
  if (await resolveCrmIdentity()) return false;
  return !isClientStudioConfigured();
}
