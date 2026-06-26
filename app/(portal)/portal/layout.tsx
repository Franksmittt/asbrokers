import { PortalNav } from "@/components/portal/PortalNav";

export const metadata = {
  title: "Client Portal",
  description: "AS Brokers client wealth portal — holdings, documents, and advisor messaging.",
};

export default function PortalShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PortalNav />
      <div className="min-h-screen bg-void pt-24 sm:pt-20">{children}</div>
    </>
  );
}
