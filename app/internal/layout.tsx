import type { Metadata } from "next";
import { MinimalAppShell } from "@/components/MinimalAppShell";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Internal | AS Brokers",
  "Internal tools — not for public indexing."
);

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return <MinimalAppShell>{children}</MinimalAppShell>;
}
