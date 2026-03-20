"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LinkedIn, ChevronDown, ArrowUp } from "./icons";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Calculators", href: "/calculators" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Regulatory Compliance", href: "/regulatory-compliance" },
  { label: "Team office", href: "/login" },
];

const complianceLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "FAIS Disclosure", href: "/regulatory-compliance#fais" },
  { label: "Code of Conduct", href: "/regulatory-compliance#code" },
];

const partners = [
  { name: "Santam", abbr: "Santam" },
  { name: "Old Mutual", abbr: "Old Mutual" },
  { name: "Bryte", abbr: "Bryte" },
  { name: "Everest Wealth", abbr: "Everest" },
];

const initialNewsletterState: NewsletterActionState = { success: false };

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        prefetch={false}
        className="text-sm text-gray-400 hover:text-cinematic-teal hover:underline transition-all duration-300 py-1.5 block tracking-[0.01em] hover:scale-[1.02] origin-left"
      >
        {children}
      </Link>
    </li>
  );
}

function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState(true);
  useEffect(() => {
    const m = window.matchMedia(query);
    setMatch(m.matches);
    const handler = () => setMatch(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return match;
}

function FooterAccordion({
  title,
  children,
  index,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const showContent = open || isDesktop;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: APPLE_EASE }}
      className="border-b border-white/5 md:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full list-none flex items-center justify-between py-4 cursor-pointer text-left md:pointer-events-none md:cursor-default"
        aria-expanded={showContent}
      >
        <h4 className="text-sm font-bold text-cinematic-teal tracking-tight">{title}</h4>
        <motion.span
          className="md:hidden"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: APPLE_EASE }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {showContent && (
          <motion.div
            initial={false}
            animate={{ height: "auto", opacity: 1 }}
            exit={isDesktop ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: APPLE_EASE }}
            className="overflow-hidden"
          >
            <div className="pb-4 md:pb-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer
        className="relative z-10 bg-shark py-6 md:py-8 px-4 sm:px-6 md:px-8 overflow-hidden rounded-t-[2rem] rim-light border-t border-white/10"
        role="contentinfo"
        aria-label="Site footer"
      >
        {/* Faded teal/orange orbs at bottom edges (static for perf) */}
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-cinematic-teal/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 bg-gold-orange/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 pointer-events-none"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Branding / Tagline */}
            <FooterAccordion title="AS Brokers" index={0}>
              <div className="space-y-2">
                <Link
                  href="/"
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-cinematic-teal rounded-lg"
                  aria-label="AS Brokers CC – Home"
                >
                  <img src="/images/logo.jpg" alt="" className="h-6 w-auto rounded-xl object-contain" />
                  <span className="font-bold">AS Brokers</span>
                </Link>
                <p className="text-gray-400 text-sm tracking-[0.01em]">
                  Protecting Your Legacy. Engineering Your Wealth.
                </p>
                <p className="trust-hallmark text-xs text-gray-500">
                  Est. 1998 – Krugersdorp, Gauteng
                </p>
              </div>
            </FooterAccordion>

            {/* Column 2: Quick Links */}
            <FooterAccordion title="Quick Links" index={1}>
              <ul className="space-y-1 text-gray-400">
                {quickLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </FooterAccordion>

            {/* Column 3: Contact & Social + Newsletter */}
            <FooterAccordion title="Get in Touch" index={2}>
              <div className="space-y-4">
                <a
                  href="https://wa.me/27672429946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-supernova-gold/90 hover:bg-supernova-gold text-black text-sm font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-cta-glow-gold"
                  aria-label="WhatsApp Contact: 067 242 9946"
                >
                  WhatsApp Us: 067 242 9946
                </a>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="text-cinematic-teal hover:underline text-sm block"
                >
                  Submit Inquiry
                </Link>
                <div className="flex gap-3">
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cinematic-teal hover:border-cinematic-teal/50 hover:scale-105 transition-all duration-300"
                    aria-label="X (Twitter)"
                  >
                    <X className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cinematic-teal hover:border-cinematic-teal/50 hover:scale-105 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <LinkedIn className="w-4 h-4" />
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Subscribe to Insights</p>
                  <FooterNewsletterForm />
                </div>
              </div>
            </FooterAccordion>

            {/* Column 4: Regulatory & Compliance */}
            <FooterAccordion title="Regulatory & Compliance" index={3}>
              <div className="space-y-4">
                <p className="trust-hallmark text-sm text-gray-300 mb-2">
                  FSP 17273 – Independent Authorised Financial Services Provider
                </p>
                <p className="trust-hallmark text-xs text-gray-500">
                  Category 1.8 (Securities and Instruments: Shares)
                </p>
                <ul className="space-y-1 text-gray-400">
                  {complianceLinks.map((link) => (
                    <FooterLink key={link.href} href={link.href}>
                      {link.label}
                    </FooterLink>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  {partners.map((p) => (
                    <span
                      key={p.name}
                      className="text-[10px] text-gray-600 hover:text-gray-500 transition-colors opacity-80"
                      title={p.name}
                    >
                      {p.abbr}
                    </span>
                  ))}
                </div>
              </div>
            </FooterAccordion>
          </div>
        </div>

        {/* Horizontal divider */}
        <hr className="my-4 md:my-6 border-white/10 max-w-7xl mx-auto" />

        {/* Bottom strip: darker shark, copyright left, Manage Cookie Preferences right */}
        <div className="bg-void/50 py-4 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-gray-500 order-2 sm:order-1">
              © 2026 AS Brokers CC. All Rights Reserved.
            </p>
            <div className="order-1 sm:order-2" />
            <div className="order-3 flex items-center gap-4">
              <Link
                href="/manage-cookies"
                prefetch={false}
                className="text-xs text-cinematic-teal hover:underline transition-colors"
              >
                Manage Cookie Preferences
              </Link>
              <span className="text-xs text-gray-600">Designed with Integrity</span>
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
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-cinematic-teal/90 hover:bg-cinematic-teal text-white flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(0,128,128,0.5)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cinematic-teal focus:ring-offset-2 focus:ring-offset-void"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
