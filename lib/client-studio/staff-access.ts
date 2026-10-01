import "server-only";

import {
  getClientStudioSession,
  isClientStudioConfigured,
} from "@/lib/client-studio/session";
import { resolveCrmIdentity } from "@/lib/crm/resolve-session";

/**
 * Phase 1 Command Workspace bridge: CRM PIN / Supabase staff identity
 * unlocks Studio the same way as the legacy shared Studio password.
 */
export async function canAccessStaffStudio(): Promise<boolean> {
  if (await getClientStudioSession()) return true;
  if (await resolveCrmIdentity()) return true;
  return !isClientStudioConfigured();
}

/** True when access came from CRM identity (not the Studio cookie). */
export async function hasCrmStudioBridge(): Promise<boolean> {
  if (await getClientStudioSession()) return false;
  return (await resolveCrmIdentity()) !== null;
}

export async function requireStaffStudioAccess(): Promise<void> {
  if (!(await canAccessStaffStudio())) {
    throw new Error("Not signed in.");
  }
}
