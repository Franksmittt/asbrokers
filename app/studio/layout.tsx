import type { Metadata } from "next";
import { MinimalAppShell } from "@/components/MinimalAppShell";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Studio | AS Brokers",
  "Internal content studio, not for public indexing."
);

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <MinimalAppShell>{children}</MinimalAppShell>;
}
