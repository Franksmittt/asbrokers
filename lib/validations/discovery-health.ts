import { z } from "zod";

export const discoveryStatusOptions = [
  "looking_to_join",
  "looking_to_switch",
  "unsure",
] as const;

export type DiscoveryStatus = (typeof discoveryStatusOptions)[number];

export const discoveryStatusLabels: Record<DiscoveryStatus, string> = {
  looking_to_join: "Looking to join",
  looking_to_switch: "Looking to switch",
  unsure: "Unsure",
};

export const discoveryHealthLeadSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid WhatsApp / contact number"),
  email: z.string().email("Please enter a valid email"),
  currentStatus: z.enum(discoveryStatusOptions, {
    errorMap: () => ({ message: "Please select your current status" }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept POPIA consent to continue" }),
  }),
  website: z.string().max(0).optional(),
});

export type DiscoveryHealthLeadPayload = z.infer<typeof discoveryHealthLeadSchema>;

export type DiscoveryHealthSubmitState = {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof DiscoveryHealthLeadPayload, string[]>>;
};
