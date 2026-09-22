import { z } from "zod";

export const vitalityInterestOptions = [
  "new_to_vitality",
  "already_member",
  "with_medical_aid",
  "unsure",
] as const;

export type VitalityInterest = (typeof vitalityInterestOptions)[number];

export const vitalityInterestLabels: Record<VitalityInterest, string> = {
  new_to_vitality: "New to Vitality — want to join",
  already_member: "Already on Vitality — need broker support",
  with_medical_aid: "Exploring with medical aid / life cover",
  unsure: "Not sure yet — want a conversation",
};

export const discoveryVitalityLeadSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid WhatsApp / contact number"),
  email: z.string().email("Please enter a valid email"),
  interest: z.enum(vitalityInterestOptions, {
    errorMap: () => ({ message: "Please select what you need help with" }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept POPIA consent to continue" }),
  }),
  website: z.string().max(0).optional(),
});

export type DiscoveryVitalityLeadPayload = z.infer<typeof discoveryVitalityLeadSchema>;

export type DiscoveryVitalitySubmitState = {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof DiscoveryVitalityLeadPayload, string[]>>;
};
