import { looksLikeKrugersdorpLead, normalizeAreaLabel } from "@/lib/crm/area";
import { ALBERT_KRUGERSDORP_BIZ_CAMPAIGN } from "@/lib/crm/goals";
import type { ServiceCategory } from "@/lib/crm/types";

const KRUGERSDORP_CALLBACK_SOURCES = new Set([
  "business_insurance_af",
  "callback_business_insurance_af",
  "home",
  "callback_home",
  "home_hero",
  "home_pathways",
  "home_journey",
  "home_journey_start",
  "home_journey_review",
  "nav_cta",
]);

export type CampaignStamp = {
  area?: string;
  campaignId?: string;
  isKrugersdorpCommercial: boolean;
};

/**
 * Infer local area + Albert's Krugersdorp commercial campaign from inbound signals.
 */
export function inferCampaignStamp(input: {
  serviceCategory?: ServiceCategory | string;
  sourceFunnel?: string;
  rawPayload?: Record<string, unknown>;
}): CampaignStamp {
  const payload = input.rawPayload ?? {};
  const attribution =
    payload.attribution && typeof payload.attribution === "object"
      ? (payload.attribution as Record<string, unknown>)
      : {};
  const source = typeof payload.source === "string" ? payload.source : "";
  const landing = typeof attribution.landing === "string" ? attribution.landing : "";
  const explicitArea = normalizeAreaLabel(
    typeof payload.area === "string" ? payload.area : undefined
  );

  const krugersdorpSignal = looksLikeKrugersdorpLead([
    explicitArea,
    source,
    input.sourceFunnel,
    landing,
    typeof payload.intent === "string" ? payload.intent : "",
  ]);

  const fromLocalCommercial =
    KRUGERSDORP_CALLBACK_SOURCES.has(source) ||
    source.includes("business_insurance_af") ||
    landing.includes("besigheidsversekering-krugersdorp") ||
    (input.sourceFunnel ?? "").includes("besigheidsversekering");

  const isKrugersdorpCommercial =
    input.serviceCategory === "short_term_business" &&
    (krugersdorpSignal || fromLocalCommercial);

  const area =
    explicitArea ||
    (fromLocalCommercial || isKrugersdorpCommercial ? "Krugersdorp" : undefined);

  return {
    area,
    campaignId: isKrugersdorpCommercial ? ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.id : undefined,
    isKrugersdorpCommercial,
  };
}
