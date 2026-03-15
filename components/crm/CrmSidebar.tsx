"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, LogOut, Briefcase, CheckSquare, Presentation } from "@/components/icons";
import { logout } from "@/app/login/logout";

const navItems = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crm/kanban", label: "Kanban", icon: Briefcase },
  { href: "/crm/leads", label: "Leads", icon: Users },
  { href: "/crm/clients", label: "Clients", icon: Users },
  { href: "/crm/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/crm/presentation", label: "Wealth Presentation", icon: Presentation },
];
const navAdminOnly = [
  { href: "/crm/executive", label: "Executive", icon: LayoutDashboard },
];

export function CrmSidebar({ role, name }: { role: string; name: string }) {
  const pathname = usePathname();
  const isAdmin = role === "admin";
  const nav = [...navItems, ...(isAdmin ? navAdminOnly : [])];

  return (
    <>
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 bg-vault-card border-r border-white/10 z-40">
        <div className="p-4 border-b border-white/10">
          <Link href="/crm" className="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="" className="h-8 w-auto rounded-xl object-contain" />
            <span className="font-bold text-white">AS Brokers CRM</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/crm" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                  active ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <div className="px-3 py-2 text-xs text-zinc-500">
            <span className="capitalize">{role}</span> · {name}
          </div>
          <form action={logout} className="block">
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              Log out
            </button>
          </form>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
          >
            Back to site
          </Link>
        </div>
      </aside>
      {/* Mobile: top bar only; main nav in page or hamburger if needed later */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 z-50 bg-vault-card/95 backdrop-blur border-b border-white/10 flex items-center justify-between px-4">
        <Link href="/crm" className="flex items-center gap-2">
          <img src="/images/logo.jpg" alt="" className="h-8 w-auto rounded-xl object-contain" />
          <span className="font-bold text-white">CRM</span>
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          <Link href="/crm" className="px-2 py-1.5 rounded-xl text-xs text-white bg-white/10 shrink-0">Dashboard</Link>
          <Link href="/crm/kanban" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">Kanban</Link>
          <Link href="/crm/leads" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">Leads</Link>
          <Link href="/crm/clients" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">Clients</Link>
          <Link href="/crm/tasks" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">Tasks</Link>
          <Link href="/crm/presentation" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">Presentation</Link>
          {isAdmin && <Link href="/crm/executive" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">Executive</Link>}
          <Link href="/" className="text-zinc-500 text-xs shrink-0">Site</Link>
        </div>
      </div>
    </>
  );
}
