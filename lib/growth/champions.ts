/**
 * Course champions / promoters — staff who share courses and earn Influence points.
 * Product commission still follows the Closing Advisor (FAIS). Publisher (Albert) owns content.
 */

import type { ServiceCategory } from "@/lib/crm/types";
import { CRM_TEAM_MEMBERS } from "@/lib/crm/team-members";

import type { ChampionKey } from "./types";

export type CourseChampion = {
  key: ChampionKey;
  /** URL param value for ?ref= */
  ref: string;
  name: string;
  firstName: string;
  /** Linked CRM team member id when they have PIN login */
  crmUserId?: string;
  email?: string;
  focus: string;
  serviceLines: ServiceCategory[];
  /** Can open Teacher OS in CRM (needs PIN account) */
  hasCrmLogin: boolean;
};

export const COURSE_CHAMPIONS: Record<ChampionKey, CourseChampion> = {
  albert: {
    key: "albert",
    ref: "albert",
    name: CRM_TEAM_MEMBERS.albert.name,
    firstName: "Albert",
    crmUserId: CRM_TEAM_MEMBERS.albert.id,
    email: CRM_TEAM_MEMBERS.albert.email,
    focus: "Publisher · retirement & firm owner",
    serviceLines: ["retirement_everest"],
    hasCrmLogin: true,
  },
  johnny: {
    key: "johnny",
    ref: "johnny",
    name: CRM_TEAM_MEMBERS.johnny.name,
    firstName: "Johnny",
    crmUserId: CRM_TEAM_MEMBERS.johnny.id,
    email: CRM_TEAM_MEMBERS.johnny.email,
    focus: "Business insurance · Brits",
    serviceLines: ["short_term_business", "estate_business", "life_personal"],
    hasCrmLogin: true,
  },
  petro: {
    key: "petro",
    ref: "petro",
    name: CRM_TEAM_MEMBERS.petro.name,
    firstName: "Petro",
    crmUserId: CRM_TEAM_MEMBERS.petro.id,
    email: CRM_TEAM_MEMBERS.petro.email,
    focus: "Medical aid & operations",
    serviceLines: [
      "medical_wellness",
      "retirement_everest",
      "short_term_personal",
      "short_term_business",
      "estate_business",
      "life_personal",
      "claims",
    ],
    hasCrmLogin: true,
  },
  monique: {
    key: "monique",
    ref: "monique",
    name: CRM_TEAM_MEMBERS.monique.name,
    firstName: "Monique",
    crmUserId: CRM_TEAM_MEMBERS.monique.id,
    email: CRM_TEAM_MEMBERS.monique.email,
    focus: "Personal short-term & medical champion",
    serviceLines: ["short_term_personal", "medical_wellness"],
    hasCrmLogin: true,
  },
  shanel: {
    key: "shanel",
    ref: "shanel",
    name: CRM_TEAM_MEMBERS.shanel.name,
    firstName: "Shanel",
    crmUserId: CRM_TEAM_MEMBERS.shanel.id,
    email: CRM_TEAM_MEMBERS.shanel.email,
    focus: "Claims consultant",
    serviceLines: ["claims"],
    hasCrmLogin: true,
  },
  developer: {
    key: "developer",
    ref: "developer",
    name: CRM_TEAM_MEMBERS.developer.name,
    firstName: "Developer",
    crmUserId: CRM_TEAM_MEMBERS.developer.id,
    email: CRM_TEAM_MEMBERS.developer.email,
    focus: "Technical testing champion",
    serviceLines: [
      "retirement_everest",
      "short_term_business",
      "short_term_personal",
      "estate_business",
      "life_personal",
      "medical_wellness",
      "claims",
    ],
    hasCrmLogin: true,
  },
};

export const COURSE_CHAMPION_LIST = Object.values(COURSE_CHAMPIONS);

export function normalizePromoterRef(raw: string | null | undefined): ChampionKey | undefined {
  if (!raw) return undefined;
  const cleaned = raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
  if (!cleaned) return undefined;
  const match = COURSE_CHAMPION_LIST.find(
    (c) => c.ref === cleaned || c.key === cleaned || c.firstName.toLowerCase() === cleaned
  );
  return match?.key;
}

export function getChampion(key: string | null | undefined): CourseChampion | null {
  if (!key) return null;
  const normalized = normalizePromoterRef(key);
  return normalized ? COURSE_CHAMPIONS[normalized] : null;
}

export function getChampionByCrmUserId(userId: string): CourseChampion | null {
  return COURSE_CHAMPION_LIST.find((c) => c.crmUserId === userId) ?? null;
}

export function championWhatsAppShareText(input: {
  champion: CourseChampion;
  courseTitle: string;
  url: string;
}): string {
  return (
    `Hi — ${input.champion.firstName} from AS Brokers recommended this free course for you:\n\n` +
    `*${input.courseTitle}*\n${input.url}\n\n` +
    `Educational only — not personal financial advice. FSP 17273.`
  );
}
