import "server-only";

import { cookies } from "next/headers";
import {
  ATTRIBUTION_COOKIE,
  parseAttributionCookie,
  type LeadAttribution,
} from "@/lib/attribution";

/**
 * Read ad-click attribution (utm_*, gclid, landing page) captured by
 * middleware for the current visitor. Returns undefined for organic/direct
 * visitors so rawPayload stays clean.
 */
export async function getLeadAttribution(): Promise<LeadAttribution | undefined> {
  try {
    const store = await cookies();
    const parsed = parseAttributionCookie(store.get(ATTRIBUTION_COOKIE)?.value);
    return parsed ?? undefined;
  } catch {
    return undefined;
  }
}
