import { z } from "zod";

const answerFields = {
  age: z.enum(["under-50", "50-59", "60-69", "70+"]),
  exerciseDays: z.enum(["0", "1-2", "3-4", "5+"]),
  walk30Minutes: z.enum(["yes", "no"]),
  smoke: z.enum(["yes", "no"]),
  sleepHours: z.enum(["less-than-6", "6-7", "7-8", "more-than-8"]),
  checkup12Months: z.enum(["yes", "no"]),
  knowBloodPressure: z.enum(["yes", "no"]),
  knowCholesterol: z.enum(["yes", "no"]),
  healthRating: z.enum(["poor", "fair", "good", "excellent"]),
  retirement20Years: z.enum(["yes", "no", "unsure"]),
};

export const healthyRetirementSubmitSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .optional()
    .transform((v) => (v?.trim() ? v.trim() : undefined)),
  ...answerFields,
  website: z.string().max(0).optional(),
});

export type HealthyRetirementSubmitPayload = z.infer<typeof healthyRetirementSubmitSchema>;
