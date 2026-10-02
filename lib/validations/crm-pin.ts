import { z } from "zod";

export const crmPinForgotSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid work email.")
    .max(120),
});

export const crmPinResetSchema = z
  .object({
    token: z.string().trim().min(20, "Reset link is incomplete."),
    pin: z
      .string()
      .trim()
      .regex(/^\d{5}$/, "Enter a 5-digit PIN."),
    confirmPin: z.string().trim(),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "PINs do not match.",
    path: ["confirmPin"],
  });
