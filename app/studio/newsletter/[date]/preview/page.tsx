import Link from "next/link";
import { notFound } from "next/navigation";

import { NewsletterView } from "@/components/newsletter/NewsletterView";
import { getResolvedEditionByDate } from "@/lib/newsletter/store";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ date: string }>;
}

/** Studio-only draft preview — works for unpublished editions. */
export default async function NewsletterStudioPreviewPage({ params }: PageProps) {
  const { date } = await params;
  const edition = await getResolvedEditionByDate(date);

  if (!edition) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
        <strong>Studio draft preview</strong> — this page is not public.
        Status: {edition.status}.{" "}
        <Link href={`/studio/newsletter/${date}`} className="underline">
          Back to editor
        </Link>
      </div>
      <NewsletterView edition={edition} isArchive />
    </div>
  );
}
