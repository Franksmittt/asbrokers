import { convertToModelMessages, streamText, tool, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { getRagContext } from "@/lib/db/rag";
import { DISCOVERY_HEALTH_KNOWLEDGE } from "@/lib/chat/discovery-health-knowledge";
import {
  calculateEstateDuty,
  calculateStrategicIncome128,
  calculateAmethystLivingAnnuity,
} from "./tools";
import {
  calculateEstateDutySchema,
  calculateStrategicIncomeSchema,
  calcAmethystAnnuitySchema,
} from "./schemas";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

/** Baseline system prompt: hardcoded FAIS/Everest constraints. Do not remove or relax. */
const BASELINE_SYSTEM_PROMPT = `You are the AS Brokers CC (FSP 17273) digital wealth assistant. You help South African households and high-net-worth individuals understand Everest Wealth products, estate duty, retirement income, Discovery Health Medical Scheme, medical aid structuring, and Gap Cover.

SCOPE (answer within this; never say you can only help with Everest Wealth):
- Everest Wealth voluntary products and Amethyst Living Annuity (use calculation tools where applicable).
- South African estate duty and executor-cost illustrations (use calculateEstateDuty).
- Discovery Health Medical Scheme, Gap Cover stacking, broker vs direct pricing, plan-series education, MSA/ATB/PHF/network concepts, and how AS Brokers (FSP 17273) supports applications and claims. When the user asks about Discovery, medical aid, or Gap Cover, answer from the DISCOVERY HEALTH knowledge block below — do not refuse or pivot only to Everest.
- For personal medical-aid advice or a Discovery + Gap audit, point to https://www.asbrokers.co.za/solutions/discovery-health or /contact — you educate; you do not replace a FAIS needs analysis.

CRITICAL CONSTRAINTS (never violate):
1. Minimum investment for any Everest voluntary product (Strategic Income, Onyx Income+, Strategic Growth) is R100,000. If the user implies an amount below this, politely state the minimum and do not run a calculation below R100,000.
2. Always disclose liquidity: voluntary Everest products have a 120-day notice period for withdrawals and a potential 15% early exit penalty. Mention this when discussing these products.
3. Tax accuracy: Everest dividend returns are subject to 20% Dividends Withholding Tax (DWT), not marginal income tax (which can be up to 45%). Use the calculation tools to show exact figures; never invent tax numbers.
4. Discovery / medical: never give clinical advice; never guarantee claim outcomes or "unlimited gap"; treat listed premiums as illustrative 2026 starting figures, not quotes; state that personal recommendations require a licensed FSP 17273 consultation.

When the user asks for an estate duty estimate, use the calculateEstateDuty tool with their gross estate value, liabilities, and spousal inheritance (and optional charity donations).
When the user asks for Strategic Income 12.8% or monthly income on a lump sum (voluntary capital), use calculateStrategicIncome128 with the capital amount (minimum R100,000).
When the user asks for Amethyst Living Annuity or drawdown income from retirement capital, use calcAmethystAnnuity with capital amount (minimum R100,000) and drawdown percentage (2.5 to 17.5).

After running a tool, summarize the result in plain language and offer a next step (e.g. contact AS Brokers, try another calculator, open the Discovery Health page).

${DISCOVERY_HEALTH_KNOWLEDGE}`;

function getLatestUserMessageText(messages: unknown[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i] as { role?: string; content?: string; parts?: Array<{ type: string; text?: string }> } | undefined;
    if (!m || m.role !== "user") continue;
    if (typeof m.content === "string" && m.content.trim()) return m.content.trim();
    if (Array.isArray(m.parts)) {
      const text = m.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text" && typeof (p as { text?: string }).text === "string")
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
            "Calculate South African estate duty, executor fees, and total estate costs. Use when the user asks about estate duty, cost of dying, or estate liquidity.",
          inputSchema: calculateEstateDutySchema,
          execute: async (args) => {
            const parsed = calculateEstateDutySchema.safeParse(args);
            if (!parsed.success) throw new Error(parsed.error.message);
            return calculateEstateDuty(parsed.data);
          },
        }),
        calculateStrategicIncome128: tool({
          description:
            "Calculate net monthly income from the Everest 12.8% Strategic Income product. Minimum investment R100,000. Returns gross/net dividend, loyalty bonus, and 5-year return.",
          inputSchema: calculateStrategicIncomeSchema,
          execute: async (args) => {
            const parsed = calculateStrategicIncomeSchema.safeParse(args);
            if (!parsed.success) throw new Error(parsed.error.message);
            return calculateStrategicIncome128(parsed.data);
          },
        }),
        calcAmethystAnnuity: tool({
          description:
            "Calculate Amethyst Living Annuity income: gross and net monthly income for a given retirement capital and drawdown rate (2.5% to 17.5%). Minimum capital R100,000. Uses SARS 2026/27 tax for 65+.",
          inputSchema: calcAmethystAnnuitySchema,
          execute: async (args) => {
            const parsed = calcAmethystAnnuitySchema.safeParse(args);
            if (!parsed.success) throw new Error(parsed.error.message);
            return calculateAmethystLivingAnnuity(parsed.data);
          },
        }),
      },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes("quota") || message.includes("RESOURCE_EXHAUSTED") || message.includes("429")) {
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
