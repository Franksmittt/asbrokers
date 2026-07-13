import { Menu, X } from "@/components/icons";
import { PRIMARY_NAV } from "@/lib/site-navigation";

/**
 * Zero-JS mobile nav (details/summary). Uses plain anchors so a tap navigates
 * with a full document load and the panel closes — no React island on the
 * marketing critical path (major mobile TBT win).
 */
export function MarketingMobileMenu() {
  return (
    <details className="group relative lg:hidden">
      <summary
        className="flex cursor-pointer list-none items-center justify-center p-2 text-shark transition-colors hover:text-[#0057B8] [&::-webkit-details-marker]:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6 group-open:hidden" aria-hidden />
        <X className="hidden h-6 w-6 group-open:inline" aria-hidden />
      </summary>

      <div
        id="mobile-nav-panel"
        className="fixed inset-x-0 top-[4.75rem] z-50 max-h-[85vh] overflow-y-auto border-b border-stone-200 bg-[#F7F6F3] shadow-2xl ring-1 ring-stone-200/90"
      >
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-3 py-3 font-medium text-[#2B2B2E] hover:bg-white hover:text-shark"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 border-t border-stone-300/80 pt-3">
            <a
              href="/contact?source=nav_cta"
              className="block w-full rounded-[2rem] bg-samsung-blue py-3.5 text-center font-semibold text-white shadow-md shadow-samsung-blue/20"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </details>
  );
}
