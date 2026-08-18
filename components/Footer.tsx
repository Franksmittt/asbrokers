import Link from "next/link";
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL_HREF,
} from "@/lib/office-phone";
import { SITE_COPYRIGHT_YEAR } from "@/lib/site-meta";
import { WHATSAPP_BASE_URL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { BrandLogo } from "@/components/BrandLogo";
import { DeferredFooterNewsletter } from "@/components/DeferredFooterExtras";

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "Business Insurance", href: "/solutions/business-insurance" },
  { label: "Providers", href: "/providers" },
  { label: "Insurance", href: "/insurance" },
  { label: "Retirement", href: "/retirement-planning" },
  { label: "Investments", href: "/investments" },
  { label: "Estate", href: "/estate-planning" },
  { label: "Calculators", href: "/calculators" },
  { label: "Insights", href: "/insights" },
  { label: "Courses", href: "/learn" },
  { label: "Contact", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Complaints", href: "/complaints" },
  { label: "Conflict of interest", href: "/conflict-of-interest" },
  { label: "Quiz", href: "/quiz" },
  { label: "Legacy conversations", href: "/legacy-conversations" },
  { label: "Discovery Health", href: "/solutions/discovery-health" },
  { label: "Studio login", href: "/studio/blog/login" },
  { label: "CRM login", href: "/login" },
] as const;

/** Server footer shell; newsletter hydrates after idle/pointer. */
export function Footer() {
  return (
    <>
      <footer
        className="relative z-10 bg-gradient-to-b from-[#1e2a2e] to-[#182022] text-stone-300"
        role="contentinfo"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-7">
          <div className="flex flex-col items-center gap-7 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
            <div className="flex shrink-0 flex-col items-center gap-3 lg:items-start">
              <Link href="/" prefetch={false} className="inline-flex items-center gap-2.5">
                <BrandLogo height={32} className="h-8 w-auto rounded-lg object-contain" />
                <span className="text-base font-semibold tracking-tight text-white">AS Brokers</span>
              </Link>
              <div className="flex flex-col items-center gap-2 lg:items-start">
                <a
                  href={OFFICE_PHONE_TEL_HREF}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 transition-colors duration-300 ease-in-out hover:bg-white/15"
                >
                  Office · {OFFICE_PHONE_DISPLAY}
                </a>
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-whatsapp-accessible px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-[#0d655e]"
                >
                  WhatsApp · {WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm lg:flex-1 lg:justify-center"
            >
              {FOOTER_NAV.map((link, index) => (
                <span key={link.href} className="inline-flex items-center">
                  {index > 0 ? (
                    <span aria-hidden className="mx-2 select-none text-stone-600">
                      ·
                    </span>
                  ) : null}
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-stone-300 transition-colors duration-300 ease-in-out hover:text-[#5EEAD4]"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>

            <DeferredFooterNewsletter />
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs leading-relaxed text-stone-300 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-8">
            <div className="text-center lg:text-left">
              <nav
                aria-label="Legal and staff login"
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start"
              >
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
              </nav>
              <p className="mt-1.5">
                Copyright © {SITE_COPYRIGHT_YEAR} AS Brokers CC. All rights reserved.
                <span aria-hidden className="mx-1.5 text-stone-600">
                  |
                </span>
                Designed, Developed and Maintained by{" "}
                <a
                  href="https://www.endpointmedia.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 ease-in-out hover:text-stone-300"
                >
                  Endpoint Media
                </a>
              </p>
            </div>
            <p className="text-center text-[11px] leading-snug text-stone-300 lg:max-w-xl lg:text-right">
              Authorised Financial Services Provider | FSP 17273 | FSCA Regulated | FAIS & POPIA
              Compliant.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
