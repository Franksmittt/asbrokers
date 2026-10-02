import type { Metadata } from "next";
import { MinimalAppShell } from "@/components/MinimalAppShell";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Command Workspace | AS Brokers",
  "Staff workspace, not for public indexing."
);

/**
 * CRM route group — Paper & Ink light baseline (isolated from marketing layout).
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
        className="min-h-screen bg-[#F7F6F3] text-[#1D1D1F] antialiased selection:bg-[#0057B8] selection:text-white"
      >
        {children}
      </div>
    </MinimalAppShell>
  );
}
