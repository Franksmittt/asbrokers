import { notFound } from "next/navigation";

import { getResolvedEditionByDate } from "@/lib/newsletter/store";
import { NewsletterEmailTeaser } from "@/components/newsletter/NewsletterEmailTeaser";
import { getSiteOrigin } from "@/lib/site-url";

interface PageProps {
  params: Promise<{ date: string }>;
}

/**
 * Email-friendly teaser version of the newsletter.
 * Visit /newsletter/YYYY-MM-DD/email to see the email-ready HTML.
 * This can be copied into email tools or used as a preview.
 */
export default async function NewsletterEmailPage({ params }: PageProps) {
  const { date } = await params;
  const edition = getResolvedEditionByDate(date);

  if (!edition) {
    notFound();
  }

  const baseUrl = getSiteOrigin();

  return (
    <div className="min-h-screen bg-stone-300 py-8">
      {/* Preview notice */}
      <div className="mx-auto mb-4 max-w-[600px] rounded-lg bg-amber-100 px-4 py-3 text-center text-sm text-amber-800">
        <strong>Email Preview:</strong> This is how the newsletter will appear in email clients.
        Copy the HTML or use this as a reference for email distribution.
      </div>

      {/* Email teaser content */}
      <NewsletterEmailTeaser edition={edition} baseUrl={baseUrl} />

      {/* Copy HTML button area */}
      <div className="mx-auto mt-4 max-w-[600px] rounded-lg bg-stone-800 px-4 py-3 text-center text-sm text-stone-300">
        Right-click and &quot;View Page Source&quot; or use your browser&apos;s developer tools to
        copy the email HTML.
      </div>
    </div>
  );
}
