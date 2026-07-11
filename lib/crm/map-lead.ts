import type { CrmLead, LeadFunnelData, LeadStatus, ServiceCategory } from "@/lib/crm/types";
import type { crmLeads } from "@/lib/db/schema";

const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
];

const SERVICE_CATEGORIES: ServiceCategory[] = [
  "retirement_everest",
  "short_term_business",
  "estate_business",
  "short_term_personal",
  "life_personal",
  "medical_wellness",
  "claims",
];

function parseLeadStatus(value: string | null | undefined): LeadStatus {
  if (value && LEAD_STATUSES.includes(value as LeadStatus)) {
    return value as LeadStatus;
  }
  return "new";
}

function parseServiceCategory(value: string | null | undefined): ServiceCategory {
  if (value && SERVICE_CATEGORIES.includes(value as ServiceCategory)) {
    return value as ServiceCategory;
  }
  return "retirement_everest";
}

function parseFunnelData(value: unknown): LeadFunnelData {
  if (!value || typeof value !== "object") {
    return {
      assessment: ", ",
      score: ", ",
      keyRisk: ", ",
      capital: ", ",
    };
  }
  const row = value as Record<string, unknown>;
  return {
    assessment: typeof row.assessment === "string" ? row.assessment : ", ",
    score: typeof row.score === "string" ? row.score : ", ",
    keyRisk: typeof row.keyRisk === "string" ? row.keyRisk : ", ",
    capital: typeof row.capital === "string" ? row.capital : ", ",
  };
}

/** Map Drizzle crm_leads row to Kanban / detail UI shape. */
export function mapDbLeadToCrmLead(row: typeof crmLeads.$inferSelect): CrmLead {
  const payload = (row.rawPayload ?? {}) as Record<string, unknown>;

  return {
    id: row.id,
    name: typeof payload.name === "string" ? payload.name : "Unknown lead",
    email: typeof payload.email === "string" ? payload.email : "",
    phone: typeof payload.phone === "string" ? payload.phone : "",
    status: parseLeadStatus(row.pipelineStatus),
    intent:
      typeof payload.intent === "string"
        ? payload.intent
        : row.sourceFunnel?.trim() || "Inbound enquiry",
    service_category: parseServiceCategory(row.serviceCategory),
    lead_score: row.leadScore,
    assignedAdvisorId: row.assignedAdvisor ?? "",
    company: typeof payload.company === "string" ? payload.company : undefined,
    capitalHint: typeof payload.capitalHint === "string" ? payload.capitalHint : undefined,
    estimatedCapital:
      typeof payload.estimatedCapital === "number" ? payload.estimatedCapital : 0,
    funnelData: parseFunnelData(payload.funnelData),
    aiPriorityLabel:
      typeof payload.aiPriorityLabel === "string" ? payload.aiPriorityLabel : undefined,
    aiPriorityScore:
      typeof payload.aiPriorityScore === "number" ? payload.aiPriorityScore : undefined,
    recommendedAdvisorName:
      typeof payload.recommendedAdvisorName === "string"
        ? payload.recommendedAdvisorName
        : typeof (payload.autoRoute as Record<string, unknown> | undefined)?.advisorName ===
            "string"
          ? ((payload.autoRoute as Record<string, unknown>).advisorName as string)
          : undefined,
    delegatedAdvisorId:
      typeof payload.delegatedAdvisorId === "string" ? payload.delegatedAdvisorId : undefined,
    delegatedAdvisorName:
      typeof payload.delegatedAdvisorName === "string"
        ? payload.delegatedAdvisorName
        : undefined,
    calculatorSession: parseCalculatorSession(payload.calculatorSession),
  };
}

function parseCalculatorSession(value: unknown): CrmLead["calculatorSession"] {
  if (!value || typeof value !== "object") return undefined;
  const row = value as Record<string, unknown>;
  const drawdown =
    typeof row.drawdownPercentage === "number" ? row.drawdownPercentage : undefined;
  return {
    calculatorId: typeof row.calculatorId === "string" ? row.calculatorId : undefined,
    drawdownPercentage: drawdown,
    capturedAt: typeof row.capturedAt === "string" ? row.capturedAt : undefined,
    notes: typeof row.notes === "string" ? row.notes : undefined,
  };
}
