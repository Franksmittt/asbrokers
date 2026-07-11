import type { Metadata } from "next";
import { MinimalAppShell } from "@/components/MinimalAppShell";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Embed | AS Brokers",
  "Legacy calculator embed, not for public indexing."
);

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return <MinimalAppShell>{children}</MinimalAppShell>;
}
