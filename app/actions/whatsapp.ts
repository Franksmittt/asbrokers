"use server";

import { eq } from "drizzle-orm";
import { forbidden } from "next/navigation";
import { z } from "zod";

import { correspondence, crmLeads, getDb } from "@/lib/db";
import { canAccessCrmRole, crmRoleFromUser } from "@/lib/crm/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { phoneFromRawPayload } from "@/lib/whatsapp/lead-phone";
import { sanitizePhone } from "@/lib/whatsapp/phone";

const sendWhatsAppMessageSchema = z.object({
  leadId: z.string().uuid(),
  text: z.string().min(1).max(4096),
});

export type SendWhatsAppMessageResult =
  | { ok: true }
  | { ok: false; error: string };

type GraphMessagesResponse = {
  messages?: Array<{ id?: string }>;
};

/**
 * Send an outbound WhatsApp message via Meta Graph API and persist to correspondence.
 * Requires authenticated Supabase session (staff/admin).
 */
export async function sendWhatsAppMessage(
  leadId: string,
  text: string
): Promise<SendWhatsAppMessageResult> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    forbidden();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    forbidden();
  }

  const role = crmRoleFromUser(user);
  if (!canAccessCrmRole(role)) {
    forbidden();
  }

  const parsed = sendWhatsAppMessageSchema.safeParse({ leadId, text });
  if (!parsed.success) {
    return { ok: false, error: "Invalid message or lead." };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  if (!phoneNumberId || !accessToken) {
    return { ok: false, error: "WhatsApp API is not configured." };
  }

  const [lead] = await db
    .select({ id: crmLeads.id, rawPayload: crmLeads.rawPayload })
    .from(crmLeads)
    .where(eq(crmLeads.id, parsed.data.leadId))
    .limit(1);

  const rawPhone = lead ? phoneFromRawPayload(lead.rawPayload) : null;
  if (!lead || !rawPhone) {
    return { ok: false, error: "Lead not found." };
  }

  const to = sanitizePhone(rawPhone);
  if (!to) {
    return { ok: false, error: "Lead has no valid phone number." };
  }

  const response = await fetch(
    `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: parsed.data.text },
      }),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    if (process.env.NODE_ENV === "development") {
      console.error("[WhatsApp outbound] Graph API error:", detail);
    }
    return { ok: false, error: "Failed to send WhatsApp message." };
  }

  let externalMessageId: string | undefined;
  try {
    const body = (await response.json()) as GraphMessagesResponse;
    externalMessageId = body.messages?.[0]?.id;
  } catch {
    externalMessageId = undefined;
  }

  await db.insert(correspondence).values({
    leadId: lead.id,
    channel: "whatsapp",
    senderType: "staff",
    messageBody: parsed.data.text,
    staffUserId: user.id,
    externalMessageId,
  });

  return { ok: true };
}
