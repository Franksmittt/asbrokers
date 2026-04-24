import Link from "next/link";
import { redirect } from "next/navigation";

import { getClientStudioSession } from "@/lib/client-studio/session";

import { LogoutForm } from "../LogoutForm";

export default async function StudioWorkspaceLayout({ children }: { children: React.ReactNode }) {
  if (!(await getClientStudioSession())) {
    redirect("/studio/blog/login?next=/studio/blog/workspace");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#050506]">
      <header className="sticky top-0 z-40 shrink-0 border-b border-white/10 bg-[#050506]/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[100vw] min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider truncate">AS Brokers · FSP 17273</p>
            <p className="text-sm font-semibold text-white truncate">Insights studio</p>
          </div>
          <nav
            className="flex flex-wrap items-center justify-end gap-x-2 gap-y-2 sm:gap-x-3 shrink-0 min-w-0"
            aria-label="Studio navigation"
          >
            <Link
              href="/studio/blog/workspace"
              className="rounded-full px-3 py-1.5 text-xs sm:text-sm text-zinc-400 hover:bg-white/5 hover:text-white whitespace-nowrap"
            >
              Workspace
            </Link>
            <Link
              href="/insights"
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-3 py-1.5 text-xs sm:text-sm text-teal-400 hover:bg-teal-500/10 whitespace-nowrap"
            >
              View site insights ↗
            </Link>
            <LogoutForm />
          </nav>
        </div>
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
