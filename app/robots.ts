import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteOrigin } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /**
         * App routes use X-Robots-Tag via middleware instead of Disallow here
         * (login / studio / CRM / internal). Keeps `/api/` out of crawler budgets only.
         */
        disallow: ["/api/"],
      },
    ],
    host: getSiteOrigin(),
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
