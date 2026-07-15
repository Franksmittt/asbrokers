"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { useHideOverFooter } from "@/lib/use-hide-over-footer";

const WHATSAPP_LINK = "https://wa.me/27662276044";

/** Desktop WhatsApp FAB — official mark; gentle Y-flip every 30s for attention. */
export function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();
  const hideOverFooter = useHideOverFooter();
  const [flipTick, setFlipTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setFlipTick((n) => n + 1), 30_000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group fixed bottom-6 right-6 z-[45] hidden h-14 w-14 items-center justify-center rounded-full shadow-2xl md:flex [perspective:240px]",
        "transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
        hideOverFooter
          ? "pointer-events-none invisible translate-y-3 opacity-0"
          : "visible opacity-100 hover:scale-110"
      )}
      data-visual-ignore
      aria-label="Chat on WhatsApp"
      aria-hidden={hideOverFooter}
      tabIndex={hideOverFooter ? -1 : 0}
    >
      <span
        key={flipTick}
        className={
          reduceMotion
            ? "inline-flex"
            : "inline-flex animate-whatsapp-flip [transform-style:preserve-3d]"
        }
      >
        <WhatsAppLogo className="h-14 w-14" />
      </span>
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-xl border border-white/10 bg-[#151518] px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
        Chat with Albert or Johnny
      </span>
    </a>
  );
}
