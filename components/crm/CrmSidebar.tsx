"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Presentation, FileText, Scroll } from "@/components/icons";
import { logout } from "@/app/login/logout";

const navItems = [
  { href: "/crm", label: "Office", icon: LayoutDashboard },
  { href: "/crm/presentation", label: "Wealth Presentation", icon: Presentation },
  { href: "/studio", label: "Blog & content", icon: FileText },
  { href: "/insights", label: "View insights (site)", icon: Scroll },
];

export function CrmSidebar({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 bg-vault-card border-r border-white/10 z-40">
        <div className="p-4 border-b border-white/10">
          <Link href="/crm" className="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="" className="h-8 w-auto rounded-xl object-contain" />
            <span className="font-bold text-white">AS Brokers</span>
          </Link>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Team office</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/crm" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                prefetch={false}
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
          <div className="px-3 py-2 text-xs text-zinc-500">{name}</div>
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
            prefetch={false}
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
          >
            Live website
          </Link>
        </div>
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 z-50 bg-vault-card/95 backdrop-blur border-b border-white/10 flex items-center justify-between px-4">
        <Link href="/crm" className="flex items-center gap-2">
          <img src="/images/logo.jpg" alt="" className="h-8 w-auto rounded-xl object-contain" />
          <span className="font-bold text-white">Office</span>
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          <Link href="/crm" className="px-2 py-1.5 rounded-xl text-xs text-white bg-white/10 shrink-0">
            Home
          </Link>
          <Link href="/crm/presentation" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">
            Presentation
          </Link>
          <Link href="/studio" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">
            Studio
          </Link>
          <Link href="/insights" className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white shrink-0">
            Insights
          </Link>
          <Link href="/" prefetch={false} className="text-zinc-500 text-xs shrink-0">
            Site
          </Link>
        </div>
      </div>
    </>
  );
}
