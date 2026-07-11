"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Presentation,
  Scroll,
  Settings,
  Users,
} from "@/components/icons";
import { logout } from "@/app/login/logout";
import { cn } from "@/lib/utils";

function KanbanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="10" y="4" width="5" height="10" rx="1.5" />
      <rect x="17" y="4" width="4" height="14" rx="1.5" />
    </svg>
  );
}

const CRM_NAV = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/crm/kanban", label: "Kanban", icon: KanbanIcon, exact: false },
  { href: "/crm/leads", label: "Leads", icon: Users, exact: false },
  { href: "/crm/clients", label: "Clients", icon: Users, exact: false },
  { href: "/crm/whatsapp", label: "WhatsApp", icon: MessageCircle, exact: false },
  { href: "/crm/tasks", label: "Tasks", icon: CheckSquare, exact: false },
  { href: "/crm/notes", label: "Notes", icon: Scroll, exact: false },
] as const;

const CRM_FUNNEL_NAV = [
  { href: "/crm/business-risk-reviews", label: "Risk reviews", icon: FileText },
  { href: "/crm/legacy-checklist-leads", label: "Legacy leads", icon: FileText },
  { href: "/crm/healthy-retirement-assessments", label: "Retirement health", icon: FileText },
  { href: "/crm/calculators", label: "Calculators", icon: Presentation },
] as const;

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  accent,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      title={label}
      className={cn(
        "group/item relative flex h-9 items-center rounded-md px-2 text-[13px] font-medium transition-colors",
        active
          ? "bg-[#1f1f1f] text-white"
          : "text-zinc-400 hover:bg-[#161616] hover:text-zinc-200"
      )}
    >
      <Icon
        className={cn(
          "h-[18px] w-[18px] shrink-0",
          accent && !active && "text-[#3ecf8e]",
          active && accent && "text-[#3ecf8e]"
        )}
        aria-hidden
      />
      <span className="ml-3 truncate opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
        {label}
      </span>
    </Link>
  );
}

export function CrmSidebar({
  name,
  role,
  showFunnelAdmin = false,
}: {
  name: string;
  role: "admin" | "staff";
  showFunnelAdmin?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const isAdmin = role === "admin";
  const showFunnels = showFunnelAdmin || isAdmin;

  return (
    <>
      {/* Desktop, icon rail, expands on hover */}
      <aside
        className={cn(
          "group/sidebar fixed left-0 top-0 z-50 hidden h-screen w-[52px] flex-col",
          "border-r border-[#2a2a2a] bg-[#0a0a0a]",
          "transition-[width] duration-200 ease-out hover:w-56",
          "md:flex"
        )}
      >
        <div className="flex h-12 shrink-0 items-center border-b border-[#2a2a2a] px-2.5">
          <Link href="/crm" className="flex min-w-0 items-center gap-2.5 overflow-hidden">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#3ecf8e]/15 text-[#3ecf8e]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </span>
            <span className="truncate text-sm font-semibold text-white opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
              AS Brokers
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden p-2" aria-label="CRM">
          {CRM_NAV.map(({ href, label, icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <NavItem
                key={href}
                href={href}
                label={label}
                icon={icon}
                active={active}
                accent={href === "/crm/whatsapp"}
              />
            );
          })}
          {showFunnels ? (
            <>
              <div className="my-2 border-t border-[#2a2a2a] pt-2">
                <p className="mb-1 truncate px-2 text-[10px] font-medium uppercase tracking-wider text-zinc-600 opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
                  Funnel exports
                </p>
              </div>
              {CRM_FUNNEL_NAV.map(({ href, label, icon }) => (
                <NavItem
                  key={href}
                  href={href}
                  label={label}
                  icon={icon}
                  active={pathname === href || pathname.startsWith(`${href}/`)}
                />
              ))}
            </>
          ) : null}
        </nav>

        <div className="space-y-1 border-t border-[#2a2a2a] p-2">
          {isAdmin ? (
            <>
              <NavItem
                href="/crm/executive"
                label="Command centre"
                icon={LayoutDashboard}
                active={pathname.startsWith("/crm/executive")}
              />
              <NavItem
                href="/crm/settings"
                label="Settings"
                icon={Settings}
                active={pathname.startsWith("/crm/settings")}
              />
            </>
          ) : null}
          <p className="truncate px-2 py-1 text-[11px] text-zinc-500 opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
            {name}
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="flex h-9 w-full items-center rounded-md px-2 text-[13px] text-zinc-400 transition-colors hover:bg-[#161616] hover:text-zinc-200"
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
              <span className="ml-3 truncate opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
                Log out
              </span>
            </button>
          </form>
          <Link
            href="/"
            prefetch={false}
            className="flex h-8 items-center rounded-md px-2 text-[11px] text-zinc-600 transition-colors hover:text-zinc-400"
          >
            <span className="ml-7 truncate opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
              Back to site
            </span>
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a] px-4 md:hidden">
        <Link href="/crm" className="text-sm font-semibold text-white">
          AS Brokers CRM
        </Link>
        <div className="flex max-w-[65vw] gap-1 overflow-x-auto">
          {CRM_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 rounded-md px-2 py-1 text-[11px] text-zinc-400 hover:text-white"
            >
              {label === "WhatsApp" ? "WA" : label.split(" ")[0]}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              href="/crm/settings"
              className="shrink-0 rounded-md px-2 py-1 text-[11px] text-zinc-400 hover:text-white"
            >
              Settings
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}
