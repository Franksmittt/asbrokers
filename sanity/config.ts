import { deskTool } from "sanity/desk";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const config = {
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    deskTool(),
    presentationTool({
      previewUrl: {
        origin: typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://localhost:3000",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
};
