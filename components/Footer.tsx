import Link from "next/link";
import { ShieldCheck } from "./icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Calculators", href: "/calculators" },
  { label: "Insights", href: "/insights" },
  { label: "Financial Health Quiz", href: "/quiz" },
  { label: "Contact", href: "/contact" },
  { label: "Team", href: "/team" },
  { label: "Regulatory & Compliance", href: "/regulatory-compliance" },
];

const serviceLinks = [
  { label: "Retirement & Everest Wealth", href: "/everest-wealth" },
  { label: "Insurance & Risk", href: "/solutions#insurance" },
  { label: "Estate Planning", href: "/solutions#estate" },
  { label: "Understanding Everest", href: "/everest-wealth/about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Complaints Procedure", href: "#" },
  { label: "FAIS & POPIA", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a0a0c] border-t border-white/10">
      {/* Compliance / trust strip */}
      <div className="border-b border-white/5 py-3 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-zinc-500">
          <span>FAIS compliant</span>
          <span>FSCA regulated</span>
          <span>POPIA compliant</span>
          <span>FSP 17273</span>
        </div>
      </div>
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" prefetch={false} className="inline-flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-teal-400 p-2.5 rounded-xl">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">AS Brokers</span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-zinc-500">FSP 17273</span>
              </div>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-6">
              Independent financial advice and Code 1.8 alternative investments. Alberton, East Rand · Gauteng.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/27672429946"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp 067 242 9946
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Quick links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust line - spans on lg */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col justify-end">
            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 inline-flex items-center gap-2 w-fit">
              <span className="text-zinc-500 text-xs font-medium">Authorised Financial Services Provider</span>
              <span className="text-white font-bold text-sm">FSP 17273</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} AS Brokers CC. All rights reserved.
          </span>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} prefetch={false} className="text-zinc-500 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
