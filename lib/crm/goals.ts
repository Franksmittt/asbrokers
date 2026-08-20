import { isKrugersdorpCatchment, looksLikeKrugersdorpLead } from "@/lib/crm/area";
import { CRM_PIN_SUPERUSER_ID, CRM_PIN_SUPERUSER_NAME } from "@/lib/crm/constants";
import type { CrmLead, LeadStatus, ServiceCategory } from "@/lib/crm/types";

export type CampaignPace = "ahead" | "on_track" | "behind" | "at_risk";

export type CampaignSourceMix = {
  id: "book_cross_sell" | "coi_referrals" | "inbound_local" | "local_sme";
  label: string;
  targetClients: number;
  how: string;
};

export type CampaignWeeklyTargets = {
  outreach: number;
  conversations: number;
  needsAnalyses: number;
  quotes: number;
  binds: number;
};

export type CampaignFunnelTargets = CampaignWeeklyTargets & {
  /** Total campaign targets (not weekly). */
  binds: number;
};

export type AdvisorCampaign = {
  id: string;
  title: string;
  ownerAdvisorId: string;
  ownerName: string;
  serviceCategory: ServiceCategory;
  areaLabel: string;
  targetClients: number;
  startDate: string;
  endDate: string;
  weeklyTargets: CampaignWeeklyTargets;
  funnelTargets: CampaignWeeklyTargets;
  sourceMix: CampaignSourceMix[];
  playbook: string[];
  complianceNote: string;
};

export type CampaignWeeklyLog = {
  weekStart: string;
  outreach: number;
  conversations: number;
  needsAnalyses: number;
  quotes: number;
  notes?: string;
};

export type CampaignFunnelActuals = CampaignWeeklyTargets;

export type CampaignProgress = {
  campaign: AdvisorCampaign;
  now: string;
  daysElapsed: number;
  daysRemaining: number;
  totalDays: number;
  weekNumber: number;
  totalWeeks: number;
  won: number;
  remaining: number;
  expectedWonByNow: number;
  pace: CampaignPace;
  paceLabel: string;
  percentComplete: number;
  funnel: {
    targets: CampaignWeeklyTargets;
    actuals: CampaignFunnelActuals;
  };
  thisWeek: {
    targets: CampaignWeeklyTargets;
    logged: CampaignWeeklyLog | null;
  };
  matchingLeadIds: string[];
  activePipeline: number;
  pipelineByStatus: Record<LeadStatus, number>;
};

const MS_PER_DAY = 86_400_000;

/**
 * Reverse-funnel for 10 bound commercial policies in 90 days.
 * Conservative independent-broker conversion on SME short-term:
 * 40% quote→bind, 70% needs-analysis→quote, 45% conversation→NA, 35% warm outreach→conversation.
 */
export const ALBERT_KRUGERSDORP_BIZ_CAMPAIGN: AdvisorCampaign = {
  id: "albert-krugersdorp-biz-ins-2026q3",
  title: "10 Krugersdorp business-insurance clients",
  ownerAdvisorId: CRM_PIN_SUPERUSER_ID,
  ownerName: CRM_PIN_SUPERUSER_NAME,
  serviceCategory: "short_term_business",
  areaLabel: "Krugersdorp / West Rand",
  targetClients: 10,
  startDate: "2026-08-20",
  endDate: "2026-11-20",
  weeklyTargets: {
    outreach: 18,
    conversations: 6,
    needsAnalyses: 3,
    quotes: 2,
    binds: 1,
  },
  funnelTargets: {
    outreach: 229,
    conversations: 80,
    needsAnalyses: 36,
    quotes: 25,
    binds: 10,
  },
  sourceMix: [
    {
      id: "book_cross_sell",
      label: "Existing book",
      targetClients: 4,
      how: "Call retirement, life, and personal clients who own a Krugersdorp business. Highest trust, shortest cycle.",
    },
    {
      id: "coi_referrals",
      label: "Centres of influence",
      targetClients: 3,
      how: "Two accountants, two attorneys, one estate agent. Ask for one commercial introduction a week.",
    },
    {
      id: "inbound_local",
      label: "Inbound local",
      targetClients: 2,
      how: "Drive /besigheidsversekering-krugersdorp and the Business Risk Review. Same-day callback on every enquiry.",
    },
    {
      id: "local_sme",
      label: "Local SMEs",
      targetClients: 1,
      how: "Chamdor, Factoria, and CBD walk-ins. Leave the risk-review workbook; book a needs analysis, do not quote on the pavement.",
    },
  ],
  playbook: [
    "Treat 10 binds as a weekly activity scorecard, not a wish. One bound policy a week (13 weeks) beats a late scramble.",
    "Keep at least 8 Krugersdorp commercial cards in Qualified or Proposal at all times.",
    "Every warm conversation either becomes a CRM lead with area = Krugersdorp, or it did not happen.",
    "Johnny can place the cover; Albert owns the relationship and the 10-client number.",
    "Personal recommendations follow a documented FAIS needs analysis. The goal is bound, suitable cover — not speed at the expense of advice.",
  ],
  complianceNote:
    "AS Brokers CC (FSP 17273). Commercial placement follows a needs analysis. No guaranteed premiums, cover, or claim outcomes. POPIA: only contact businesses where there is a lawful basis (existing client, enquiry, or consented referral).",
};

export function listAdvisorCampaigns(): AdvisorCampaign[] {
  return [ALBERT_KRUGERSDORP_BIZ_CAMPAIGN];
}

export function getAdvisorCampaign(id: string): AdvisorCampaign | null {
  return listAdvisorCampaigns().find((campaign) => campaign.id === id) ?? null;
}

export function mondayOfWeek(isoDate: string | Date, timeZone = "Africa/Johannesburg"): string {
  const date =
    typeof isoDate === "string"
      ? new Date(isoDate.includes("T") ? isoDate : `${isoDate}T12:00:00Z`)
      : isoDate;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Mon";
  if (!year || !month || !day) {
    return date.toISOString().slice(0, 10);
  }
  const asDate = new Date(`${year}-${month}-${day}T12:00:00Z`);
  const weekdayIndex: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const dow = weekdayIndex[weekday] ?? 1;
  const offset = dow === 0 ? 6 : dow - 1;
  asDate.setUTCDate(asDate.getUTCDate() - offset);
  return asDate.toISOString().slice(0, 10);
}

function parseDay(iso: string): Date {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`);
}

function clampDate(value: Date, start: Date, end: Date): Date {
  if (value < start) return start;
  if (value > end) return end;
  return value;
}

export function campaignCalendar(campaign: AdvisorCampaign, now = new Date()) {
  const start = parseDay(campaign.startDate);
  const end = parseDay(campaign.endDate);
  const today = clampDate(now, start, end);
  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / MS_PER_DAY));
  const daysElapsed = Math.max(0, Math.round((today.getTime() - start.getTime()) / MS_PER_DAY));
  const daysRemaining = Math.max(0, Math.round((end.getTime() - today.getTime()) / MS_PER_DAY));
  const totalWeeks = Math.max(1, Math.ceil(totalDays / 7));
  const weekNumber = Math.min(totalWeeks, Math.floor(daysElapsed / 7) + 1);
  return {
    start,
    end,
    totalDays,
    daysElapsed,
    daysRemaining,
    totalWeeks,
    weekNumber,
  };
}

export function leadMatchesCampaign(lead: CrmLead, campaign: AdvisorCampaign): boolean {
  if (lead.campaignId === campaign.id) return true;
  if (lead.service_category !== campaign.serviceCategory) return false;
  if (isKrugersdorpCatchment(lead.area)) return true;
  return looksLikeKrugersdorpLead([lead.area, lead.intent, lead.company]);
}

function inCampaignWindow(lead: CrmLead, campaign: AdvisorCampaign): boolean {
  const start = parseDay(campaign.startDate).getTime();
  const end = parseDay(campaign.endDate).getTime() + MS_PER_DAY - 1;
  const wonAt = lead.wonAt ? Date.parse(lead.wonAt) : Number.NaN;
  if (!Number.isNaN(wonAt)) {
    return wonAt >= start && wonAt <= end;
  }
  const createdAt = lead.createdAt ? Date.parse(lead.createdAt) : Number.NaN;
  if (!Number.isNaN(createdAt)) {
    return createdAt >= start && createdAt <= end;
  }
  return lead.status !== "lost";
}

const FUNNEL_STATUSES: Record<keyof CampaignWeeklyTargets, LeadStatus[]> = {
  outreach: ["new", "contacted", "qualified", "proposal", "won"],
  conversations: ["contacted", "qualified", "proposal", "won"],
  needsAnalyses: ["qualified", "proposal", "won"],
  quotes: ["proposal", "won"],
  binds: ["won"],
};

function countByFunnel(leads: CrmLead[]): CampaignFunnelActuals {
  const count = (statuses: LeadStatus[]) => leads.filter((lead) => statuses.includes(lead.status)).length;
  return {
    outreach: count(FUNNEL_STATUSES.outreach),
    conversations: count(FUNNEL_STATUSES.conversations),
    needsAnalyses: count(FUNNEL_STATUSES.needsAnalyses),
    quotes: count(FUNNEL_STATUSES.quotes),
    binds: count(FUNNEL_STATUSES.binds),
  };
}

export function resolveCampaignPace(input: {
  won: number;
  expectedWonByNow: number;
  remaining: number;
  daysRemaining: number;
  activePipeline: number;
}): CampaignPace {
  const { won, expectedWonByNow, remaining, daysRemaining, activePipeline } = input;
  if (remaining <= 0) return "ahead";
  if (daysRemaining <= 14 && activePipeline < remaining) return "at_risk";
  if (won >= expectedWonByNow + 1) return "ahead";
  if (won + 0.75 >= expectedWonByNow) return "on_track";
  if (daysRemaining <= 21 && won < expectedWonByNow - 1) return "at_risk";
  return "behind";
}

const PACE_LABELS: Record<CampaignPace, string> = {
  ahead: "Ahead of pace",
  on_track: "On pace",
  behind: "Behind pace",
  at_risk: "At risk",
};

export function scoreCampaignProgress(
  campaign: AdvisorCampaign,
  leads: CrmLead[],
  options?: { now?: Date; weeklyLogs?: CampaignWeeklyLog[] }
): CampaignProgress {
  const now = options?.now ?? new Date();
  const calendar = campaignCalendar(campaign, now);
  const matching = leads.filter(
    (lead) => leadMatchesCampaign(lead, campaign) && inCampaignWindow(lead, campaign)
  );
  const funnelActuals = countByFunnel(matching);
  const won = funnelActuals.binds;
  const remaining = Math.max(0, campaign.targetClients - won);
  const expectedWonByNow = Number(
    ((campaign.targetClients * calendar.daysElapsed) / calendar.totalDays).toFixed(1)
  );
  const activePipeline = matching.filter((lead) =>
    lead.status === "new" ||
    lead.status === "contacted" ||
    lead.status === "qualified" ||
    lead.status === "proposal"
  ).length;
  const pace = resolveCampaignPace({
    won,
    expectedWonByNow,
    remaining,
    daysRemaining: calendar.daysRemaining,
    activePipeline,
  });

  const pipelineByStatus = {
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal: 0,
    won: 0,
    lost: 0,
  } satisfies Record<LeadStatus, number>;
  for (const lead of matching) {
    pipelineByStatus[lead.status] += 1;
  }

  const thisWeekStart = mondayOfWeek(now);
  const thisWeekLog =
    options?.weeklyLogs?.find((log) => log.weekStart === thisWeekStart) ?? null;

  return {
    campaign,
    now: now.toISOString(),
    daysElapsed: calendar.daysElapsed,
    daysRemaining: calendar.daysRemaining,
    totalDays: calendar.totalDays,
    weekNumber: calendar.weekNumber,
    totalWeeks: calendar.totalWeeks,
    won,
    remaining,
    expectedWonByNow,
    pace,
    paceLabel: PACE_LABELS[pace],
    percentComplete: Math.min(100, Math.round((won / campaign.targetClients) * 100)),
    funnel: {
      targets: campaign.funnelTargets,
      actuals: funnelActuals,
    },
    thisWeek: {
      targets: campaign.weeklyTargets,
      logged: thisWeekLog,
    },
    matchingLeadIds: matching.map((lead) => lead.id),
    activePipeline,
    pipelineByStatus,
  };
}

export function campaignPromptSnapshot(progress: CampaignProgress): string {
  const { campaign, funnel } = progress;
  return [
    `Active owner goal: ${campaign.title}`,
    `Owner: ${campaign.ownerName}`,
    `Target: ${campaign.targetClients} won ${campaign.areaLabel} ${campaign.serviceCategory} clients by ${campaign.endDate}`,
    `Progress: ${progress.won}/${campaign.targetClients} won · ${progress.paceLabel} · ${progress.daysRemaining} days left`,
    `Reverse funnel actual/target: outreach ${funnel.actuals.outreach}/${funnel.targets.outreach}, conversations ${funnel.actuals.conversations}/${funnel.targets.conversations}, needs analyses ${funnel.actuals.needsAnalyses}/${funnel.targets.needsAnalyses}, quotes ${funnel.actuals.quotes}/${funnel.targets.quotes}, binds ${funnel.actuals.binds}/${funnel.targets.binds}`,
    `Active campaign pipeline: ${progress.activePipeline} (keep 8+ in Qualified/Proposal)`,
    `This week targets: ${campaign.weeklyTargets.outreach} outreach, ${campaign.weeklyTargets.conversations} conversations, ${campaign.weeklyTargets.needsAnalyses} needs analyses, ${campaign.weeklyTargets.quotes} quotes, ${campaign.weeklyTargets.binds} bind`,
  ].join("\n");
}
