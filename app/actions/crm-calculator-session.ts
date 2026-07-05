"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { mergeLeadRawPayload } from "@/lib/crm/lead-metadata";
import { requireCrmAccess } from "@/lib/crm/staff-access";

const sessionSchema = z.object({
  leadId: z.string().uuid(),
  calculatorId: z.string().min(1).max(64),
  drawdownPercentage: z.number().min(0).max(100).optional(),
  notes: z.string().max(500).optional(),
});

export type RecordCalculatorSessionResult =
  | { ok: true }
  | { ok: false; error: string };

/** Merge calculator session snapshot into lead raw_payload (non-destructive). */
export async function recordCalculatorSessionForLead(
  input: z.infer<typeof sessionSchema>
): Promise<RecordCalculatorSessionResult> {
  await requireCrmAccess();

  const parsed = sessionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid session data." };
  }

  const { leadId, calculatorId, drawdownPercentage, notes } = parsed.data;
  const saved = await mergeLeadRawPayload(leadId, {
    calculatorSession: {
      calculatorId,
      drawdownPercentage,
      notes: notes?.trim() || undefined,
      capturedAt: new Date().toISOString(),
    },
  });

  if (!saved) {
    return { ok: false, error: "Could not save session to lead." };
  }

  revalidatePath(`/crm/leads/${leadId}`);
  revalidatePath("/crm/kanban");
  return { ok: true };
}
