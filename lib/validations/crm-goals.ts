import { z } from "zod";

import { KRUGERSDORP_AREA_OPTIONS } from "@/lib/crm/area";

export const campaignWeeklyLogSchema = z.object({
  weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO week-start date."),
  outreach: z.coerce.number().int().min(0).max(500),
  conversations: z.coerce.number().int().min(0).max(200),
  needsAnalyses: z.coerce.number().int().min(0).max(100),
  quotes: z.coerce.number().int().min(0).max(100),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export const campaignLeadCaptureSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter the contact name.").max(120),
  phone: z
    .string()
    .trim()
    .min(9, "Please enter a phone number.")
    .max(20)
    .regex(/^[+\d][\d\s().-]{7,}$/, "Please enter a valid phone number."),
  company: z.string().trim().min(2, "Please enter the business name.").max(160),
  area: z.string().trim().min(2).max(80).default("Krugersdorp"),
  notes: z.string().trim().max(400).optional().or(z.literal("")),
});

export const leadAreaTagSchema = z.object({
  leadId: z.string().uuid(),
  area: z
    .string()
    .trim()
    .min(2, "Enter an area.")
    .max(80)
    .refine(
      (value) =>
        KRUGERSDORP_AREA_OPTIONS.includes(value as (typeof KRUGERSDORP_AREA_OPTIONS)[number]) ||
        value.length >= 2,
      "Enter a valid area."
    ),
});

export type CampaignWeeklyLogInput = z.infer<typeof campaignWeeklyLogSchema>;
export type CampaignLeadCaptureInput = z.infer<typeof campaignLeadCaptureSchema>;
export type LeadAreaTagInput = z.infer<typeof leadAreaTagSchema>;
