import { z } from "zod";

import { BLOCK_TYPES, CALLOUT_VARIANTS, PUBLISH_STATUSES } from "./types";

const statusSchema = z.enum(PUBLISH_STATUSES);
const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens.")
  .max(80);

export const courseSettingsSchema = z.object({
  title: z.string().trim().min(1, "Course title is required").max(160),
  slug: slugSchema,
  introduction: z.string().trim().max(8000).default(""),
  featuredImageUrl: z.string().trim().max(2000).optional().nullable(),
  status: statusSchema.default("draft"),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  registrationRequired: z.coerce.boolean().default(true),
  sequentialLocking: z.coerce.boolean().default(true),
});

export const lessonSettingsSchema = z.object({
  title: z.string().trim().min(1, "Lesson title is required").max(160),
  slug: slugSchema,
  status: statusSchema.default("draft"),
  isFinal: z.coerce.boolean().default(false),
  responseRequired: z.coerce.boolean().default(true),
  responsePrompt: z.string().trim().max(2000).default(""),
  offerHeading: z.string().trim().max(160).optional().default(""),
  offerBody: z.string().trim().max(4000).optional().default(""),
  offerButtonText: z.string().trim().max(80).optional().default(""),
  offerButtonUrl: z.string().trim().max(2000).optional().default(""),
  offerOpenInNewTab: z.coerce.boolean().default(true),
});

export const headingBlockSchema = z.object({
  type: z.literal("heading"),
  level: z.coerce.number().pipe(z.union([z.literal(2), z.literal(3)])).default(2),
  text: z.string().trim().max(200).default(""),
});

export const textBlockSchema = z.object({
  type: z.literal("text"),
  body: z.string().max(20_000).default(""),
});

export const videoBlockSchema = z.object({
  type: z.literal("video"),
  url: z.string().trim().max(500).default(""),
  caption: z.string().trim().max(200).optional().default(""),
  posterUrl: z.string().trim().max(2000).optional().default(""),
});

export const calculatorBlockSchema = z.object({
  type: z.literal("calculator"),
  calculatorId: z.string().trim().min(1).max(80),
});

export const imageBlockSchema = z.object({
  type: z.literal("image"),
  url: z.string().trim().max(2000).default(""),
  alt: z.string().trim().max(125).default(""),
  caption: z.string().trim().max(200).optional().default(""),
});

export const calloutBlockSchema = z.object({
  type: z.literal("callout"),
  variant: z.enum(CALLOUT_VARIANTS).default("key"),
  title: z.string().trim().max(120).optional().default(""),
  body: z.string().trim().max(4000).default(""),
});

export const ctaBlockSchema = z.object({
  type: z.literal("cta"),
  heading: z.string().trim().max(160).optional().default(""),
  body: z.string().trim().max(2000).optional().default(""),
  buttonText: z.string().trim().min(1, "Button text is required").max(80),
  buttonUrl: z.string().trim().min(1, "Button URL is required").max(2000),
  openInNewTab: z.coerce.boolean().default(false),
});

export const blockPayloadSchema = z.discriminatedUnion("type", [
  headingBlockSchema,
  textBlockSchema,
  videoBlockSchema,
  calculatorBlockSchema,
  imageBlockSchema,
  calloutBlockSchema,
  ctaBlockSchema,
]);

const checkboxTrue = z.preprocess(
  (value) => value === true || value === "true" || value === "on",
  z.literal(true, {
    errorMap: () => ({ message: "Privacy consent is required to start the course." }),
  })
);

const checkboxOptional = z.preprocess(
  (value) => value === true || value === "true" || value === "on",
  z.boolean().optional().default(false)
);

export const studentRegisterSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  surname: z.string().trim().min(1, "Surname is required").max(80),
  email: z.string().trim().email("Enter a valid email address").max(160).toLowerCase(),
  privacyConsent: checkboxTrue,
  marketingConsent: checkboxOptional,
  courseSlug: slugSchema,
});

export const lessonResponseSchema = z.object({
  courseSlug: slugSchema,
  lessonSlug: slugSchema,
  answer: z.string().trim().min(8, "Please write a short answer before continuing.").max(4000),
});

export { BLOCK_TYPES };
