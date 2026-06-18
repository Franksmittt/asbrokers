"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "./icons";
import {
  isNavActive,
  isPlanningToolsPath,
  PILLAR_FUNNELS,
  PILLAR_HUB,
} from "@/lib/site-navigation";

type Props = {
  scrolled: boolean;
  linkClass: string;
  onNavigate?: () => void;
};

export function PlanningToolsMenu({ scrolled, linkClass, onNavigate }: Props) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = isPlanningToolsPath(pathname);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 px-3 py-2 rounded-2xl transition-colors duration-300 ease-apple whitespace-nowrap ${
          active ? "text-white" : linkClass
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Planning tools
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-shark/95 p-2 shadow-2xl backdrop-blur-xl">
          <Link
            href={PILLAR_HUB.href}
            prefetch={false}
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
            className="block rounded-xl px-3 py-2.5 hover:bg-white/5"
          >
            <p className="text-sm font-semibold text-white">{PILLAR_HUB.label}</p>
            <p className="text-xs text-zinc-500">{PILLAR_HUB.description}</p>
          </Link>
          <div className="my-2 border-t border-white/10" />
          {PILLAR_FUNNELS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={`block rounded-xl px-3 py-2.5 hover:bg-white/5 ${
                isNavActive(pathname, item.href) ? "bg-[#00549F]/15" : ""
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#00549F]">{item.pillar}</p>
              <p className="text-sm font-medium text-white">{item.label}</p>
              {item.description && <p className="text-xs text-zinc-500">{item.description}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function PlanningToolsMobileSection({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname() ?? "";

  return (
    <div className="py-2">
      <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00549F]">Planning tools</p>
      <Link
        href={PILLAR_HUB.href}
        prefetch={false}
        onClick={onNavigate}
        className="block py-2.5 px-2 text-white font-medium hover:bg-white/5 rounded-2xl"
      >
        {PILLAR_HUB.label}
      </Link>
      {PILLAR_FUNNELS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          prefetch={false}
          onClick={onNavigate}
          className={`block py-2.5 px-2 hover:bg-white/5 rounded-2xl ${
            isNavActive(pathname, item.href) ? "bg-white/5" : ""
          }`}
        >
          <span className="text-[10px] font-semibold uppercase text-zinc-500">{item.pillar}</span>
          <span className="block text-sm text-white">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
