"use client";

import { CrmHeader } from "@/components/crm/CrmHeader";
import { CrmSidebar } from "@/components/crm/CrmSidebar";
import { StaffSidebarProvider, useStaffSidebar } from "@/components/staff/StaffSidebarContext";
import { cn } from "@/lib/utils";

type CrmShellProps = {
  staffName: string;
  role: "admin" | "staff";
  showFunnelAdmin?: boolean;
  children: React.ReactNode;
};

function CrmShellInner({
  staffName,
  role,
  showFunnelAdmin,
  children,
}: CrmShellProps) {
  const { collapsed } = useStaffSidebar();

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1D1D1F]">
      <CrmSidebar name={staffName} role={role} showFunnelAdmin={showFunnelAdmin} />
      <div
        className={cn(
          "flex min-h-screen flex-col pt-12 transition-[margin] duration-200 ease-out md:pt-0",
          collapsed ? "md:ml-14" : "md:ml-56"
        )}
      >
        <CrmHeader staffName={staffName} role={role} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}

export function CrmShell(props: CrmShellProps) {
  return (
    <StaffSidebarProvider>
      <CrmShellInner {...props} />
    </StaffSidebarProvider>
  );
}
