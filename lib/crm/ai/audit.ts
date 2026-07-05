import "server-only";

import { crmAiAuditLog, getDb } from "@/lib/db";

import { CRM_GEMINI_MODEL } from "./client";

export type CrmAiActionType =
  | "morning_brief"
  | "lead_insight"
  | "reply_draft"
  | "executive_report"
  | "kanban_priorities"
  | "thread_sentiment"
  | "pre_meeting_brief"
  | "dashboard_chat";

/** Non-blocking append to crm_ai_audit_log. Never throws. */
export async function logCrmAiAction(input: {
  staffUserId?: string | null;
  actionType: CrmAiActionType;
  leadId?: string | null;
  summary?: string;
}): Promise<void> {
  const db = getDb();
  if (!db) return;

  try {
    await db.insert(crmAiAuditLog).values({
      staffUserId: input.staffUserId ?? null,
      actionType: input.actionType,
      leadId: input.leadId ?? null,
      model: CRM_GEMINI_MODEL,
      summary: input.summary?.slice(0, 2000) ?? null,
    });
  } catch (error) {
    console.error("[CRM AI] audit log failed:", error);
  }
}
