"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StudioClearCacheButton } from "@/components/client-studio/StudioClearCacheButton";

function resolveTitle(pathname: string): string {
  if (pathname.startsWith("/studio/newsletter/subscribers")) return "Subscribers";
  if (pathname.startsWith("/studio/newsletter")) return "Newsletter Studio";
  if (pathname.startsWith("/studio/courses/students")) return "Students";
  if (pathname.startsWith("/studio/courses")) return "Course Studio";
  if (pathname.startsWith("/studio/blog/workspace/tutorial")) return "Tutorial";
  if (pathname.startsWith("/studio/blog/workspace")) return "Insights Studio";
  return "Studio";
}

function liveLink(pathname: string): { href: string; label: string } | null {
  if (pathname.startsWith("/studio/newsletter")) {
    return { href: "/newsletter", label: "View live newsletter ↗" };
  }
  if (pathname.startsWith("/studio/courses")) {
    return { href: "/learn", label: "View live courses ↗" };
  }
  if (pathname.startsWith("/studio/blog")) {
    return { href: "/insights", label: "View live insights ↗" };
  }
  return null;
}

export function StudioHeader() {
  const pathname = usePathname() ?? "";
  const title = resolveTitle(pathname);
  const live = liveLink(pathname);

  return (
    <header className="sticky top-0 z-40 hidden h-12 items-center justify-between gap-4 border-b border-[#2a2a2a] bg-black/80 px-4 backdrop-blur-sm md:flex md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-sm font-medium text-white">{title}</span>
        <span className="rounded border border-[#2a2a2a] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
          studio
        </span>
      </div>
      <div className="flex items-center gap-3">
        <StudioClearCacheButton variant="header" />
        <Link
          href="/studio"
          className="rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-[#3a3a3a] hover:text-white"
        >
          All studios
        </Link>
        {live ? (
          <Link
            href={live.href}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] text-zinc-500 transition-colors hover:text-[#3ecf8e]"
          >
            {live.label}
          </Link>
        ) : null}
      </div>
    </header>
  );
}
