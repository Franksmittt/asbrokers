import type { CrmRole, ServiceCategory } from "@/lib/crm/types";

import { CRM_PIN_SUPERUSER_EMAIL, CRM_PIN_SUPERUSER_ID, CRM_PIN_SUPERUSER_NAME } from "@/lib/crm/constants";

/** Demo/test CRM identities — replace with Supabase auth users when going live. */
export type CrmTeamMemberKey = "albert" | "johnny" | "petro";

export type CrmTeamMember = {
  key: CrmTeamMemberKey;
  id: string;
  email: string;
  name: string;
  role: CrmRole;
  pin: string;
  canUseAi: boolean;
  focus: string;
  serviceLines: ServiceCategory[];
};

export const CRM_TEAM_MEMBERS: Record<CrmTeamMemberKey, CrmTeamMember> = {
  albert: {
    key: "albert",
    id: CRM_PIN_SUPERUSER_ID,
    email: CRM_PIN_SUPERUSER_EMAIL,
    name: CRM_PIN_SUPERUSER_NAME,
    role: "admin",
    pin: process.env.CRM_SUPERUSER_PIN?.trim() || "85879",
    canUseAi: true,
    focus: "Key Individual · retirement & Everest oversight",
    serviceLines: ["retirement_everest"],
  },
  johnny: {
    key: "johnny",
    id: "b8e4c2a1-6f3d-4a2e-9c1b-7d5e8f2a4c91",
    email: "johnny@asbrokers.co.za",
    name: "Johnny Farinha",
    role: "staff",
    pin: process.env.CRM_TEST_PIN_JOHNNY?.trim() || "47291",
    canUseAi: false,
    focus: "Business insurance · estate · life personal",
    serviceLines: ["short_term_business", "estate_business", "life_personal"],
  },
  petro: {
    key: "petro",
    id: "c9f5d3b2-7a4e-5b3f-0d2c-8e6f9a3b5d82",
    email: "petro@asbrokers.co.za",
    name: "Petro Vermeulen",
    role: "admin",
    pin: process.env.CRM_TEST_PIN_PETRO?.trim() || "63941",
    canUseAi: false,
    focus: "Admin · commercial underwriting & operations",
    serviceLines: ["short_term_business", "claims"],
  },
};

export const CRM_TEAM_MEMBER_LIST = Object.values(CRM_TEAM_MEMBERS);

export function lookupCrmPinUser(pin: string): CrmTeamMember | null {
  const trimmed = pin.trim();
  return CRM_TEAM_MEMBER_LIST.find((member) => member.pin === trimmed) ?? null;
}

export function getTeamMember(key: string): CrmTeamMember | null {
  if (key in CRM_TEAM_MEMBERS) {
    return CRM_TEAM_MEMBERS[key as CrmTeamMemberKey];
  }
  const byId = CRM_TEAM_MEMBER_LIST.find((m) => m.id === key);
  if (byId) return byId;
  const byName = CRM_TEAM_MEMBER_LIST.find(
    (m) => m.name.toLowerCase() === key.toLowerCase() || m.key === key.toLowerCase()
  );
  return byName ?? null;
}

export function resolveTeamMemberByNameFragment(fragment: string): CrmTeamMember | null {
  const q = fragment.trim().toLowerCase();
  if (!q) return null;
  return (
    CRM_TEAM_MEMBER_LIST.find(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.key.includes(q) ||
        m.name.split(" ")[0]?.toLowerCase() === q
    ) ?? null
  );
}

export function isAlbertTeamMember(userId: string): boolean {
  return userId === CRM_TEAM_MEMBERS.albert.id;
}

export function teamRosterForAiPrompt(): string {
  return CRM_TEAM_MEMBER_LIST.map(
    (m) =>
      `- ${m.name} (${m.key}, id=${m.id}, role=${m.role}): ${m.focus}. Lines: ${m.serviceLines.join(", ")}`
  ).join("\n");
}
