import { canAccessStaffStudio } from "@/lib/client-studio/staff-access";
import {
  getClientStudioSession,
  isClientStudioConfigured,
} from "@/lib/client-studio/session";
import { resolveCrmIdentity } from "@/lib/crm/resolve-session";

/**
 * Course / Newsletter Studio: Studio password cookie OR CRM staff identity.
 * If the password is not configured yet, the builder stays open for demos.
 */
export async function canAccessCourseStudio(): Promise<boolean> {
  return canAccessStaffStudio();
}

export async function isCourseStudioPreviewUnlocked(): Promise<boolean> {
  if (await getClientStudioSession()) return false;
  if (await resolveCrmIdentity()) return false;
  return !isClientStudioConfigured();
}
