"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Menu, X } from "./icons";
import { BrandLogo } from "@/components/BrandLogo";
import { isNavActive, PRIMARY_NAV } from "@/lib/site-navigation";

const dashboardPaths = ["/crm", "/login"];

const linkClass =
  "text-stone-800 hover:text-shark transition-colors duration-300 ease-apple whitespace-nowrap";

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

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const navLinks = PRIMARY_NAV.filter((item) => item.href !== "/contact");

  if (isDashboard) {
    return (
      <nav className="fixed top-0 w-full z-50 border-b bg-vault-card/80 backdrop-blur border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" prefetch={false} className="flex items-center gap-3">
            <BrandLogo height={36} priority className="h-9 w-auto rounded-2xl object-contain" />
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
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-apple ${
        scrolled
          ? "border-stone-300/90 bg-white py-3 shadow-lg shadow-stone-900/8 backdrop-blur-xl"
          : "border-stone-200/70 bg-white/95 py-4 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href="/" prefetch={false} className="flex min-w-0 items-center gap-2.5 sm:gap-3 shrink-0">
          <BrandLogo height={36} priority className="h-9 w-auto shrink-0 rounded-2xl object-contain" />
          <div className="min-w-0">
            <span className="text-base font-bold tracking-tight block leading-none text-shark sm:text-lg">
              AS Brokers
            </span>
            <span className="hidden sm:block text-[10px] font-semibold uppercase mt-0.5 text-stone-800 tabular-nums tracking-wider">
              FSP 17273
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`px-3 py-2 rounded-2xl transition-colors duration-300 ${
                isNavActive(pathname ?? "", item.href) ? "text-shark font-semibold" : linkClass
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/login"
            aria-label="Client portal login"
            className="hidden md:flex items-center gap-2 border-0 px-4 py-2 rounded-[2rem] text-sm font-semibold text-stone-800 hover:bg-stone-100 hover:text-shark transition-all"
          >
            <User className="w-4 h-4" />
            <span className="hidden xl:inline">Client Portal</span>
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className="hidden sm:flex items-center px-4 py-2 rounded-[2rem] text-sm font-semibold bg-samsung-blue text-white shadow-md shadow-samsung-blue/20 hover:bg-[#004a9e] transition-all"
          >
            Contact us
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-stone-800 hover:text-shark transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[var(--nav-height,4.5rem)] z-40 bg-shark/50 lg:hidden"
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div
            id="mobile-nav-panel"
            className="lg:hidden absolute top-full left-0 right-0 z-50 border-b border-stone-200 bg-[#F7F6F3] shadow-2xl ring-1 ring-stone-200/90 max-h-[85vh] overflow-y-auto"
          >
            <div className="py-3 px-4 flex flex-col">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={closeMobile}
                  className={`py-3 px-3 font-medium rounded-2xl transition-colors ${
                    isNavActive(pathname ?? "", item.href)
                      ? "bg-white text-shark font-semibold shadow-sm ring-1 ring-stone-200/80"
                      : "text-[#2B2B2E] hover:bg-white hover:text-shark"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-stone-300/80 mt-3 pt-3 flex flex-col gap-2">
                <Link
                  href="/contact"
                  prefetch={false}
                  onClick={closeMobile}
                  className="w-full py-3.5 text-center font-semibold rounded-[2rem] bg-samsung-blue text-white shadow-md shadow-samsung-blue/20"
                >
                  Contact us
                </Link>
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="w-full py-3 text-center text-sm font-medium text-[#2B2B2E] hover:text-shark"
                >
                  Client Portal
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
