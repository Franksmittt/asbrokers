import { convertToModelMessages, streamText, tool, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { getRagContext } from "@/lib/db/rag";
import { captureCallbackLead } from "@/lib/chat/capture-callback-lead";
import { DISCOVERY_HEALTH_KNOWLEDGE } from "@/lib/chat/discovery-health-knowledge";
import { calculateEstateDuty } from "./tools";
import {
  calculateEstateDutySchema,
  chatCallbackLeadToolSchema,
} from "./schemas";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

/**
 * CONTAINMENT 2026-07-24: Everest / Amethyst product tools removed from public chat.
 * Restore calculateStrategicIncome128 + calcAmethystAnnuity only after provider/compliance approval.
 */
const BASELINE_SYSTEM_PROMPT = `You are the AS Brokers CC (FSP 17273) educational assistant. You provide general informational education for South African households on medical aid / Gap Cover concepts, estate duty illustrations, retirement planning concepts, and insurance/risk concepts.

FAIS BOUNDARY (never violate):
- Your answers are factual information as contemplated in Section 1(3)(a) of the FAIS Act, 37 of 2002.
- You do NOT give personal financial advice, product recommendations, or suitability assessments.
- You do NOT promote, quote, or calculate named investment product yields (including Everest Wealth, Amethyst, Strategic Income, Strategic Growth, or any percentage return shelf).
- If asked about a specific investment product, yield, or whether something is suitable, explain that personal recommendations require a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273), and point to /contact or /investments for educational hubs.
- Never invent tax, premium, claim, or investment figures.

SCOPE:
- Discovery Health Medical Scheme, Gap Cover stacking concepts, broker vs direct pricing education, plan-series education, MSA/ATB/PHF/network concepts. When the user asks about Discovery, medical aid, or Gap Cover, answer from the DISCOVERY HEALTH knowledge block below.
- South African estate duty and executor-cost illustrations (use calculateEstateDuty when asked for an estimate). Always state the result is illustrative only.
- General retirement and insurance education concepts. Point users to /retirement-planning, /insurance, /estate-planning, /calculators, or /insights for deeper reading.
- Callback / lead capture: you may collect contact details so AS Brokers can call the user back (see LEAD CAPTURE below).

CRITICAL CONSTRAINTS:
1. Discovery / medical: never give clinical advice; never guarantee claim outcomes or "unlimited gap"; treat listed premiums as illustrative starting figures, not quotes; state that personal recommendations require a licensed FSP 17273 consultation.
2. Estate duty tool: educational illustration only; not a legal opinion or estate plan.
3. Lead capture: never invent name, phone, or email. Never call captureCallbackLead unless the user has provided those three fields and given a clear yes to be contacted (POPIA). Do not store details if they refuse consent.
4. Do not claim to be a fiduciary online or replace advice.

LEAD CAPTURE (use captureCallbackLead tool):
- Offer a callback when the user asks to be called, leave details, speak to an adviser, book a consultation, or after a helpful answer when a human follow-up would clearly help. Phrase it as optional: "Would you like AS Brokers to call you back? I can take your name, phone, and email."
- Collect missing fields one or two at a time if needed: full name, phone (preferably SA mobile), email.
- Ask explicitly: "May AS Brokers CC (FSP 17273) contact you about this enquiry?" Only if they clearly agree, call captureCallbackLead with consent: true.
- Set interest to the best match: discovery_health | estate_planning | insurance | general_callback. Prefer general_callback instead of any investment-product interest tags.
- Put a short summary of what they want in notes (optional, max ~1 sentence).
- After the tool succeeds, confirm an adviser will contact them within one business day. If it fails, offer WhatsApp +27 66 227 6044 or /contact.

When the user asks for an estate duty estimate, use the calculateEstateDuty tool with their gross estate value, liabilities, and spousal inheritance (and optional charity donations). Summarise as an illustration only.

After answering, offer a next step that stays educational (callback, /contact needs analysis, /calculators, Discovery Health page, insights library).

${DISCOVERY_HEALTH_KNOWLEDGE}`;

function getLatestUserMessageText(messages: unknown[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i] as
      | { role?: string; content?: string; parts?: Array<{ type: string; text?: string }> }
      | undefined;
    if (!m || m.role !== "user") continue;
    if (typeof m.content === "string" && m.content.trim()) return m.content.trim();
    if (Array.isArray(m.parts)) {
      const text = m.parts
        .filter(
          (p): p is { type: "text"; text: string } =>
            p.type === "text" && typeof (p as { text?: string }).text === "string"
        )
        .map((p) => (p as { text: string }).text)
        .join(" ")
        .trim();
      if (text) return text;
    }
  }
  return null;
}

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const raw = await req.text();
    let body: { messages?: unknown };
    try {
      body = raw ? (JSON.parse(raw) as { messages?: unknown }) : {};
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const rawMessages = body.messages;
    const messages: unknown[] = Array.isArray(rawMessages) ? rawMessages : [];

    const latestText = getLatestUserMessageText(messages);
    const ragContext = latestText ? await getRagContext(latestText, 5) : "";
    const retrievedBlock = ragContext
      ? `\n\n[Retrieved context]:\n${ragContext}`
      : "\n\n[Retrieved context]: [No relevant context retrieved.]";
    const systemPrompt = BASELINE_SYSTEM_PROMPT + retrievedBlock;

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages as UIMessage[]),
      tools: {
        calculateEstateDuty: tool({
          description:
            "Illustrative South African estate duty, executor fees, and total estate costs. Educational only — not legal or financial advice. Use when the user asks about estate duty, cost of dying, or estate liquidity.",
          inputSchema: calculateEstateDutySchema,
          execute: async (args) => {
            const parsed = calculateEstateDutySchema.safeParse(args);
            if (!parsed.success) throw new Error(parsed.error.message);
            return calculateEstateDuty(parsed.data);
          },
        }),
        captureCallbackLead: tool({
          description:
            "Save a callback / leave-details lead to the AS Brokers CRM after the user gives name, phone, email, and explicit POPIA consent to be contacted. Use when they ask to be called back or agree to leave details.",
          /** Gemini-safe schema (boolean, not z.literal(true)). */
          inputSchema: chatCallbackLeadToolSchema,
          execute: async (args) => captureCallbackLead(args),
        }),
      },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[chat] stream error:", message);
        if (
          message.includes("quota") ||
          message.includes("RESOURCE_EXHAUSTED") ||
          message.includes("429")
        ) {
          return "Gemini API quota exceeded for this key. Please enable billing or use a key with available quota.";
        }
        return "Chat is temporarily unavailable. Please try again.";
      },
    });
  } catch (err) {
    console.error("[chat]", err);
    return new Response(
      JSON.stringify({
        error: "Chat is temporarily unavailable. Please try again or contact AS Brokers.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
