import { isKrugersdorpCatchment } from "@/lib/crm/area";
import type { ServiceCategory } from "@/lib/crm/types";
import { CRM_PIN_SUPERUSER_ID } from "@/lib/crm/constants";
import { CRM_TEAM_MEMBERS } from "@/lib/crm/team-members";

export type AdvisorRoute = {
  advisorName: string;
  /** Set only when linked to a live Supabase auth user. */
  authUserId?: string;
  reason: string;
};

/** AS Brokers team routing, names from CRM seed; UUIDs only where auth accounts exist. */
const ROUTES: Record<ServiceCategory, AdvisorRoute> = {
  retirement_everest: {
    advisorName: "Albert Schuurman",
    authUserId: CRM_PIN_SUPERUSER_ID,
    reason: "Everest / retirement specialist, Key Individual",
  },
  estate_business: {
    advisorName: "Johnny Farinha",
    authUserId: CRM_TEAM_MEMBERS.johnny.id,
    reason: "Estate structuring & business continuity",
  },
  short_term_business: {
    advisorName: "Johnny Farinha",
    authUserId: CRM_TEAM_MEMBERS.johnny.id,
    reason: "Business insurance & commercial short-term",
  },
  short_term_personal: {
    advisorName: "Monique Schuurman",
    reason: "Personal short-term insurance & renewals",
  },
  life_personal: {
    advisorName: "Johnny Farinha",
    authUserId: CRM_TEAM_MEMBERS.johnny.id,
    reason: "Life personal onboarding",
  },
  medical_wellness: {
    advisorName: "Petro Vermeulen",
    authUserId: CRM_TEAM_MEMBERS.petro.id,
    reason: "Medical aid & wellness (operations oversight)",
  },
  claims: {
    advisorName: "Shanel van Niekerk",
    reason: "Claims consultant",
  },
};

export function resolveAdvisorRoute(
  serviceCategory: ServiceCategory | string,
  options?: { area?: string; krugersdorpCommercial?: boolean }
): AdvisorRoute {
  const krugersdorpCommercial =
    Boolean(options?.krugersdorpCommercial) ||
    (serviceCategory === "short_term_business" && isKrugersdorpCatchment(options?.area));

  if (krugersdorpCommercial) {
    return {
      advisorName: CRM_TEAM_MEMBERS.albert.name,
      authUserId: CRM_PIN_SUPERUSER_ID,
      reason: "Krugersdorp business-insurance campaign owner",
    };
  }

  if (serviceCategory in ROUTES) {
    return ROUTES[serviceCategory as ServiceCategory];
  }
  return {
    advisorName: "Albert Schuurman",
    authUserId: CRM_PIN_SUPERUSER_ID,
    reason: "Default oversight, unclassified enquiry",
  };
}

/** Display label for assigned advisor UUID or recommended name from payload. */
const KNOWN_ADVISOR_NAMES: Record<string, string> = {
  [CRM_PIN_SUPERUSER_ID]: "Albert Schuurman",
  [CRM_TEAM_MEMBERS.johnny.id]: "Johnny Farinha",
  [CRM_TEAM_MEMBERS.petro.id]: "Petro Vermeulen",
  [CRM_TEAM_MEMBERS.developer.id]: "Developer",
};

export function advisorDisplayName(
  assignedAdvisorId: string | null | undefined,
  recommendedName?: string | null
): string {
  if (assignedAdvisorId && KNOWN_ADVISOR_NAMES[assignedAdvisorId]) {
    return KNOWN_ADVISOR_NAMES[assignedAdvisorId];
  }
  if (recommendedName?.trim()) return recommendedName.trim();
  if (assignedAdvisorId) return `Advisor · ${assignedAdvisorId.slice(0, 8)}`;
  return "Unassigned";
}
