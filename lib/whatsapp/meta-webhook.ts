import { createHmac, timingSafeEqual } from "node:crypto";

import { sanitizePhone } from "@/lib/whatsapp/phone";

export type WhatsappInboundMessage = {
  messageId: string;
  from: string;
  text: string;
  timestamp?: string;
};

type MetaTextMessage = {
  id: string;
  from: string;
  timestamp?: string;
  type: string;
  text?: { body?: string };
};

type MetaWebhookPayload = {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      field?: string;
      value?: {
        messages?: MetaTextMessage[];
      };
    }>;
  }>;
};

/**
 * Verify Meta X-Hub-Signature-256 (HMAC-SHA256 of raw body).
 */
export function verifyMetaWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string
): boolean {
  if (!signatureHeader?.startsWith("sha256=")) {
    return false;
  }

  const providedHex = signatureHeader.slice("sha256=".length);
  const computedHex = createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");

  try {
    const provided = Buffer.from(providedHex, "hex");
    const computed = Buffer.from(computedHex, "hex");
    if (provided.length !== computed.length) {
      return false;
    }
    return timingSafeEqual(provided, computed);
  } catch {
    return false;
  }
}

/** Extract inbound text messages from a verified Meta webhook payload. */
export function extractWhatsappInboundMessages(payload: MetaWebhookPayload): WhatsappInboundMessage[] {
  const messages: WhatsappInboundMessage[] = [];

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "messages") {
        continue;
      }
      for (const message of change.value?.messages ?? []) {
        if (message.type !== "text" || !message.text?.body || !message.id || !message.from) {
          continue;
        }
        messages.push({
          messageId: message.id,
          from: sanitizePhone(message.from),
          text: message.text.body,
          timestamp: message.timestamp,
        });
      }
    }
  }

  return messages;
}

export function parseMetaWebhookPayload(rawBody: string): MetaWebhookPayload {
  return JSON.parse(rawBody) as MetaWebhookPayload;
}
