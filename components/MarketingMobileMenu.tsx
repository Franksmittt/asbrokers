"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "@/components/icons";
import { PRIMARY_NAV } from "@/lib/site-navigation";

const PANEL_ID = "mobile-nav-panel";

/**
 * Keyboard-accessible mobile nav: focusable button, Enter/Space toggle, Escape closes.
 * Kept as a small client island so marketing SSR stays light.
 */
export function MarketingMobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        className="flex cursor-pointer items-center justify-center p-2 text-shark transition-colors hover:text-[#0057B8]"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
      </button>

      {open ? (
        <div
          id={PANEL_ID}
          className="fixed inset-x-0 top-[4.75rem] z-50 max-h-[85vh] overflow-y-auto border-b border-stone-200 bg-[#F7F6F3] shadow-2xl ring-1 ring-stone-200/90"
        >
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {PRIMARY_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-3 font-medium text-[#2B2B2E] hover:bg-white hover:text-shark"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 border-t border-stone-300/80 pt-3">
              <a
                href="/contact?source=nav_cta"
                className="block w-full rounded-[2rem] bg-samsung-blue py-3.5 text-center font-semibold text-white shadow-md shadow-samsung-blue/20"
                onClick={() => setOpen(false)}
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
