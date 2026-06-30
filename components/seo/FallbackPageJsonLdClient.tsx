"use client";

import { usePathname } from "next/navigation";
import { FallbackPageJsonLd } from "@/components/seo/PageJsonLd";

/** Client pathname fallback JSON-LD, avoids headers() in root layout (Phase 9 static pages). */
export function FallbackPageJsonLdClient() {
  const pathname = usePathname() ?? "/";
  return <FallbackPageJsonLd pathname={pathname} />;
}
