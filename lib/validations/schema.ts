import { z } from "zod";

/** Main contact form (low-friction): name, phone, email, topics, consent. No capitalAmount. */
export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  topics: z.array(z.string()).min(1, "Please select at least one topic"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to continue" }) }),
  website: z.string().max(0).optional(),
});

/** Calculator lead capture payload: contact fields + optional capital for lead scoring. */
export const financialCalculatorSchema = contactFormSchema.extend({
  capitalAmount: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" || v == null ? undefined : Number(v)))
    .pipe(z.number().min(0).optional()),
});

/** Footer newsletter signup: email only. HubSpot +10 lead score on submit. */
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const retirementBlueprintLeadSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  retirementTimeline: z.string().min(1, "Please select your retirement timeline"),
  currentConcern: z.string().min(1, "Please select your main concern"),
  capitalRange: z.string().min(1, "Please select a capital range"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to continue" }) }),
  website: z.string().max(0).optional(),
});

export const legacyBlueprintLeadSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  familySituation: z.string().min(1, "Please select a family situation"),
  estateConcern: z.string().min(1, "Please select your main legacy concern"),
  estateReadiness: z.string().min(1, "Please select where your estate plan stands"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to continue" }) }),
  website: z.string().max(0).optional(),
});

export const businessBlueprintLeadSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  businessName: z.string().min(2, "Please enter your business name"),
  businessStage: z.string().min(1, "Please select a business stage"),
  biggestRisk: z.string().min(1, "Please select your biggest business risk"),
  continuityReadiness: z.string().min(1, "Please select your continuity readiness"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to continue" }) }),
  website: z.string().max(0).optional(),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
export type FinancialCalculatorPayload = z.infer<typeof financialCalculatorSchema>;
export type NewsletterPayload = z.infer<typeof newsletterSchema>;
export type RetirementBlueprintLeadPayload = z.infer<typeof retirementBlueprintLeadSchema>;
export type LegacyBlueprintLeadPayload = z.infer<typeof legacyBlueprintLeadSchema>;
export type BusinessBlueprintLeadPayload = z.infer<typeof businessBlueprintLeadSchema>;

/** Action state returned to client for useActionState; supports field-level errors. */
export interface ContactActionState {
  success: boolean;
  message?: string;
  fieldErrors?: {
    fullName?: string[];
    phone?: string[];
    email?: string[];
    topics?: string[];
    consent?: string[];
    capitalAmount?: string[];
    website?: string[];
  };
}

export interface RetirementBlueprintActionState {
  success: boolean;
  message?: string;
  fieldErrors?: {
    fullName?: string[];
    phone?: string[];
    email?: string[];
    retirementTimeline?: string[];
    currentConcern?: string[];
    capitalRange?: string[];
    consent?: string[];
    website?: string[];
  };
}

export interface LegacyBlueprintActionState {
  success: boolean;
  message?: string;
  fieldErrors?: {
    fullName?: string[];
    phone?: string[];
    email?: string[];
    familySituation?: string[];
    estateConcern?: string[];
    estateReadiness?: string[];
    consent?: string[];
    website?: string[];
  };
}

export interface BusinessBlueprintActionState {
  success: boolean;
  message?: string;
  fieldErrors?: {
    fullName?: string[];
    phone?: string[];
    email?: string[];
    businessName?: string[];
    businessStage?: string[];
    biggestRisk?: string[];
    continuityReadiness?: string[];
    consent?: string[];
    website?: string[];
  };
}
