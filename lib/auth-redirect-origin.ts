import { headers } from "next/headers";

import { getSiteOrigin } from "@/lib/site-url";

/**
 * Origin for magic-link email redirects.
 * Uses the incoming request host so production never sends localhost links
 * when NEXT_PUBLIC_APP_URL was set for local dev.
 */
export async function getAuthRedirectOrigin(): Promise<string> {
  try {
    const h = await headers();
    const host =
      h.get("x-forwarded-host")?.split(",")[0]?.trim() ?? h.get("host")?.trim();
    if (host) {
      const proto =
        h.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
        (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
      return `${proto}://${host}`;
    }
  } catch {
    // headers() only works inside a request (Server Actions, RSC, route handlers).
  }
  return getSiteOrigin();
}
