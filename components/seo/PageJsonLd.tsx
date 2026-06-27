"use client";

import {
  buildPageGraph,
  fallbackWebPageFromPath,
  pathHasExplicitSchema,
  serializeJsonLdGraph,
  type PageGraphInput,
} from "@/lib/seo";
import { getPrimaryPageImage } from "@/lib/primary-page-images";

type PageJsonLdProps = PageGraphInput;

function withPrimaryImage(props: PageGraphInput): PageGraphInput {
  const primaryImagePath = props.primaryImagePath ?? getPrimaryPageImage(props.path);
  return primaryImagePath ? { ...props, primaryImagePath } : props;
}

/** Single JSON-LD @graph script per page (Phase 4.1). */
export function PageJsonLd(props: PageGraphInput) {
  const graph = buildPageGraph(withPrimaryImage(props));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLdGraph(graph) }}
    />
  );
}

type FallbackPageJsonLdProps = {
  pathname: string;
};

/** Base @graph for routes without page-specific schema nodes. */
export function FallbackPageJsonLd({ pathname }: FallbackPageJsonLdProps) {
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

  const graph = buildPageGraph(
    withPrimaryImage({
      path: pathname || "/",
      webPage: fallbackWebPageFromPath(pathname || "/"),
    })
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLdGraph(graph) }}
    />
  );
}

export type { PageJsonLdProps };
