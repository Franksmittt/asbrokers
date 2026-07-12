"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUp } from "@/components/icons";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";

const initialNewsletterState: NewsletterActionState = { success: false };

export function FooterNewsletter() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialNewsletterState);

  return (
    <div className="w-full max-w-sm lg:max-w-[17.5rem] lg:shrink-0">
      <form action={formAction} className="relative">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          disabled={isPending}
          className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-2 pl-3.5 pr-10 text-sm text-white placeholder:text-stone-400 transition-colors duration-300 ease-in-out focus:border-[#0F766E]/40 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 disabled:opacity-60"
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-samsung-blue text-white transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue disabled:opacity-60"
          aria-label={isPending ? "Subscribing" : "Subscribe to newsletter"}
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>
      {state.message ? (
        <p
          className={`mt-1.5 text-[11px] leading-tight ${state.success ? "text-[#5EEAD4]" : "text-amber-300/90"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

export function FooterScrollTop() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollDockClass =
    pathname === "/"
      ? "right-4 max-md:bottom-40 md:bottom-36 md:right-6"
      : "right-4 max-md:bottom-24 md:bottom-20 md:right-6";

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed z-[55] flex h-10 w-10 items-center justify-center rounded-full bg-samsung-blue text-white shadow-lg shadow-samsung-blue/25 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cta-glow-blue motion-reduce:transition-none ${scrollDockClass} ${
        showScrollTop
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-90 opacity-0"
      }`}
      aria-label="Scroll to top"
      aria-hidden={!showScrollTop}
      tabIndex={showScrollTop ? 0 : -1}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
