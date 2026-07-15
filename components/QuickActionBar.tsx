"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { Calendar } from "./icons";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { useHideOverFooter } from "@/lib/use-hide-over-footer";

const WHATSAPP_LINK = "https://wa.me/27662276044";

/** Mobile bottom bar — hides when the footer enters the viewport. */
export function QuickActionBar() {
  const hideOverFooter = useHideOverFooter();

  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 z-40 flex w-full gap-3 border-t border-stone-200/80 bg-warm-canvas p-4 pb-safe md:hidden",
        "transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
        hideOverFooter
          ? "pointer-events-none invisible translate-y-3 opacity-0"
          : "visible opacity-100"
      )}
      data-visual-ignore
      aria-hidden={hideOverFooter}
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={hideOverFooter ? -1 : 0}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp-accessible py-3.5 font-semibold text-white shadow-lg shadow-green-900/20 transition-transform active:scale-95"
      >
        <WhatsAppLogo className="h-6 w-6" /> WhatsApp
      </a>
      <Link
        href="/contact"
        prefetch={false}
        tabIndex={hideOverFooter ? -1 : 0}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-semibold text-black shadow-lg transition-transform active:scale-95"
      >
        <Calendar className="h-5 w-5" /> Consult
      </Link>
    </div>
  );
}
