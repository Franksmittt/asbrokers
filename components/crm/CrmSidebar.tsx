"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  LayoutDashboard,
  LogOut,
  Scroll,
  Users,
} from "@/components/icons";
import { logout } from "@/app/login/logout";
import { cn } from "@/lib/utils";

const CRM_NAV = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/crm/kanban", label: "Kanban", icon: LayoutDashboard, exact: false },
  { href: "/crm/leads", label: "Leads", icon: Users, exact: false },
  { href: "/crm/clients", label: "Clients", icon: Users, exact: false },
  { href: "/crm/tasks", label: "Tasks", icon: CheckSquare, exact: false },
  { href: "/crm/notes", label: "Notes", icon: Scroll, exact: false },
] as const;

function KanbanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="10" y="4" width="5" height="10" rx="1.5" />
      <rect x="17" y="4" width="4" height="14" rx="1.5" />
    </svg>
  );
}

const CRM_NAV_WITH_ICONS = CRM_NAV.map((item, i) =>
  i === 1 ? { ...item, icon: KanbanIcon } : item
);

export function CrmSidebar({ name }: { name: string }) {
  const pathname = usePathname() ?? "";

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-full w-60 flex-col bg-shark md:flex",
          "border-r border-white/10 shadow-[inset_-1px_0_0_rgba(255,255,255,0.3)]"
        )}
      >
        <div className="border-b border-white/10 p-5">
          <Link href="/crm" className="flex items-center gap-2.5">
            <img src="/images/logo.jpg" alt="" className="h-8 w-auto rounded-xl object-contain" />
            <div>
              <span className="block text-sm font-bold text-white">AS Brokers</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">
                Staff CRM
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-3" aria-label="CRM">
          {CRM_NAV_WITH_ICONS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                prefetch={false}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-apple",
                  active
                    ? "bg-white/10 text-white"
                    : "text-gray-100 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-white/10 p-3">
          <p className="px-2 text-xs text-gray-400">{name}</p>
          <form action={logout} className="block">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-gray-100 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              Log out
            </button>
          </form>
          <Link
            href="/"
            prefetch={false}
            className="block rounded-2xl px-3 py-2 text-xs text-gray-400 transition-colors hover:text-white"
          >
            Back to site
          </Link>
        </div>
      </aside>

      <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-white/10 bg-shark px-4 md:hidden">
        <Link href="/crm" className="text-sm font-bold text-white">
          CRM
        </Link>
        <div className="flex gap-1 overflow-x-auto">
          {CRM_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 rounded-full px-2.5 py-1 text-[11px] text-white/60 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
