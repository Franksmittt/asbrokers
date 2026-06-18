import { z } from "zod";

import { ALL_RISK_COVER_ITEMS, INDUSTRY_OPTIONS } from "@/lib/business-risk/catalog";

const coverIdSet = new Set(ALL_RISK_COVER_ITEMS.map((i) => i.id));

export const businessRiskLeadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(9, "Please enter a valid mobile number"),
  company: z.string().min(2, "Please enter your company name"),
  industry: z.enum(INDUSTRY_OPTIONS),
  selectedCoverIds: z
    .array(z.string())
    .refine((ids) => ids.every((id) => coverIdSet.has(id)), "Invalid cover selection"),
  website: z.string().max(0).optional(),
});

export type BusinessRiskLeadPayload = z.infer<typeof businessRiskLeadSchema>;
