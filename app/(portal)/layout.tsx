import type { Metadata } from "next";
import { MinimalAppShell } from "@/components/MinimalAppShell";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Client Portal | AS Brokers",
  "Private client portal — not for public indexing."
);

/**
 * Client Portal route group — dark baseline isolated from marketing layout.
 * URLs remain /portal/* via nested app/(portal)/portal/ segment (Phase 2+ pages).
 */
export default function PortalRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MinimalAppShell>
      <div
        data-app-shell="portal"
        className="min-h-screen bg-void text-white antialiased selection:bg-samsung-blue selection:text-white"
      >
        {children}
      </div>
    </MinimalAppShell>
  );
}
