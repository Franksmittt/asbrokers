import type { Metadata } from "next";
import { MagicLinkBootstrap } from "@/components/MagicLinkBootstrap";
import { MinimalAppShell } from "@/components/MinimalAppShell";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Authentication | AS Brokers",
  "Authentication callback, not for public indexing."
);

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <MinimalAppShell>
      <MagicLinkBootstrap />
      {children}
    </MinimalAppShell>
  );
}
