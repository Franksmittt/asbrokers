import Link from "next/link";
import { notFound } from "next/navigation";

import { listNewsletterContentCatalog } from "@/lib/newsletter/content-catalog";
import { EVERGREEN_SECTIONS } from "@/lib/newsletter/evergreen-sections";
import { getEditionByDate, resolveEdition } from "@/lib/newsletter/store";
import { isResendConfigured } from "@/lib/email/resend";
import { getSiteOrigin } from "@/lib/site-url";
import { NewsletterEditorClient } from "./NewsletterEditorClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ date: string }>;
}

export default async function NewsletterEditorPage({ params }: PageProps) {
  const { date } = await params;
  const edition = await getEditionByDate(date);

  if (!edition) {
    notFound();
  }

  const resolved = resolveEdition(edition);
  const catalog = await listNewsletterContentCatalog();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
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
            Side-by-side builder · autosave · content pickers · schedule &amp; send
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/studio/newsletter/${date}/preview`}
            target="_blank"
            className="rounded-md border border-[#2a2a2a] px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Draft web preview
          </Link>
          <Link
            href={`/newsletter/${date}/email`}
            target="_blank"
            className="rounded-md border border-[#2a2a2a] px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Email tab
          </Link>
        </div>
      </div>

      <NewsletterEditorClient
        edition={resolved}
        evergreenSections={EVERGREEN_SECTIONS}
        catalog={catalog}
        baseUrl={getSiteOrigin()}
        resendConfigured={isResendConfigured()}
      />
    </div>
  );
}
