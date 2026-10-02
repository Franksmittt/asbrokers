"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
} from "@/components/icons";
import { logout } from "@/app/login/logout";
import { useStaffSidebar } from "@/components/staff/StaffSidebarContext";
import { cn } from "@/lib/utils";

function CoursesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
        strokeLinejoin="round"
      />
      <path d="M8 7h8M8 11h5" strokeLinecap="round" />
    </svg>
  );
}

function NewsletterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M4 4h16v16H4z" strokeLinejoin="round" />
      <path d="m4 8 8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M12 20h9" strokeLinecap="round" />
      <path
        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Primary staff destinations — Insights, Courses, Newsletter first; leads second. */
const PRIMARY_NAV = [
  { href: "/crm", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/studio/blog/workspace", label: "Insights", icon: PenIcon, exact: false },
  { href: "/studio/courses", label: "Courses", icon: CoursesIcon, exact: false },
  { href: "/studio/newsletter", label: "Newsletter", icon: NewsletterIcon, exact: false },
] as const;

const LEADS_NAV = [
  { href: "/crm/leads", label: "Leads", icon: Users, exact: false },
  { href: "/crm/clients", label: "Clients", icon: Users, exact: false },
  { href: "/crm/whatsapp", label: "WhatsApp", icon: MessageCircle, exact: false },
] as const;

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      title={label}
      className={cn(
        "flex h-10 items-center rounded-xl text-[13px] font-medium transition-colors",
        collapsed ? "justify-center px-0" : "px-3",
        active
          ? "bg-[#E8F3F3] text-[#006B6B]"
          : "text-[#52525b] hover:bg-[#F0F0EE] hover:text-[#1D1D1F]"
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
      {!collapsed ? <span className="ml-3 truncate">{label}</span> : null}
    </Link>
  );
}

export function CrmSidebar({
  name,
  role,
}: {
  name: string;
  role: "admin" | "staff";
  /** @deprecated Funnel admin nav removed from primary chrome. */
  showFunnelAdmin?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const isAdmin = role === "admin";
  const { collapsed, toggle } = useStaffSidebar();

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 hidden h-screen flex-col border-r border-[#E5E5E5] bg-white transition-[width] duration-200 ease-out md:flex",
          collapsed ? "w-14" : "w-56"
        )}
      >
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b border-[#E5E5E5]",
            collapsed ? "justify-center px-2" : "px-3"
          )}
        >
          <Link href="/crm" className="flex min-w-0 items-center gap-2.5 overflow-hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F3F3] text-[#006B6B]">
              <FileText className="h-4 w-4" aria-hidden />
            </span>
            {!collapsed ? (
              <span className="truncate text-sm font-semibold tracking-tight text-[#1D1D1F]">
                AS Brokers
              </span>
            ) : null}
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden p-2" aria-label="Staff">
          {!collapsed ? (
            <p className="mb-1 px-3 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#71717a]">
              Create
            </p>
          ) : null}
          {PRIMARY_NAV.map(({ href, label, icon, exact }) => {
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
                collapsed={collapsed}
              />
            );
          })}

          <div className={cn("my-2 border-t border-[#E5E5E5]", collapsed ? "pt-2" : "pt-3")}>
            {!collapsed ? (
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#71717a]">
                Enquiries
              </p>
            ) : null}
            {LEADS_NAV.map(({ href, label, icon, exact }) => {
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
                  collapsed={collapsed}
                />
              );
            })}
          </div>
        </nav>

        <div className="space-y-1 border-t border-[#E5E5E5] p-2">
          {isAdmin ? (
            <NavItem
              href="/crm/settings"
              label="Settings"
              icon={Settings}
              active={pathname.startsWith("/crm/settings")}
              collapsed={collapsed}
            />
          ) : null}
          {!collapsed ? (
            <p className="truncate px-3 py-1 text-[11px] text-[#71717a]">{name}</p>
          ) : null}
          <form action={logout}>
            <button
              type="submit"
              title="Log out"
              className={cn(
                "flex h-10 w-full items-center rounded-xl text-[13px] text-[#52525b] transition-colors hover:bg-[#F0F0EE] hover:text-[#1D1D1F]",
                collapsed ? "justify-center" : "px-3"
              )}
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
              {!collapsed ? <span className="ml-3 truncate">Log out</span> : null}
            </button>
          </form>
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "flex h-10 w-full items-center rounded-xl text-[13px] text-[#71717a] transition-colors hover:bg-[#F0F0EE] hover:text-[#1D1D1F]",
              collapsed ? "justify-center" : "px-3"
            )}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <>
                <PanelLeftClose className="h-[18px] w-[18px] shrink-0" aria-hidden />
                <span className="ml-3 truncate">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile top bar — focused destinations only */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center justify-between gap-2 border-b border-[#E5E5E5] bg-white px-3 md:hidden">
        <Link href="/crm" className="shrink-0 text-sm font-semibold text-[#1D1D1F]">
          AS Brokers
        </Link>
        <div className="flex max-w-[70vw] gap-1 overflow-x-auto">
          {[...PRIMARY_NAV, ...LEADS_NAV].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-medium text-[#52525b] hover:bg-[#F0F0EE] hover:text-[#1D1D1F]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
