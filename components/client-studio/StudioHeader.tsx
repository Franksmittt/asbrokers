"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/studio/blog/workspace": "Workspace",
  "/studio/blog/workspace/tutorial": "Tutorial",
};

export function StudioHeader() {
  const pathname = usePathname() ?? "";
  const title = PAGE_TITLES[pathname] ?? "Insights Studio";
  const isWorkspace = pathname === "/studio/blog/workspace";

  return (
    <header className="sticky top-0 z-40 hidden h-12 items-center justify-between gap-4 border-b border-[#2a2a2a] bg-black/80 px-4 backdrop-blur-sm md:flex md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-sm font-medium text-white">{title}</span>
        <span className="rounded border border-[#2a2a2a] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
          studio
        </span>
      </div>
      {!isWorkspace ? (
        <Link
          href="/studio/blog/workspace"
          className="rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-[#3a3a3a] hover:text-white"
        >
          Back to workspace
        </Link>
      ) : (
        <Link
          href="/insights"
          target="_blank"
          rel="noreferrer"
          className="text-[12px] text-zinc-500 transition-colors hover:text-[#3ecf8e]"
        >
          View live insights ↗
        </Link>
      )}
    </header>
  );
}
