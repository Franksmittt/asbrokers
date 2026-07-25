import { z } from "zod";
import type { ServiceCategory } from "@/lib/crm/types";

/**
 * Allowlisted embed sources for the inline callback form.
 * The client passes only the source key; category/intent/score resolve server-side.
 */
export const CALLBACK_SOURCES = {
  home: {
    serviceCategory: "short_term_business" satisfies ServiceCategory,
    intent: "Callback request — homepage",
    leadScore: 34,
    label: "Homepage",
  },
  business_insurance: {
    serviceCategory: "short_term_business" satisfies ServiceCategory,
    intent: "Business insurance callback",
    leadScore: 40,
    label: "Business insurance page",
  },
  insurance_hub: {
    serviceCategory: "short_term_personal" satisfies ServiceCategory,
    intent: "Insurance callback",
    leadScore: 32,
    label: "Insurance hub",
  },
  retirement_planning: {
    serviceCategory: "retirement_everest" satisfies ServiceCategory,
    intent: "Retirement planning callback",
    leadScore: 32,
    label: "Retirement planning hub",
  },
  estate_planning: {
    serviceCategory: "estate_business" satisfies ServiceCategory,
    intent: "Estate planning callback",
    leadScore: 32,
    label: "Estate planning hub",
  },
  investments: {
    serviceCategory: "retirement_everest" satisfies ServiceCategory,
    intent: "Investment advice callback",
    leadScore: 34,
    label: "Investments hub",
  },
  medical_aid: {
    serviceCategory: "medical_wellness" satisfies ServiceCategory,
    intent: "Medical aid & gap cover callback",
    leadScore: 30,
    label: "Medical aid page",
  },
  about: {
    serviceCategory: "short_term_personal" satisfies ServiceCategory,
    intent: "Callback request — about page",
    leadScore: 28,
    label: "About page",
  },
} as const;

export type CallbackSource = keyof typeof CALLBACK_SOURCES;

export const callbackLeadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(9, "Please enter a phone number we can reach you on.")
    .max(20, "Phone number is too long.")
    .regex(/^[+\d][\d\s().-]{7,}$/, "Please enter a valid phone number."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160)
    .optional()
    .or(z.literal("")),
  note: z.string().trim().max(400, "Please keep the note under 400 characters.").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm we may contact you (POPIA)." }),
  }),
  source: z.enum(Object.keys(CALLBACK_SOURCES) as [CallbackSource, ...CallbackSource[]]),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type CallbackLeadInput = z.infer<typeof callbackLeadSchema>;

export type CallbackActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<Record<"fullName" | "phone" | "email" | "note" | "consent", string[]>>;
};
