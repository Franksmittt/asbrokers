import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MarketingMobileMenu } from "@/components/MarketingMobileMenu";
import { PRIMARY_NAV } from "@/lib/site-navigation";

/** Server-rendered marketing nav — mobile menu is zero-JS details/summary. */
export function MarketingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-x-clip border-b border-stone-200/80 bg-white py-4">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" prefetch={false} className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <BrandLogo height={36} className="h-9 w-auto shrink-0 rounded-2xl object-contain" />
          <div className="min-w-0">
            <span className="block truncate text-base font-bold leading-none tracking-tight text-shark sm:text-lg">
              AS Brokers
            </span>
            <span className="hidden sm:block text-[10px] font-semibold uppercase mt-0.5 text-stone-700 tabular-nums tracking-wider">
              FSP 17273
            </span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {PRIMARY_NAV.map((item) => (
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
            href="/contact?source=nav_cta"
            prefetch={false}
            className="hidden sm:flex items-center px-4 py-2 rounded-[2rem] text-sm font-semibold bg-samsung-blue text-white shadow-md shadow-samsung-blue/20 hover:bg-[#004a9e]"
          >
            Contact us
          </Link>
          <MarketingMobileMenu />
        </div>
      </div>
    </nav>
  );
}
