import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

export type LegalDocumentLayoutProps = {
  kicker: string;
  title: string;
  description?: string;
  lastUpdated?: string;
  pillTags?: string[];
  children: ReactNode;
  footerLinks?: Array<{ href: string; label: string }>;
};

/** Warm legal/trust reading layout — sidebar metadata cols 1–3, prose cols 4–10, gutter 11–12. */
export function LegalDocumentLayout({
  kicker,
  title,
  description,
  lastUpdated = "July 2026",
  pillTags,
  children,
  footerLinks,
}: LegalDocumentLayoutProps) {
  return (
    <>
      <div className="min-h-screen pb-20 pt-28 md:pb-24 md:pt-32" style={{ backgroundColor: CANVAS }}>
        <div className={GRID}>
          <HubReveal instant className="col-span-12 lg:col-span-3">
            <aside className="lg:sticky lg:top-28">
              <p
                className="font-semibold uppercase tracking-[0.2em]"
                style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
              >
                {kicker}
              </p>
              <h1
                className="mt-4 font-bold tracking-tight"
                style={{
                  fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)",
                  lineHeight: 1.15,
                  color: INK,
                }}
              >
                {title}
              </h1>
              {description ? (
                <p
                  className="mt-4 leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
                >
                  {description}
                </p>
              ) : null}
              <p className="mt-6 text-xs font-medium uppercase tracking-wider text-stone-600">
                Last updated
              </p>
              <p className="mt-1 text-sm font-semibold text-stone-700">{lastUpdated}</p>
              {pillTags && pillTags.length > 0 ? (
                <div className="mt-6 flex flex-col gap-2">
                  {pillTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 shadow-sm ring-1 ring-stone-200/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </aside>
          </HubReveal>

          <HubReveal instant className="col-span-12 lg:col-span-7 lg:col-start-4">
            <article className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8 md:p-10">
              <LegalProse>{children}</LegalProse>
              {footerLinks && footerLinks.length > 0 ? (
                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-200/80 pt-8">
                  {footerLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      className="text-sm font-semibold text-samsung-blue hover:text-[#006B6B]"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              ) : null}
            </article>
          </HubReveal>
        </div>
      </div>
      <Footer />
    </>
  );
}

/** High-contrast prose for legal documents — optimised line length inside cols 4–10. */
export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        "max-w-none text-[#2B2B2E]",
        "[&_h2]:mt-8 [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[#006B6B] [&_h2]:first:mt-0",
        "[&_h2]:[font-size:clamp(1.125rem,1.05rem+0.4vw,1.375rem)]",
        "[&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-[#1D1D1F]",
        "[&_h3]:[font-size:clamp(1rem,0.95rem+0.2vw,1.125rem)]",
        "[&_p]:leading-[1.7] [&_p]:[font-size:clamp(1rem,0.95rem+0.15vw,1.0625rem)]",
        "[&_p+p]:mt-4",
        "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_ul]:[font-size:clamp(1rem,0.95rem+0.15vw,1.0625rem)]",
        "[&_li]:leading-relaxed",
        "[&_strong]:font-semibold [&_strong]:text-[#1D1D1F]",
        "[&_a]:font-medium [&_a]:text-samsung-blue [&_a]:underline-offset-2 hover:[&_a]:text-[#006B6B]",
        "[&_section+section]:mt-10 [&_section+section]:border-t [&_section+section]:border-stone-200/80 [&_section+section]:pt-10",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
