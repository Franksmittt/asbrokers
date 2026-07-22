import type { Metadata } from "next";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Website temporarily unavailable",
  description:
    "AS Brokers CC (FSP 17273) website is temporarily unavailable while we complete a compliance and content review.",
  robots: { index: false, follow: false },
};

/**
 * Public soft-lock holding page. No product marketing, no calculators, no nav.
 */
export default function SiteHoldPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: "#F7F6F3", color: "#1D1D1F" }}
    >
      <div className="w-full max-w-xl text-center">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "#0F766E" }}
        >
          AS Brokers CC · FSP 17273
        </p>
        <h1
          className="mt-4 font-bold tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 1.3rem + 1.5vw, 2.5rem)" }}
        >
          Website temporarily unavailable
        </h1>
        <p className="mt-5 text-base leading-relaxed text-stone-600 sm:text-lg">
          Our public website is temporarily offline while we complete a compliance, accuracy and
          content review with our authorised financial services provider team.
        </p>
        <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
          AS Brokers CC remains open for business. Please contact us directly for advice, bookings
          or existing client support.
        </p>

        <div className="mt-10 space-y-3">
          <a
            href={whatsappUrl(
              "Hi AS Brokers, I visited the website and would like to speak with an adviser."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1D1D1F] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto sm:min-w-[16rem]"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <div>
            <a
              href="mailto:albert@asbrokers.co.za"
              className="inline-flex items-center justify-center text-sm font-semibold underline-offset-4 hover:underline"
              style={{ color: "#0F766E" }}
            >
              albert@asbrokers.co.za
            </a>
          </div>
        </div>

        <p className="mt-12 text-xs leading-relaxed text-stone-500">
          Authorised Financial Services Provider · FSP 17273 · Category 1.8 · Krugersdorp, Gauteng
        </p>
      </div>
    </main>
  );
}
