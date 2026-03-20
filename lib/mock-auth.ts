import { cookies } from "next/headers";

export type MockRole = "admin" | "staff";

const COOKIE_ROLE = "mock-crm-role";
const COOKIE_NAME = "mock-crm-user";
const COOKIE_STAFF_ID = "mock-crm-staff-id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getMockSession(): Promise<{ role: MockRole; name: string; staffId: string | null } | null> {
  const c = await cookies();
  const role = c.get(COOKIE_ROLE)?.value as MockRole | undefined;
  const name = c.get(COOKIE_NAME)?.value ?? "";
  const staffId = c.get(COOKIE_STAFF_ID)?.value ?? null;
  if (role !== "admin" && role !== "staff") return null;
  return { role, name: name || "User", staffId };
}

export async function setMockSession(role: MockRole, name: string, staffId?: string) {
  const c = await cookies();
  c.set(COOKIE_ROLE, role, { path: "/", maxAge: COOKIE_MAX_AGE, httpOnly: false, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
  c.set(COOKIE_NAME, name, { path: "/", maxAge: COOKIE_MAX_AGE, httpOnly: false, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
  if (staffId) c.set(COOKIE_STAFF_ID, staffId, { path: "/", maxAge: COOKIE_MAX_AGE, httpOnly: false, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
  else c.delete(COOKIE_STAFF_ID);
}

export async function clearMockSession() {
  const c = await cookies();
  c.delete(COOKIE_ROLE);
  c.delete(COOKIE_NAME);
  c.delete(COOKIE_STAFF_ID);
}

export function canAccessCrm(role: MockRole): boolean {
  return role === "admin" || role === "staff";
}

