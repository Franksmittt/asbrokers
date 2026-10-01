import { cookies } from "next/headers";

/**
 * Legacy mock CRM cookie cleanup only.
 * Active auth is Supabase staff session or CRM PIN (`lib/crm/pin-session`).
 */
const COOKIE_ROLE = "mock-crm-role";
const COOKIE_NAME = "mock-crm-user";
const COOKIE_STAFF_ID = "mock-crm-staff-id";

export async function clearMockSession() {
  const c = await cookies();
  c.delete(COOKIE_ROLE);
  c.delete(COOKIE_NAME);
  c.delete(COOKIE_STAFF_ID);
}
