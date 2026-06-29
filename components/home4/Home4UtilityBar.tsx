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
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 sm:px-6">
        <div className="flex items-center gap-1 sm:gap-2" role="tablist" aria-label="Who are you planning for?">
          {HOME4_UTILITY_AUDIENCES.map((item) => {
            const active = pathname === item.href || (item.href === "/home4" && pathname === "/home4");
            return (
              <Link
                key={item.label}
                href={item.href}
                prefetch={false}
                role="tab"
                aria-selected={active}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-300 ease-apple sm:px-3 sm:text-sm ${
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
      </div>
    </div>
  );
}
