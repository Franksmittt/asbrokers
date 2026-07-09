import type { Metadata } from "next";
import { MinimalAppShell } from "@/components/MinimalAppShell";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "CRM | AS Brokers",
  "Staff CRM workspace — not for public indexing."
);

/**
 * CRM route group — dark baseline isolated from marketing (content) layout.
 * URLs remain /crm/* via nested app/(crm)/crm/ segment.
 */
export default function CrmRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MinimalAppShell>
      <div
        data-app-shell="crm"
        className="min-h-screen bg-void text-white antialiased selection:bg-samsung-blue selection:text-white"
      >
        {children}
      </div>
    </MinimalAppShell>
  );
}
