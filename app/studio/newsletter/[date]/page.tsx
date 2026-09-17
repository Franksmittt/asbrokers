import Link from "next/link";
import { notFound } from "next/navigation";

import { getEditionByDate, resolveEdition } from "@/lib/newsletter/store";
import { EVERGREEN_SECTIONS } from "@/lib/newsletter/evergreen-sections";
import { NewsletterEditorClient } from "./NewsletterEditorClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ date: string }>;
}

export default async function NewsletterEditorPage({ params }: PageProps) {
  const { date } = await params;
  const edition = getEditionByDate(date);

  if (!edition) {
    notFound();
  }

  const resolved = resolveEdition(edition);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/studio/newsletter"
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            ← Back to newsletters
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            {new Date(date).toLocaleDateString("en-ZA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Edition ID: {edition.id}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
              edition.status === "published"
                ? "border-green-500/30 text-green-400"
                : "border-[#2a2a2a] text-zinc-400"
            }`}
          >
            {edition.status}
          </span>
          <Link
            href={`/newsletter/${date}/email`}
            target="_blank"
            className="rounded-md border border-[#2a2a2a] px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Email version
          </Link>
          <Link
            href={`/newsletter/${date}`}
            target="_blank"
            className="rounded-md border border-[#2a2a2a] px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Preview →
          </Link>
        </div>
      </div>

      <NewsletterEditorClient
        edition={resolved}
        evergreenSections={EVERGREEN_SECTIONS}
      />
    </div>
  );
}
