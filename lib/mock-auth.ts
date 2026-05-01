import { cookies } from "next/headers";

/** Team office access only (principals). No CRM roles or staff IDs. */
export type MockRole = "admin";

const COOKIE_ROLE = "mock-crm-role";
const COOKIE_NAME = "mock-crm-user";
const COOKIE_STAFF_ID = "mock-crm-staff-id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getMockSession(): Promise<{ role: MockRole; name: string } | null> {
  const c = await cookies();
  const role = c.get(COOKIE_ROLE)?.value as MockRole | undefined;
  const name = c.get(COOKIE_NAME)?.value ?? "";
  if (role !== "admin") return null;
  return { role, name: name || "Team" };
}

export async function setMockSession(name: string) {
  const c = await cookies();
  c.set(COOKIE_ROLE, "admin", {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  c.set(COOKIE_NAME, name || "Team", {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  c.delete(COOKIE_STAFF_ID);
}

export async function clearMockSession() {
  const c = await cookies();
  c.delete(COOKIE_ROLE);
  c.delete(COOKIE_NAME);
  c.delete(COOKIE_STAFF_ID);
}

export function canAccessCrm(role: MockRole): boolean {
  return role === "admin";
}
