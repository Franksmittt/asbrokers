"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LinkedIn, ArrowUp } from "./icons";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const blueprintLinks = [
  { label: "Retirement Survival Blueprint", href: "/retirement-survival-blueprint" },
  { label: "Legacy Blueprint", href: "/legacy-blueprint" },
  { label: "Business Survival Blueprint", href: "/business-survival-blueprint" },
];

const primaryLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Calculators", href: "/calculators" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const complianceLinks = [
  { label: "Regulatory Compliance", href: "/regulatory-compliance" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Complaints Procedure", href: "/complaints" },
  { label: "Conflict of Interest", href: "/conflict-of-interest" },
];

const partners = [
  { name: "Santam", abbr: "Santam" },
  { name: "Old Mutual", abbr: "Old Mutual" },
  { name: "Bryte", abbr: "Bryte" },
  { name: "Everest Wealth", abbr: "Everest" },
];

const initialNewsletterState: NewsletterActionState = { success: false };

function FooterLink({ href, children, muted = false }: { href: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`text-sm transition-colors hover:text-cinematic-teal hover:underline ${
        muted ? "text-zinc-500" : "text-zinc-300"
      }`}
    >
      {children}
    </Link>
  );
}

/** Footer newsletter form: Zod-validated, Server Action, HubSpot +10 score. */
function FooterNewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialNewsletterState);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (state.success && state.message) {
      setToast(true);
      const t = setTimeout(() => setToast(false), 4000);
      return () => clearTimeout(t);
    }
  }, [state.success, state.message]);

  return (
    <div className="mt-4">
      <form action={formAction} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          disabled={isPending}
          className="flex-1 min-w-0 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-cinematic-teal focus:border-transparent transition-colors disabled:opacity-60"
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2.5 rounded-2xl bg-supernova-gold/90 hover:bg-supernova-gold text-black text-sm font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-cta-glow-gold disabled:opacity-60 shrink-0"
        >
          {isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {state.success && toast && (
        <p className="mt-2 text-sm text-cinematic-teal" role="status">
          {state.message}
        </p>
      )}
      {!state.success && state.message && !toast && (
        <p className="mt-2 text-sm text-amber-400" role="alert">
          {state.message}
        </p>
      )}
    </div>
  );
}

export function Footer() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  /** Stack above mobile quick bar; on home, above FloatingChat FAB (see FloatingChat.tsx). */
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
        className="relative z-10 overflow-hidden border-t border-white/10 bg-[#07080a] px-4 py-6 sm:px-6 md:px-8"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div
          className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-cinematic-teal/15 blur-[70px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/2 translate-y-1/2 rounded-full bg-gold-orange/15 blur-[70px] pointer-events-none"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr_1fr] lg:items-start">
            <div className="space-y-3">
              <Link
                href="/"
                prefetch={false}
                className="inline-flex items-center gap-2 text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-cinematic-teal rounded-lg"
                aria-label="AS Brokers CC – Home"
              >
                <img src="/images/logo.jpg" alt="" className="h-7 w-auto rounded-xl object-contain" />
                <span className="font-bold">AS Brokers</span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Create, protect, and preserve what matters most. FSP 17273 · Category 1.8 · Est. 1998.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:border-cinematic-teal/50 hover:text-cinematic-teal"
                  aria-label="X (Twitter)"
                >
                  <X className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:border-cinematic-teal/50 hover:text-cinematic-teal"
                  aria-label="LinkedIn"
                >
                  <LinkedIn className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                  Start here
                </p>
                <div className="flex flex-col gap-2">
                  {blueprintLinks.map((link) => (
                    <FooterLink key={link.href} href={link.href}>
                      {link.label}
                    </FooterLink>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                  Site
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {primaryLinks.map((link) => (
                    <FooterLink key={link.href} href={link.href}>
                      {link.label}
                    </FooterLink>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                Get in touch
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/27662276044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-supernova-gold px-4 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-300"
                  aria-label="WhatsApp Contact: +27 66 227 6044"
                >
                  WhatsApp +27 66 227 6044
                </a>
                <FooterNewsletterForm />
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-3 text-xs text-zinc-500 lg:flex-row lg:items-center lg:justify-between">
              <p>© 2026 AS Brokers CC. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {complianceLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href} muted>
                    {link.label}
                  </FooterLink>
                ))}
                <FooterLink href="/manage-cookies" muted>
                  Manage cookies
                </FooterLink>
              </div>
              <div className="flex flex-wrap gap-2">
                {partners.map((p) => (
                  <span key={p.name} title={p.name}>
                    {p.abbr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll-to-top: floating teal orb, bottom-right */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed z-[55] w-12 h-12 rounded-2xl bg-cinematic-teal/90 hover:bg-cinematic-teal text-white flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(0,128,128,0.5)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cinematic-teal focus:ring-offset-2 focus:ring-offset-void ${scrollDockClass}`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
