import {
  getClientStudioSession,
  isClientStudioConfigured,
} from "@/lib/client-studio/session";

/**
 * Course Studio uses the same owner password as Blog Studio.
 * If the password is not configured yet, the builder stays open so the
 * boilerplate can be demonstrated. Lock it once CLIENT_STUDIO_PASSWORD is set.
 */
export async function canAccessCourseStudio(): Promise<boolean> {
  if (await getClientStudioSession()) return true;
  return !isClientStudioConfigured();
}

export async function isCourseStudioPreviewUnlocked(): Promise<boolean> {
  if (await getClientStudioSession()) return false;
  return !isClientStudioConfigured();
}
