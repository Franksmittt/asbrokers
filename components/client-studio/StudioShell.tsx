"use client";

import { StudioHeader } from "@/components/client-studio/StudioHeader";
import { StudioSidebar } from "@/components/client-studio/StudioSidebar";

export function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <StudioSidebar />
      <div className="flex min-h-screen flex-col overflow-x-hidden pt-12 md:ml-[52px] md:pt-0">
        <StudioHeader />
        <main className="flex min-h-0 flex-1 flex-col px-4 py-6 md:px-8 md:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
