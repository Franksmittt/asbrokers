import type { Metadata } from "next";
import Link from "next/link";

import { getLatestPublishedEdition, listPublishedEditions, resolveEdition, seedSampleEdition } from "@/lib/newsletter/store";
import { NewsletterView } from "@/components/newsletter/NewsletterView";

export const metadata: Metadata = {
  title: "Weekly Financial Freedom Newsletter | AS Brokers",
  description:
    "The AS Brokers Weekly Financial Freedom Newsletter helps you continually review the different parts of your financial life — retirement, investments, insurance, estate planning, and more.",
  openGraph: {
    title: "Weekly Financial Freedom Newsletter | AS Brokers",
    description:
      "Your weekly briefing on financial planning, retirement, investments, insurance, and building financial freedom.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function NewsletterPage() {
  // Seed sample data for development if no editions exist
  let edition = getLatestPublishedEdition();
  if (!edition) {
    // In dev/demo mode, seed a sample and show it
    seedSampleEdition();
    edition = getLatestPublishedEdition();
  }

  // If still no published edition, show coming soon
  if (!edition) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-shark">Newsletter Coming Soon</h1>
        <p className="mt-4 text-stone-600">
          The AS Brokers Weekly Financial Freedom Newsletter will be launching soon. Check back
          later for our first edition.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-samsung-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-samsung-blue/90"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const resolved = resolveEdition(edition);
  const allEditions = listPublishedEditions();

  return (
    <>
      <NewsletterView edition={resolved} />

      {/* Archive link */}
      {allEditions.length > 1 && (
        <div className="mx-auto max-w-3xl border-t border-stone-200 px-4 pb-12 text-center">
          <Link
            href="/newsletter/archive"
            className="inline-flex items-center gap-2 text-sm text-samsung-blue hover:underline"
          >
            View newsletter archive
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      )}
    </>
  );
}
