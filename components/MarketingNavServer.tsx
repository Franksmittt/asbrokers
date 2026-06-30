"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "@/components/icons";
import { BrandLogo } from "@/components/BrandLogo";
import { PRIMARY_NAV } from "@/lib/site-navigation";

/** Lightweight homepage nav, minimal JS, full mobile a11y (Phase 9 + 12). */
export function MarketingNavServer() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-transparent py-5 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href="/" prefetch={false} className="flex items-center gap-3 shrink-0">
          <BrandLogo height={36} priority className="h-9 w-auto rounded-2xl object-contain" />
          <div className="hidden sm:block">
            <span className="text-lg font-bold tracking-tight block leading-none text-white">AS Brokers</span>
            <span className="trust-hallmark text-[10px] font-semibold uppercase mt-0.5 block text-zinc-400">
              FSP 17273
            </span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link href="/calculators" prefetch={false} className="px-3 py-2 rounded-2xl text-zinc-400 hover:text-white">
            Calculators
          </Link>
          {PRIMARY_NAV.filter((item) => item.href !== "/calculators").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="px-3 py-2 rounded-2xl text-zinc-400 hover:text-white whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/contact"
            prefetch={false}
            className="hidden sm:flex items-center px-4 py-2 rounded-[2rem] text-sm font-semibold rim-light text-white hover:bg-white/10"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden absolute top-full left-0 right-0 bg-shark/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto"
        >
          <div className="py-3 px-4 flex flex-col">
            <Link
              href="/calculators"
              prefetch={false}
              onClick={closeMobile}
              className="py-3 px-2 text-white font-medium hover:bg-white/5 rounded-2xl"
            >
              Calculators
            </Link>
            {PRIMARY_NAV.filter((item) => item.href !== "/calculators").map((item) => (
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
            <div className="border-t border-white/10 mt-3 pt-3">
              <Link
                href="/contact"
                prefetch={false}
                onClick={closeMobile}
                className="w-full py-3.5 text-center text-white font-semibold bg-[#00549F] rounded-[2rem] block"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
