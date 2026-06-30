"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "./icons";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";
import { SITE_COPYRIGHT_YEAR } from "@/lib/site-meta";
import {
  FOOTER_COMPANY,
  FOOTER_HOW_WE_HELP,
  FOOTER_RESOURCES,
  isNavActive,
} from "@/lib/site-navigation";
import { BrandLogo } from "@/components/BrandLogo";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const WHATSAPP = "https://wa.me/27662276044";
const initialNewsletterState: NewsletterActionState = { success: false };

const TRUST_BADGES = ["FSP 17273", "Category 1.8"];

function FooterLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = isNavActive(pathname ?? "", href);

  return (
    <Link
      href={href}
      prefetch={false}
      className={`block text-sm transition-colors duration-300 ease-in-out ${
        active ? "font-medium text-white" : "text-stone-400 hover:text-cinematic-teal"
      }`}
    >
      {label}
    </Link>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterNewsletter() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialNewsletterState);

  return (
    <div className="w-full max-w-xl lg:max-w-none lg:flex-1">
      <form action={formAction} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          disabled={isPending}
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-stone-500 transition-colors duration-300 ease-in-out focus:border-cinematic-teal/50 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/25 disabled:opacity-60"
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-xl bg-samsung-blue px-6 py-3 text-sm font-semibold text-white shadow-md shadow-samsung-blue/20 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue disabled:opacity-60"
        >
          {isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {state.message && (
        <p
          className={`mt-3 text-xs ${state.success ? "text-cinematic-teal" : "text-amber-300/90"}`}
          role="status"
        >
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
        className="relative z-10 bg-gradient-to-b from-[#1a2626] to-[#152020] text-stone-300"
        role="contentinfo"
      >
        {/* Newsletter strip */}
        <div className="border-b border-white/10 bg-white/[0.03]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-10 md:py-12 lg:px-8">
            <div className="max-w-md shrink-0">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[1.65rem]">
                Stay ahead of your financial future.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                Weekly insights on retirement, investments, and estate planning — from our independent
                advisers.
              </p>
            </div>
            <FooterNewsletter />
          </div>
        </div>

        {/* Main mega-footer grid */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Brand */}
            <div className="md:col-span-2 lg:col-span-1">
              <Link href="/" prefetch={false} className="inline-flex items-center gap-3">
                <BrandLogo height={36} className="h-9 w-auto rounded-xl object-contain" />
                <span className="text-lg font-bold tracking-tight text-white">AS Brokers</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
                Protecting Your Legacy. Engineering Your Wealth.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:bg-[#1da851] hover:shadow-lg"
              >
                WhatsApp · +27 66 227 6044
              </a>
              <div className="mt-5 flex flex-wrap gap-2">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-300 ring-1 ring-white/10"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <FooterColumn title="How we help" links={FOOTER_HOW_WE_HELP} />
            <FooterColumn title="Resources" links={FOOTER_RESOURCES} />
            <FooterColumn title="Company & legal" links={FOOTER_COMPANY} />
          </div>
        </div>

        {/* Compliance strip */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs leading-relaxed text-stone-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>© {SITE_COPYRIGHT_YEAR} AS Brokers CC. All rights reserved.</p>
            <p className="max-w-2xl text-stone-500 lg:text-right">
              Authorised Financial Services Provider · FSP 17273 · FAIS & POPIA Compliant · FSCA
              Regulated
            </p>
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
            className={`fixed z-[55] flex h-11 w-11 items-center justify-center rounded-full bg-samsung-blue text-white shadow-lg shadow-samsung-blue/30 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cta-glow-blue ${scrollDockClass}`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
