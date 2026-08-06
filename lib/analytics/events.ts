"use client";

/**
 * Safe client-side analytics event helpers. All calls no-op when the user has
 * not accepted analytics cookies (gtag never loads) or when IDs are not
 * configured; forms keep working regardless.
 */

import { getGoogleAdsId, getGoogleAdsLeadLabel } from "@/lib/analytics/env";

type GtagArgs = [string, ...unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

function gtagSafe(...args: GtagArgs): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  // Queue into dataLayer so events fire once gtag.js loads (consent granted).
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Fire a lead conversion: GA4 `generate_lead` (importable into Google Ads via
 * the GA4 link) plus a direct Google Ads conversion when a label is set.
 */
export function trackLeadConversion(formId: string, extra?: Record<string, unknown>): void {
  gtagSafe("event", "generate_lead", {
    form_id: formId,
    ...extra,
  });
  const adsId = getGoogleAdsId();
  const adsLeadLabel = getGoogleAdsLeadLabel();
  if (adsId && adsLeadLabel) {
    gtagSafe("event", "conversion", {
      send_to: `${adsId}/${adsLeadLabel}`,
    });
  }
}

/** Generic outbound contact intents (WhatsApp / tel) worth counting. */
export function trackContactClick(channel: "whatsapp" | "phone", location: string): void {
  gtagSafe("event", "contact_click", { channel, location });
}
