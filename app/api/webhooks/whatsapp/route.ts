import { tasks } from "@trigger.dev/sdk";

import {
  extractWhatsappInboundMessages,
  parseMetaWebhookPayload,
  verifyMetaWebhookSignature,
} from "@/lib/whatsapp/meta-webhook";
import type { processWhatsappInbound } from "@/trigger/whatsapp";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const verifyToken = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN;
  if (
    mode === "subscribe" &&
    challenge &&
    expectedToken &&
    verifyToken === expectedToken
  ) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const appSecret = process.env.META_APP_SECRET;

  if (!appSecret) {
    return new Response("Webhook not configured", { status: 500 });
  }

  const signature = request.headers.get("x-hub-signature-256");
  if (!verifyMetaWebhookSignature(rawBody, signature, appSecret)) {
    return new Response("Invalid signature", { status: 403 });
  }

  let payload: ReturnType<typeof parseMetaWebhookPayload>;
  try {
    payload = parseMetaWebhookPayload(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const inboundMessages = extractWhatsappInboundMessages(payload);
  for (const message of inboundMessages) {
    void tasks
      .trigger<typeof processWhatsappInbound>(
        "process-whatsapp-inbound",
        {
          messageId: message.messageId,
          from: message.from,
          text: message.text,
          timestamp: message.timestamp,
        },
        { idempotencyKey: message.messageId }
      )
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.error("[WhatsApp webhook] Trigger dispatch failed:", error);
        }
      });
  }

  return new Response("OK", { status: 200 });
}
