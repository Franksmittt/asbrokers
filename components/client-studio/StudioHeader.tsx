"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StudioClearCacheButton } from "@/components/client-studio/StudioClearCacheButton";

function resolveTitle(pathname: string): string {
  if (pathname.startsWith("/studio/newsletter/subscribers")) return "Subscribers";
  if (pathname.startsWith("/studio/newsletter")) return "Newsletter";
  if (pathname.startsWith("/studio/courses/students")) return "Students";
  if (pathname.startsWith("/studio/courses")) return "Courses";
  if (pathname.startsWith("/studio/blog/workspace/tutorial")) return "Tutorial";
  if (pathname.startsWith("/studio/blog/workspace")) return "Insights";
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
    <header className="sticky top-0 z-40 hidden h-14 items-center justify-between gap-4 border-b border-[#E5E5E5] bg-[#F7F6F3]/90 px-4 backdrop-blur-sm md:flex md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-sm font-semibold tracking-tight text-[#1D1D1F]">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <StudioClearCacheButton variant="header" />
        <Link
          href="/crm"
          className="rounded-xl border border-[#E5E5E5] bg-white px-3 py-1.5 text-xs font-medium text-[#52525b] transition-colors hover:text-[#1D1D1F]"
        >
          Home
        </Link>
        {live ? (
          <Link
            href={live.href}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] font-medium text-[#0057B8] transition-colors hover:underline"
          >
            {live.label}
          </Link>
        ) : null}
      </div>
    </header>
  );
}
