"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, LayoutDashboard, MessageCircle } from "@/components/icons";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/portal/documents", label: "Documents", icon: FileText, exact: false },
  { href: "/portal/messages", label: "Messages", icon: MessageCircle, exact: false },
] as const;

export function PortalNav() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-apple",
        scrolled ? "rim-light border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/portal"
            scroll={false}
            className="text-sm font-semibold tracking-tight text-white"
          >
            AS Brokers
            <span className="ml-2 hidden text-[10px] font-medium uppercase tracking-widest text-white/50 sm:inline">
              Client Portal
            </span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Portal">
            {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  scroll={false}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ease-apple",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <Link
          href="/"
          scroll={false}
          className="text-xs font-medium text-white/50 transition-colors hover:text-white"
        >
          Back to site
        </Link>
      </div>
      <nav
        className="flex items-center justify-center gap-1 border-t border-white/5 px-4 py-2 sm:hidden"
        aria-label="Portal mobile"
      >
        {NAV_ITEMS.map(({ href, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              scroll={false}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                active ? "bg-white/10 text-white" : "text-white/60"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
