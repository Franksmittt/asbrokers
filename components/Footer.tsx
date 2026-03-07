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

        {/* Brand + CTA: centered, one focus */}
        <div className="text-center mb-12">
          <Link href="/" prefetch={false} className="inline-flex flex-col items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-cinematic-teal to-gold-orange p-3 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white block">AS Brokers</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">FSP 17273</span>
            </div>
          </Link>
          <p className="text-zinc-400 text-sm max-w-xs mx-auto mb-6">
            Protecting Your Legacy. Engineering Your Wealth.
          </p>
          <a
            href="https://wa.me/27672429946"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp 067 242 9946
          </a>
        </div>

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
