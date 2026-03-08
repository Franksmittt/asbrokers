"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, MessageCircle, LogOut } from "@/components/icons";
import { logout } from "@/app/login/logout";

const nav = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/documents", label: "Documents", icon: FileText },
  { href: "/portal/messages", label: "Messages", icon: MessageCircle },
];

export function PortalNav({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-vault-card/95 backdrop-blur border-b border-white/10">
      <div className="h-full max-w-5xl mx-auto px-4 flex items-center justify-between">
        <Link href="/portal" className="flex items-center gap-2">
          <img src="/images/logo.jpg" alt="" className="h-8 w-auto rounded-xl object-contain" />
          <span className="font-bold text-white">Client Portal</span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/portal" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 hidden md:inline">{name}</span>
          <form action={logout}>
            <button
              type="submit"
              className="p-2 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
              title="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </form>
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-white px-2 py-1.5 rounded-lg transition-colors"
          >
            Site
          </Link>
        </div>
      </div>
    </header>
  );
}
