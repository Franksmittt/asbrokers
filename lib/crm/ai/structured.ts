import "server-only";

import { generateObject, generateText } from "ai";
import type { z } from "zod";

import { crmGeminiModel } from "./client";

type StructuredOpts = {
  system: string;
  prompt: string;
  /** Human-readable JSON shape hint for the text fallback. */
  jsonShape: string;
};

function extractJsonPayload(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1].trim() : trimmed;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return JSON.parse(raw.slice(start, end + 1));
  }
  const arrStart = raw.indexOf("[");
  const arrEnd = raw.lastIndexOf("]");
  if (arrStart >= 0 && arrEnd > arrStart) {
    return JSON.parse(raw.slice(arrStart, arrEnd + 1));
  }
  return JSON.parse(raw);
}

function clip(value: unknown, max: number): unknown {
  return typeof value === "string" ? value.slice(0, max) : value;
}

function normalizeAiPayload(payload: unknown): unknown {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return payload;
  const input = payload as Record<string, unknown>;
  const out: Record<string, unknown> = { ...input };

  for (const key of ["headline", "meetingTitle"]) {
    if (key in out) out[key] = clip(out[key], 200);
  }
  for (const key of ["summary", "narrative", "clientSnapshot"]) {
    if (key in out) out[key] = clip(out[key], key === "summary" ? 800 : key === "narrative" ? 1000 : 500);
  }
  if ("draft" in out) out.draft = clip(out.draft, 1200);
  for (const key of ["pipelineInsight", "forecastNote", "channelNote", "complianceNote", "nextBestAction", "recommendedAdvisorFocus", "printFooter", "executiveSummary"]) {
    if (key in out) out[key] = clip(out[key], key === "executiveSummary" ? 500 : 400);
  }

  if (Array.isArray(out.topPriorities)) {
    out.topPriorities = out.topPriorities.slice(0, 5).map((item) => {
      if (!item || typeof item !== "object") return item;
      const row = { ...(item as Record<string, unknown>) };
      row.reason = clip(row.reason, 300);
      const urgency = String(row.urgency ?? "medium").toLowerCase();
      row.urgency = urgency === "high" || urgency === "low" ? urgency : "medium";
      return row;
    });
  }

  for (const key of ["complianceFlags", "strengths", "risks", "weekFocus", "objectives", "talkingPoints", "complianceChecklist", "suggestedAgenda", "suggestedTalkingPoints"]) {
    if (Array.isArray(out[key])) out[key] = (out[key] as unknown[]).slice(0, 6).map((v) => clip(v, 300));
  }

  if (Array.isArray(out.priorities)) {
    out.priorities = (out.priorities as unknown[]).slice(0, 30).map((item) => {
      if (!item || typeof item !== "object") return item;
      const row = { ...(item as Record<string, unknown>) };
      row.shortLabel = clip(row.shortLabel, 48);
      const score = Number(row.priorityScore);
      row.priorityScore = Number.isFinite(score) ? Math.min(100, Math.max(1, Math.round(score))) : 50;
      return row;
    });
  }

  if ("aiPriorityScore" in out) {
    const score = Number(out.aiPriorityScore);
    out.aiPriorityScore = Number.isFinite(score) ? Math.min(100, Math.max(1, Math.round(score))) : 50;
  }

  for (const key of ["overall", "tone", "suggestedTone"]) {
    if (key in out && typeof out[key] === "string") {
      out[key] = String(out[key]).toLowerCase();
    }
  }

  return out;
}

/** Gemini-safe structured generation: try generateObject, fall back to JSON text parse. */
export async function generateCrmStructured<T extends z.ZodType>(
  schema: T,
  opts: StructuredOpts
): Promise<z.infer<T>> {
  try {
    const { object } = await generateObject({
      model: crmGeminiModel(),
      schema,
      system: opts.system,
      prompt: opts.prompt,
    });
    return object;
  } catch (primaryError) {
    console.warn("[CRM AI] generateObject failed, using JSON text fallback");

    const { text } = await generateText({
      model: crmGeminiModel(),
      system: `${opts.system}

Respond with ONLY valid JSON. No markdown fences, no commentary.`,
      prompt: `${opts.prompt}

Required JSON shape:
${opts.jsonShape}`,
    });

    try {
      const parsed = schema.safeParse(normalizeAiPayload(extractJsonPayload(text)));
      if (parsed.success) return parsed.data;
      console.error("[CRM AI] JSON fallback validation failed:", parsed.error.flatten());
    } catch (parseError) {
      console.error("[CRM AI] JSON fallback parse error:", parseError);
    }

    throw primaryError;
  }
}
