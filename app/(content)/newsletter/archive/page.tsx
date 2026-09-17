import type { Metadata } from "next";
import Link from "next/link";

import { listPublishedEditions } from "@/lib/newsletter/store";

export const metadata: Metadata = {
  title: "Newsletter Archive | AS Brokers",
  description:
    "Browse past editions of the AS Brokers Weekly Financial Freedom Newsletter.",
};

export const dynamic = "force-dynamic";

export default function NewsletterArchivePage() {
  const editions = listPublishedEditions();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 text-sm text-samsung-blue hover:underline"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to latest newsletter
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-shark">Newsletter Archive</h1>
      <p className="mt-2 text-stone-600">
        Browse past editions of the AS Brokers Weekly Financial Freedom Newsletter.
      </p>

      {editions.length === 0 ? (
        <p className="mt-8 text-center text-stone-500">No newsletters have been published yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {editions.map((edition) => {
            const formattedDate = new Date(edition.date).toLocaleDateString("en-ZA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <li key={edition.id}>
                <Link
                  href={`/newsletter/${edition.date}`}
                  className="group block rounded-lg border border-stone-200 bg-white p-5 transition-colors hover:border-samsung-blue/30 hover:bg-stone-50"
                >
                  <p className="font-semibold text-shark group-hover:text-samsung-blue">
                    {formattedDate}
                  </p>
                  {edition.articleOfTheWeek.title && (
                    <p className="mt-1 text-sm text-stone-600">
                      Article of the Week: {edition.articleOfTheWeek.title}
                    </p>
                  )}
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-samsung-blue">
                    Read edition
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
