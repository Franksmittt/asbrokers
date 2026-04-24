import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  stega: studioUrl
    ? {
        enabled: true,
        studioUrl,
      }
    : undefined,
});
