import { defineConfig } from "@trigger.dev/sdk";
import { puppeteer } from "@trigger.dev/build/extensions/puppeteer";

export default defineConfig({
  project: process.env.TRIGGER_PROJECT_REF ?? "proj_vkftltiztowsaazvclpq",
  dirs: ["./trigger"],
  maxDuration: 60, // seconds (PDF render + email)
  build: {
    extensions: [puppeteer()],
    external: ["jose", "puppeteer"],
  },
});
