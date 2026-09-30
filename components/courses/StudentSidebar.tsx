"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { studentLogoutAction } from "@/app/(content)/learn/dashboard/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/learn/dashboard", label: "Dashboard", exact: true },
  { href: "/learn/dashboard/courses", label: "My Journey", exact: false },
  { href: "/learn/dashboard/profile", label: "Achievements", exact: true },
  { href: "/learn", label: "Catalogue", exact: true },
] as const;

export function StudentSidebar({ studentName }: { studentName: string }) {
  const pathname = usePathname() ?? "";

  return (
    <>
      <aside
        className={cn(
          "group/sidebar fixed left-0 top-0 z-40 hidden h-screen w-[52px] flex-col border-r border-stone-200 bg-white",
          "transition-[width] duration-200 ease-out hover:w-56 md:flex"
        )}
      >
        <div className="flex h-12 items-center border-b border-stone-200 px-2.5">
          <Link href="/learn/dashboard" className="flex min-w-0 items-center gap-2.5 overflow-hidden">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0057B8]/10 text-xs font-bold text-[#0057B8]">
              CT
            </span>
            <span className="truncate text-sm font-semibold text-shark opacity-0 transition-opacity group-hover/sidebar:opacity-100">
              Clarity Track
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-0.5 p-2" aria-label="Student portal">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-9 items-center rounded-md px-2 text-[13px] font-medium transition-colors",
                  active ? "bg-stone-100 text-shark" : "text-stone-500 hover:bg-stone-50 hover:text-shark"
                )}
              >
                <span className="w-[18px] shrink-0 text-center text-[10px] font-bold uppercase text-[#0057B8]">
                  {item.label.slice(0, 1)}
                </span>
                <span className="ml-3 truncate opacity-0 transition-opacity group-hover/sidebar:opacity-100">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-stone-200 p-2">
          <p className="truncate px-2 py-1 text-[11px] text-stone-400 opacity-0 transition-opacity group-hover/sidebar:opacity-100">
            {studentName}
          </p>
          <form action={studentLogoutAction}>
            <button
              type="submit"
              className="flex h-9 w-full items-center rounded-md px-2 text-[13px] text-stone-500 hover:bg-stone-50 hover:text-shark"
            >
              <span className="w-[18px] text-center text-[10px] font-bold">O</span>
              <span className="ml-3 truncate opacity-0 transition-opacity group-hover/sidebar:opacity-100">
                Sign out
              </span>
            </button>
          </form>
        </div>
      </aside>

      <div className="fixed inset-x-0 top-0 z-40 flex h-12 items-center justify-between border-b border-stone-200 bg-white px-3 md:hidden">
        <Link href="/learn/dashboard" className="text-sm font-semibold text-shark">
          Clarity Track
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-2 py-1 text-[11px] text-stone-500 hover:text-shark"
            >
              {item.label}
            </Link>
          ))}
          <form action={studentLogoutAction}>
            <button type="submit" className="shrink-0 rounded-md px-2 py-1 text-[11px] text-stone-500">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
