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

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
export type FinancialCalculatorPayload = z.infer<typeof financialCalculatorSchema>;

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
