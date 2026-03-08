import { redirect } from "next/navigation";
import { getMockSession, canAccessPortal } from "@/lib/mock-auth";
import { PortalNav } from "@/components/portal/PortalNav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getMockSession();
  if (!session) redirect("/login?next=/portal");
  if (!canAccessPortal(session.role)) redirect("/crm");

  return (
    <div className="min-h-screen bg-vault-dark flex flex-col">
      <PortalNav name={session.name} />
      <div className="flex-1 pt-14 sm:pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">{children}</div>
      </div>
    </div>
  );
}
