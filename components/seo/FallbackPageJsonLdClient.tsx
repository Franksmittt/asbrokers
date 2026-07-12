"use client";

import { usePathname } from "next/navigation";
import {
  buildPageGraph,
  fallbackWebPageFromPath,
  pathHasExplicitSchema,
  serializeJsonLdGraph,
} from "@/lib/seo";
import { getPrimaryPageImage } from "@/lib/primary-page-images";

/** Client pathname fallback JSON-LD, avoids headers() in root layout (Phase 9 static pages). */
export function FallbackPageJsonLdClient() {
  const pathname = usePathname() ?? "/";

  if (pathHasExplicitSchema(pathname)) return null;
  if (
    pathname.startsWith("/crm") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/embed") ||
    pathname.startsWith("/internal") ||
    pathname.startsWith("/api")
  ) {
    return null;
  }

  const primaryImagePath = getPrimaryPageImage(pathname || "/");
  const graph = buildPageGraph({
    path: pathname || "/",
    webPage: fallbackWebPageFromPath(pathname || "/"),
    ...(primaryImagePath ? { primaryImagePath } : {}),
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLdGraph(graph) }}
    />
  );
}
