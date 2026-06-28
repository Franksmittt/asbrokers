"use client";

import { CrmHeader } from "@/components/crm/CrmHeader";
import { CrmSidebar } from "@/components/crm/CrmSidebar";

type CrmShellProps = {
  staffName: string;
  role: "admin" | "staff";
  showFunnelAdmin?: boolean;
  children: React.ReactNode;
};

export function CrmShell({ staffName, role, showFunnelAdmin, children }: CrmShellProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <CrmSidebar name={staffName} role={role} showFunnelAdmin={showFunnelAdmin} />
      <div className="flex min-h-screen flex-col pt-12 md:ml-[52px] md:pt-0">
        <CrmHeader staffName={staffName} role={role} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
