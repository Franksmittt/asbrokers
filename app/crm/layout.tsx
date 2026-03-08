import { redirect } from "next/navigation";
import { getMockSession, canAccessCrm } from "@/lib/mock-auth";
import { CrmSidebar } from "@/components/crm/CrmSidebar";

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const session = await getMockSession();
  if (!session) redirect("/login?next=/crm");
  if (!canAccessCrm(session.role)) redirect("/portal");

  return (
    <div className="min-h-screen bg-vault-dark flex">
      <CrmSidebar role={session.role} name={session.name} />
      <div className="flex-1 flex flex-col min-w-0 pt-16 sm:pt-20 md:ml-56">
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8">{children}</div>
      </div>
    </div>
  );
}
