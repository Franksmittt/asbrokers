import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteOrigin } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /**
         * Private app routes use X-Robots-Tag via middleware (login / studio / CRM / internal).
         * `/api/` kept out of crawl budget via Disallow.
         */
        disallow: ["/api/"],
      },
      /** Phase 1.3 — block uncompensated LLM training scrapers (mirrors middleware 403). */
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      /** Allow answer-engine retrieval bots on public content. */
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
    ],
    host: getSiteOrigin(),
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
