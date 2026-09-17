import Link from "next/link";

export function NewsletterFooter() {
  return (
    <footer className="mt-12 border-t border-stone-200 pt-8">
      <div className="text-center">
        <p className="text-xl font-bold text-shark">AS Brokers</p>
        <p className="mt-1 text-sm font-medium text-stone-500">Create. Protect. Preserve.</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-stone-600">
          <Link href="/" className="hover:text-samsung-blue hover:underline">
            Website
          </Link>
          <span className="text-stone-300">|</span>
          <Link href="/contact" className="hover:text-samsung-blue hover:underline">
            Contact
          </Link>
          <span className="text-stone-300">|</span>
          <Link href="/about" className="hover:text-samsung-blue hover:underline">
            About
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <a
            href="https://www.facebook.com/asbrokers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-samsung-blue"
            aria-label="Facebook"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@asbrokers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-samsung-blue"
            aria-label="YouTube"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
              <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white" />
            </svg>
          </a>
        </div>

        <p className="mt-6 text-xs text-stone-400">
          AS Brokers CC (FSP 17273) | 25+ years of trusted financial guidance
        </p>
      </div>
    </footer>
  );
}
