import "server-only";

import type { ContactFormPayload } from "@/lib/validations/schema";

/** Token must be set server-side only; this file must not be imported from client. */
const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN ?? process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const BASE = "https://api.hubapi.com";

/** Topic IDs that receive +15 lead score (Business Risk Management, Trust Structuring). */
const HIGH_VALUE_TOPIC_IDS = ["short_business", "trust"] as const;

/** Payload may include optional capitalAmount for calculator lead forms. */
type SyncPayload = ContactFormPayload & { capitalAmount?: number };

function getAuthHeaders(): Record<string, string> {
  if (!HUBSPOT_TOKEN) return {};
  return {
    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    "Content-Type": "application/json",
  };
}

/**
 * Step A: GET contact by email. Returns id and existing platform_lead_score, or null if 404.
 */
export async function getContactByEmail(
  email: string
): Promise<{ id: string; platform_lead_score: number } | null> {
  if (!HUBSPOT_TOKEN) return null;
  const url = `${BASE}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=platform_lead_score`;
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error("[HubSpot] GET contact failed:", res.status, await res.text());
    }
    return null;
  }
  const data = (await res.json()) as { id: string; properties?: { platform_lead_score?: string } };
  const raw = data.properties?.platform_lead_score;
  const platform_lead_score = raw != null && raw !== "" ? parseInt(String(raw), 10) : 0;
  const score = Number.isNaN(platform_lead_score) ? 0 : Math.max(0, platform_lead_score);
  return { id: data.id, platform_lead_score: score };
}

/**
 * Compute incremental points from payload: +20 if capitalAmount > R1M, +15 if high-value topic selected.
 * Returns the increment only; caller adds to existing score.
 */
function computeScoreIncrement(payload: SyncPayload): number {
  let points = 0;
  if (typeof payload.capitalAmount === "number" && payload.capitalAmount > 1_000_000) {
    points += 20;
  }
  const hasHighValueTopic = payload.topics.some((t) => HIGH_VALUE_TOPIC_IDS.includes(t as (typeof HIGH_VALUE_TOPIC_IDS)[number]));
  if (hasHighValueTopic) {
    points += 15;
  }
  return points;
}

/**
 * Search-and-patch: GET by email, then PATCH (if exists) or POST (if 404).
 * Maps to custom properties: financial_inquiry_topic, financial_capital_input, platform_lead_score (cumulative).
 */
export async function syncContactToHubSpot(
  payload: SyncPayload
): Promise<{ success: boolean; error?: string }> {
  if (!HUBSPOT_TOKEN) {
    return { success: false, error: "HubSpot is not configured." };
  }

  const existing = await getContactByEmail(payload.email);
  const increment = computeScoreIncrement(payload);
  const newScore = (existing?.platform_lead_score ?? 0) + increment;

  const [first, ...rest] = payload.fullName.trim().split(/\s+/);
  const firstname = first ?? "";
  const lastname = rest.join(" ") ?? "";

  const properties: Record<string, string> = {
    email: payload.email,
    firstname,
    lastname,
    phone: payload.phone,
    financial_inquiry_topic: Array.isArray(payload.topics) ? payload.topics.join(", ") : "",
    platform_lead_score: String(newScore),
  };
  if (typeof payload.capitalAmount === "number") {
    properties.financial_capital_input = String(payload.capitalAmount);
  }

  if (existing) {
    const url = `${BASE}/crm/v3/objects/contacts/${existing.id}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ properties }),
      cache: "no-store",
    });
    if (!res.ok) {
      const err = await res.text();
      if (process.env.NODE_ENV === "development") console.error("[HubSpot] PATCH failed:", res.status, err);
      return { success: false, error: "Could not update contact." };
    }
    return { success: true };
  }

  const url = `${BASE}/crm/v3/objects/contacts`;
  const res = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ properties }),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.text();
    if (process.env.NODE_ENV === "development") {
      console.error("[HubSpot] POST failed:", res.status, err);
    }
    // Surface HubSpot message when possible (e.g. property doesn't exist)
    let message = "Could not create contact.";
    try {
      const body = JSON.parse(err) as { message?: string; errors?: Array<{ message?: string }> };
      if (body.message) message = body.message;
      else if (body.errors?.[0]?.message) message = body.errors[0].message;
    } catch {
      // keep default message
    }
    return { success: false, error: message };
  }
  return { success: true };
}
