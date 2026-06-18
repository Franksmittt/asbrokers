"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Menu, X } from "./icons";
import { PlanningToolsMenu, PlanningToolsMobileSection } from "./PlanningToolsMenu";
import { isNavActive, PRIMARY_NAV } from "@/lib/site-navigation";

const dashboardPaths = ["/crm", "/login"];

export function Nav() {
  const pathname = usePathname();
  const isDashboard = dashboardPaths.some((p) => pathname?.startsWith(p));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = `hover:text-white transition-colors duration-300 ease-apple whitespace-nowrap ${
    scrolled ? "text-zinc-200" : "text-zinc-400"
  }`;
  const closeMobile = () => setMobileOpen(false);

  if (isDashboard) {
    return (
      <nav className="fixed top-0 w-full z-50 border-b bg-vault-card/80 backdrop-blur border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" prefetch={false} className="flex items-center gap-3">
            <img src="/images/logo.jpg" alt="" className="h-9 w-auto rounded-2xl object-contain" />
            <span className="text-xl font-bold tracking-tight text-white">AS Brokers</span>
          </Link>
          <div className="flex items-center gap-4">
            {pathname?.startsWith("/login") ? (
              <Link href="/" prefetch={false} className="text-sm text-zinc-400 hover:text-white">
                Back to site
              </Link>
            ) : (
              <>
                <Link href="/" prefetch={false} className="text-sm text-zinc-400 hover:text-white">
                  Back to site
                </Link>
                <Link
                  href="/login"
                  prefetch={false}
                  className="text-sm rim-light px-4 py-2 rounded-2xl text-white hover:bg-white/10"
                >
                  Switch account
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ease-apple ${
        scrolled
          ? "bg-white/5 backdrop-blur-2xl border-white/10 py-3 shadow-rim-glow shadow-black/20"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href="/" prefetch={false} className="flex items-center gap-3 shrink-0">
          <img src="/images/logo.jpg" alt="" className="h-9 w-auto rounded-2xl object-contain" />
          <div className="hidden sm:block">
            <span className="text-lg font-bold tracking-tight block leading-none text-white">AS Brokers</span>
            <span
              className={`trust-hallmark text-[10px] font-semibold uppercase mt-0.5 block transition-colors duration-300 ${
                scrolled ? "text-zinc-300" : "text-zinc-400"
              }`}
            >
              FSP 17273
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
          <PlanningToolsMenu scrolled={scrolled} linkClass={linkClass} />
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`px-3 py-2 rounded-2xl transition-colors duration-300 ${
                isNavActive(pathname ?? "", item.href) ? "text-white" : linkClass
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/login"
            className="hidden md:flex items-center gap-2 rim-light hover:bg-white/10 border-0 text-white px-4 py-2 rounded-[2rem] text-sm font-semibold transition-all"
          >
            <User className="w-4 h-4" />
            <span className="hidden xl:inline">Team office</span>
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className="hidden sm:flex items-center px-4 py-2 rounded-[2rem] text-sm font-semibold rim-light text-white hover:bg-white/10 transition-all"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-shark/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="py-3 px-4 flex flex-col">
            <PlanningToolsMobileSection onNavigate={closeMobile} />
            <div className="border-t border-white/10 my-2" />
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={closeMobile}
                className="py-3 px-2 text-white font-medium hover:bg-white/5 rounded-2xl"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-2">
              <Link
                href="/contact"
                prefetch={false}
                onClick={closeMobile}
                className="w-full py-3.5 text-center text-white font-semibold bg-[#00549F] rounded-[2rem]"
              >
                Contact us
              </Link>
              <Link
                href="/login"
                onClick={closeMobile}
                className="w-full py-3 text-center text-zinc-400 text-sm hover:text-white"
              >
                Team office login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
