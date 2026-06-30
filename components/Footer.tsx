"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUp } from "./icons";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";
import { SITE_COPYRIGHT_YEAR } from "@/lib/site-meta";
import { isNavActive } from "@/lib/site-navigation";
import { BrandLogo } from "@/components/BrandLogo";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const WHATSAPP = "https://wa.me/27662276044";
const initialNewsletterState: NewsletterActionState = { success: false };

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Calculators", href: "/calculators" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Complaints", href: "/complaints" },
] as const;

function FooterNewsletter() {
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
          className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-2 pl-3.5 pr-10 text-sm text-white placeholder:text-stone-500 transition-colors duration-300 ease-in-out focus:border-cinematic-teal/40 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/20 disabled:opacity-60"
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
          className={`mt-1.5 text-[11px] leading-tight ${state.success ? "text-cinematic-teal" : "text-amber-300/90"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

export function Footer() {
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
    <>
      <footer
        className="relative z-10 bg-gradient-to-b from-[#1e2a2e] to-[#182022] text-stone-300"
        role="contentinfo"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-7">
          <div className="flex flex-col items-center gap-7 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
            {/* Brand + WhatsApp */}
            <div className="flex shrink-0 flex-col items-center gap-3 lg:items-start">
              <Link href="/" prefetch={false} className="inline-flex items-center gap-2.5">
                <BrandLogo height={32} className="h-8 w-auto rounded-lg object-contain" />
                <span className="text-base font-semibold tracking-tight text-white">AS Brokers</span>
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-[#1da851]"
              >
                WhatsApp · +27 66 227 6044
              </a>
            </div>

            {/* Minimal nav */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm lg:flex-1 lg:justify-center"
            >
              {FOOTER_NAV.map((link, index) => {
                const active = isNavActive(pathname ?? "", link.href);
                return (
                  <span key={link.href} className="inline-flex items-center">
                    {index > 0 ? (
                      <span aria-hidden className="mx-2 text-stone-600 select-none">
                        ·
                      </span>
                    ) : null}
                    <Link
                      href={link.href}
                      prefetch={false}
                      className={`transition-colors duration-300 ease-in-out ${
                        active ? "font-medium text-white" : "text-stone-400 hover:text-cinematic-teal"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </span>
                );
              })}
            </nav>

            {/* Inline newsletter */}
            <FooterNewsletter />
          </div>
        </div>

        {/* Compliance strip */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs leading-relaxed text-stone-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-8">
            <p className="text-center lg:text-left">
              Copyright © {SITE_COPYRIGHT_YEAR} AS Brokers CC. All rights reserved.
              <span aria-hidden className="mx-2 hidden text-stone-600 sm:inline">
                |
              </span>
              <span className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:mt-0 sm:inline-flex">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className="transition-colors duration-300 ease-in-out hover:text-stone-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </span>
            </p>
            <p className="text-center text-[11px] leading-snug text-stone-500 lg:max-w-xl lg:text-right">
              Authorised Financial Services Provider | FSP 17273 | FSCA Regulated | FAIS & POPIA
              Compliant.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed z-[55] flex h-10 w-10 items-center justify-center rounded-full bg-samsung-blue text-white shadow-lg shadow-samsung-blue/25 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cta-glow-blue ${scrollDockClass}`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
