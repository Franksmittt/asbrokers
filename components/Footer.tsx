import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6 md:px-8 bg-[#0a0a0c] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-center md:text-left">
            <div className="font-bold text-xl tracking-tight text-white mb-1">AS Brokers CC</div>
            <div className="text-zinc-500 text-sm">FSP No. 17273 | Authorised Financial Services Provider</div>
            <div className="text-zinc-600 text-xs mt-1">Alberton, East Rand · Gauteng · South Africa</div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-zinc-500 text-sm">
            <Link href="/team" className="hover:text-white transition-colors">Our Team</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/calculators" className="hover:text-white transition-colors">Calculators</Link>
            <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/everest-wealth" className="hover:text-white transition-colors">Everest Wealth</Link>
            <Link href="/retirement" className="hover:text-white transition-colors">Retirement</Link>
            <Link href="/solutions#estate" className="hover:text-white transition-colors">Estate</Link>
            <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp 067 242 9946
            </a>
          </nav>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 text-xs">
          <span>© {new Date().getFullYear()} AS Brokers CC. All rights reserved.</span>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-white transition-colors">Complaints Procedure</Link>
            <Link href="#" className="hover:text-white transition-colors">FAIS & POPIA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
