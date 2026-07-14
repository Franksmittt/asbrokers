import { cookies } from "next/headers";

export const CONSENT_COOKIE = "asbrokers-cookie-consent";
export type ConsentCookieValue = "all" | "essential";

export async function readConsentCookie(): Promise<ConsentCookieValue | null> {
  const jar = await cookies();
  const raw = jar.get(CONSENT_COOKIE)?.value;
  if (raw === "all" || raw === "essential") return raw;
  return null;
}
