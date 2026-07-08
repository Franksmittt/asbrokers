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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200/80 bg-white/95 py-4 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href="/" prefetch={false} className="flex min-w-0 items-center gap-2.5 sm:gap-3 shrink-0">
          <BrandLogo height={36} priority className="h-9 w-auto shrink-0 rounded-2xl object-contain" />
          <div className="min-w-0">
            <span className="text-base font-bold tracking-tight block leading-none text-shark sm:text-lg">
              AS Brokers
            </span>
            <span className="hidden sm:block text-[10px] font-semibold uppercase mt-0.5 text-stone-700 tabular-nums tracking-wider">
              FSP 17273
            </span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link href="/calculators" prefetch={false} className="px-3 py-2 rounded-2xl text-[#2B2B2E] hover:text-shark">
            Calculators
          </Link>
          {PRIMARY_NAV.filter((item) => item.href !== "/calculators").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="px-3 py-2 rounded-2xl text-[#2B2B2E] hover:text-shark whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/contact"
            prefetch={false}
            className="hidden sm:flex items-center px-4 py-2 rounded-[2rem] text-sm font-semibold bg-samsung-blue text-white shadow-md shadow-samsung-blue/20 hover:bg-[#004a9e]"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-shark hover:text-[#0057B8] transition-colors"
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
              <Link
                href="/calculators"
                prefetch={false}
                onClick={closeMobile}
                className="py-3 px-3 text-[#2B2B2E] font-medium hover:bg-white hover:text-shark rounded-2xl"
              >
                Calculators
              </Link>
              {PRIMARY_NAV.filter((item) => item.href !== "/calculators").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={closeMobile}
                  className="py-3 px-3 text-[#2B2B2E] font-medium hover:bg-white hover:text-shark rounded-2xl"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-stone-300/80 mt-3 pt-3">
                <Link
                  href="/contact"
                  prefetch={false}
                  onClick={closeMobile}
                  className="w-full py-3.5 text-center text-white font-semibold bg-samsung-blue rounded-[2rem] block shadow-md shadow-samsung-blue/20"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
