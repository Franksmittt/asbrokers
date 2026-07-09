import { MarketingShell } from "@/components/MarketingShell";

/** Warm premium canvas for all public marketing routes under (content). */
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <MarketingShell>
      <div
        className="min-h-screen bg-warm-canvas pb-24 text-shark md:pb-0"
        style={{ backgroundColor: "#F7F6F3", color: "#1D1D1F" }}
      >
        {children}
      </div>
    </MarketingShell>
  );
}
