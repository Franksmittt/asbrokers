"use client";

import { StudioHeader } from "@/components/client-studio/StudioHeader";
import { StudioSidebar } from "@/components/client-studio/StudioSidebar";
import { StaffSidebarProvider, useStaffSidebar } from "@/components/staff/StaffSidebarContext";
import { cn } from "@/lib/utils";

function StudioShellInner({ children }: { children: React.ReactNode }) {
  const { collapsed } = useStaffSidebar();

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1D1D1F]">
      <StudioSidebar />
      <div
        className={cn(
          "flex min-h-screen flex-col overflow-x-hidden pt-12 transition-[margin] duration-200 ease-out md:pt-0",
          collapsed ? "md:ml-14" : "md:ml-56"
        )}
      >
        <StudioHeader />
        <main className="flex min-h-0 flex-1 flex-col px-4 py-6 md:px-8 md:py-6">{children}</main>
      </div>
    </div>
  );
}

export function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <StaffSidebarProvider>
      <StudioShellInner>{children}</StudioShellInner>
    </StaffSidebarProvider>
  );
}
