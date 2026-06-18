import { z } from "zod";

export const legacyChecklistLeadSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  surname: z.string().min(1, "Please enter your surname"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(9, "Please enter a valid mobile number"),
  age: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => {
      if (v === "" || v == null) return undefined;
      const n = Number(v);
      return Number.isFinite(n) ? n : undefined;
    }),
  businessOwner: z.enum(["yes", "no", ""]).optional().transform((v) => (v === "yes" || v === "no" ? v : undefined)),
  website: z.string().max(0).optional(),
});

export type LegacyChecklistLeadPayload = z.infer<typeof legacyChecklistLeadSchema>;
