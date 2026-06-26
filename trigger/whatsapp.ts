import { task } from "@trigger.dev/sdk";

import { correspondence, crmLeads, getDb } from "@/lib/db";
import { leadPhoneMatches } from "@/lib/whatsapp/lead-phone";
import { sanitizePhone } from "@/lib/whatsapp/phone";

export type ProcessWhatsappInboundPayload = {
  messageId: string;
  from: string;
  text: string;
  timestamp?: string;
};

export const processWhatsappInbound = task({
  id: "process-whatsapp-inbound",
  retry: {
    maxAttempts: 5,
    factor: 2,
    minTimeoutInMs: 1_000,
    maxTimeoutInMs: 30_000,
  },
  run: async (payload: ProcessWhatsappInboundPayload) => {
    const db = getDb();
    if (!db) {
      throw new Error("DATABASE_URL is not configured for Trigger worker");
    }

    const phone = sanitizePhone(payload.from);
    if (!phone) {
      return { ok: false as const, reason: "missing_phone" };
    }

    let [lead] = await db
      .select({ id: crmLeads.id })
      .from(crmLeads)
      .where(leadPhoneMatches(phone))
      .limit(1);

    let createdLead = false;
    if (!lead) {
      const [inserted] = await db
        .insert(crmLeads)
        .values({
          pipelineStatus: "new",
          serviceCategory: "unknown",
          sourceFunnel: "whatsapp_inbound",
          rawPayload: { phone },
        })
        .returning({ id: crmLeads.id });

      if (!inserted) {
        return { ok: false as const, reason: "lead_create_failed", phone };
      }

      lead = inserted;
      createdLead = true;
    }

    await db
      .insert(correspondence)
      .values({
        leadId: lead.id,
        channel: "whatsapp",
        senderType: "client",
        messageBody: payload.text,
        externalMessageId: payload.messageId,
      })
      .onConflictDoNothing({ target: correspondence.externalMessageId });

    return {
      ok: true as const,
      leadId: lead.id,
      messageId: payload.messageId,
      createdLead,
    };
  },
});
