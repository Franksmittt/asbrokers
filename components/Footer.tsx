import Link from "next/link";
import { ShieldCheck } from "./icons";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Calculators", href: "/calculators" },
  { label: "Contact", href: "/contact" },
  { label: "Team", href: "/team" },
  { label: "Chat", href: "/chat" },
  { label: "Insights", href: "/insights" },
  { label: "Quiz", href: "/quiz" },
  { label: "Regulatory", href: "/regulatory-compliance" },
];

const serviceLinks = [
  { label: "Retirement & Everest", href: "/everest-wealth" },
  { label: "Insurance & Risk", href: "/solutions#insurance" },
  { label: "Estate", href: "/solutions#estate" },
  { label: "Understanding Everest", href: "/everest-wealth/about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Complaints", href: "/complaints" },
  { label: "Conflict of Interest", href: "/conflict-of-interest" },
];

function LinkRow({
  links,
  className = "",
  linkClassName = "text-sm",
}: {
  links: { label: string; href: string }[];
  className?: string;
  linkClassName?: string;
}) {
  return (
    <nav className={`flex flex-wrap items-center justify-center gap-x-0 gap-y-2 ${className}`} aria-label="Footer navigation">
      {links.map((link, i) => (
        <span key={link.href} className="inline-flex items-center">
          <Link
            href={link.href}
            prefetch={false}
            className={`${linkClassName} text-zinc-500 hover:text-white transition-colors py-0.5`}
          >
            {link.label}
          </Link>
          {i < links.length - 1 && <span className="text-zinc-600 select-none px-1.5" aria-hidden>·</span>}
        </span>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a0a0c] border-t border-white/10">
      <div className="h-px bg-gradient-to-r from-cinematic-teal to-gold-orange" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Compliance: one line, minimal */}
        <p className="text-center text-[11px] uppercase tracking-widest text-zinc-500 mb-10">
          FAIS Compliant · FSCA Regulated · POPIA Compliant · FSP 17273
        </p>

        {/* Minimal brand line: logo + name + FSP + WhatsApp, same style as link rows */}
        <nav className="flex flex-wrap items-center justify-center gap-x-0 gap-y-2 mb-10" aria-label="Brand and contact">
          <span className="inline-flex items-center">
            <Link href="/" prefetch={false} className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors py-0.5">
              <span className="bg-gradient-to-br from-cinematic-teal to-gold-orange p-1.5 rounded-lg inline-flex">
                <ShieldCheck className="w-4 h-4 text-white" />
              </span>
              AS Brokers
            </Link>
          </span>
          <span className="text-zinc-600 select-none px-1.5" aria-hidden>·</span>
          <span className="inline-flex items-center">
            <span className="text-sm text-zinc-500 py-0.5">FSP 17273</span>
          </span>
          <span className="text-zinc-600 select-none px-1.5" aria-hidden>·</span>
          <span className="inline-flex items-center">
            <a
              href="https://wa.me/27672429946"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-white transition-colors py-0.5"
            >
              WhatsApp 067 242 9946
            </a>
          </span>
        </nav>

        {/* One flowing link area: main nav */}
        <div className="border-t border-white/5 pt-8 pb-6">
          <LinkRow links={mainLinks} />
        </div>

        {/* Services + Legal: one row with dot separators */}
        <div className="border-t border-white/5 pt-6 pb-6">
          <LinkRow links={[...serviceLinks, ...legalLinks]} linkClassName="text-xs" />
        </div>

        <p className="text-center text-xs text-zinc-600 pt-4">
          © 2026 AS Brokers CC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
