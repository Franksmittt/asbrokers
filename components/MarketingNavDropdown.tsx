import Link from "next/link";
import { ChevronDown } from "@/components/icons";
import type { NavGroup } from "@/lib/site-navigation";

type Props = {
  group: NavGroup;
};

/**
 * Zero-JS desktop dropdown: opens on hover and keyboard focus-within.
 * Mobile uses the hamburger panel instead (this stays lg+:hidden parent).
 */
export function MarketingNavDropdown({ group }: Props) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-2xl px-3 py-2 text-[#2B2B2E] hover:text-shark whitespace-nowrap"
        aria-haspopup="true"
      >
        {group.label}
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform duration-200 motion-safe:group-hover:rotate-180 motion-safe:group-focus-within:rotate-180"
          aria-hidden
        />
      </button>
      <div
        className="pointer-events-none invisible absolute left-1/2 top-full z-50 pt-2 opacity-0 transition-[opacity,visibility] duration-150 motion-reduce:transition-none group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 -translate-x-1/2"
        role="menu"
        aria-label={group.label}
      >
        <div className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-stone-200/90 bg-white p-2 shadow-xl shadow-stone-900/10 ring-1 ring-stone-100">
          {group.children.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              role="menuitem"
              className="block rounded-xl px-3 py-2.5 text-left hover:bg-[#F7F6F3]"
            >
              <span className="block text-sm font-semibold text-shark">{item.label}</span>
              {item.description ? (
                <span className="mt-0.5 block text-xs leading-snug text-stone-500">
                  {item.description}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
