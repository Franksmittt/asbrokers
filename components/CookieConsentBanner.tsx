import { readConsentCookie } from "@/lib/consent-cookie";

/** POPIA cookie banner — pure HTML forms (no Server Actions / no client JS). */
export async function CookieConsentBanner() {
  const consent = await readConsentCookie();
  if (consent) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 md:px-8 md:py-6 bg-[#0a0a0c]/90 ring-1 ring-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="mx-auto flex max-w-4xl min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-w-0 text-sm leading-relaxed text-zinc-300">
          We use cookies for analytics and to save your calculator progress. Your data is processed in line with the{" "}
          <strong className="text-white">Protection of Personal Information Act (POPIA)</strong> and we only use
          non-essential cookies with your consent. You can accept all cookies or restrict to essential only.
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <form action="/api/consent" method="post">
            <input type="hidden" name="level" value="essential" />
            <button
              type="submit"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Essential Only
            </button>
          </form>
          <form action="/api/consent" method="post">
            <input type="hidden" name="level" value="all" />
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Accept All
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
