"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOME4_UTILITY_AUDIENCES } from "@/lib/home4-journey";

export function Home4UtilityBar() {
  const pathname = usePathname();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] border-b border-stone-200/80 bg-[#F7F6F3]/95 backdrop-blur-md"
      role="navigation"
      aria-label="Audience"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          {HOME4_UTILITY_AUDIENCES.map((item) => {
            const active = pathname === item.href || (item.href === "/home4" && pathname === "/home4");
            return (
              <Link
                key={item.label}
                href={item.href}
                prefetch={false}
                className={`rounded-full px-2.5 py-1 font-medium transition-colors duration-300 ease-apple sm:px-3 ${
                  active
                    ? "bg-white text-shark shadow-sm ring-1 ring-stone-200/80"
                    : "text-stone-500 hover:bg-white/60 hover:text-shark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            prefetch={false}
            className="hidden font-medium text-stone-500 transition-colors hover:text-samsung-blue sm:inline"
          >
            Client Portal
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className="font-semibold text-samsung-blue transition-colors hover:text-cinematic-teal"
          >
            Find an Adviser
          </Link>
        </div>
      </div>
    </div>
  );
}
