"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "./icons";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";
import { SITE_COPYRIGHT_YEAR } from "@/lib/site-meta";
import {
  FOOTER_EXPLORE,
  FOOTER_LEGAL,
  isNavActive,
  PILLAR_FUNNELS,
  PILLAR_HUB,
} from "@/lib/site-navigation";
import { BrandLogo } from "@/components/BrandLogo";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const WHATSAPP = "https://wa.me/27662276044";
const initialNewsletterState: NewsletterActionState = { success: false };

function FooterNewsletter() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialNewsletterState);

  return (
    <div className="w-full max-w-md md:w-auto">
      <form action={formAction} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          placeholder="Weekly insights — your email"
          required
          disabled={isPending}
          className="flex-1 min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-60"
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-[#00549F] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 shrink-0"
        >
          {isPending ? "…" : "Subscribe"}
        </button>
      </form>
      {state.message && (
        <p className={`mt-2 text-xs ${state.success ? "text-teal-400" : "text-amber-400"}`} role="status">
          {state.message}
        </p>
      )}
    </div>
  );
}

export function Footer() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollDockClass =
    pathname === "/"
      ? "right-4 max-md:bottom-48 md:bottom-[10rem] md:right-6"
      : "right-4 max-md:bottom-28 md:bottom-[5.75rem] md:right-6";

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer
        className="relative z-10 border-t border-white/10 bg-[#0a0a0c] px-4 py-8 sm:px-6 md:px-8"
        role="contentinfo"
      >
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Brand + pillars */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="shrink-0">
              <Link href="/" prefetch={false} className="inline-flex items-center gap-2 text-white">
                <BrandLogo height={28} className="h-7 w-auto rounded-lg object-contain" />
                <span className="font-bold">AS Brokers</span>
              </Link>
              <p className="trust-hallmark mt-2 text-xs text-zinc-400">
                FSP 17273 · Create · Protect · Preserve
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-blue-400 hover:underline"
              >
                WhatsApp +27 66 227 6044
              </a>
            </div>

            <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-3xl">
              <Link
                href={PILLAR_HUB.href}
                prefetch={false}
                className={`rounded-xl border p-3 transition hover:border-[#00549F]/40 hover:bg-white/[0.03] ${
                  isNavActive(pathname ?? "", PILLAR_HUB.href)
                    ? "border-[#00549F]/40 bg-[#00549F]/10"
                    : "border-white/10"
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Overview</p>
                <p className="mt-1 text-sm font-medium text-white">{PILLAR_HUB.label}</p>
              </Link>
              {PILLAR_FUNNELS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={`rounded-xl border p-3 transition hover:border-[#00549F]/40 hover:bg-white/[0.03] ${
                    isNavActive(pathname ?? "", item.href)
                      ? "border-[#00549F]/40 bg-[#00549F]/10"
                      : "border-white/10"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{item.pillar}</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-white">{item.label}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Explore + newsletter */}
          <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
              {FOOTER_EXPLORE.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <FooterNewsletter />
          </div>

          {/* Legal strip */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {SITE_COPYRIGHT_YEAR} AS Brokers CC. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {FOOTER_LEGAL.map((link) => (
                <Link key={link.href} href={link.href} prefetch={false} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed z-[55] flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg transition hover:scale-105 ${scrollDockClass}`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
