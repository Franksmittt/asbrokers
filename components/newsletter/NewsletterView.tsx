import Link from "next/link";

import type { ResolvedNewsletterEdition } from "@/lib/newsletter/types";
import { NewsletterHeader } from "./NewsletterHeader";
import { ArticleOfTheWeek } from "./ArticleOfTheWeek";
import { WatchChallengeSection } from "./WatchChallengeSection";
import { CoursesSection } from "./CoursesSection";
import { FinancialPlanSection } from "./FinancialPlanSection";
import { NewsletterFooter } from "./NewsletterFooter";

interface NewsletterViewProps {
  edition: ResolvedNewsletterEdition;
  isArchive?: boolean;
}

export function NewsletterView({ edition, isArchive = false }: NewsletterViewProps) {
  const getDynamicContent = (sectionId: string) =>
    edition.sectionContent.find((s) => s.sectionId === sectionId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <NewsletterHeader date={edition.date} isArchive={isArchive} />

      <div className="mt-8 space-y-0">
        {/* Primary sections - open by default */}
        <ArticleOfTheWeek article={edition.articleOfTheWeek} />
        <WatchChallengeSection challenge={edition.watchChallenge} />
        <CoursesSection courses={edition.courses} />

        {/* Your Financial Plan heading */}
        <div className="border-b border-stone-200 pb-4 pt-8">
          <h2 className="text-xl font-bold text-shark">Your Financial Plan</h2>
          <p className="mt-1 text-sm text-stone-500">
            Click any section below to learn more about that part of your financial life.
          </p>
        </div>

        {/* Evergreen accordion sections */}
        {edition.evergreenSections.map((section) => (
          <FinancialPlanSection
            key={section.id}
            section={section}
            dynamicContent={getDynamicContent(section.id)}
          />
        ))}
      </div>

      {/* Need help CTA */}
      <section className="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 text-center">
        <h2 className="text-xl font-bold text-shark">Need Help With Something?</h2>
        <p className="mt-2 text-stone-600">
          Your financial plan is a system. You do not necessarily need another product. Sometimes
          you simply need to review whether the different parts of the system are still working
          together.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-samsung-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-samsung-blue/90"
          >
            Book a Review
          </Link>
          <a
            href="https://wa.me/27000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-shark transition-colors hover:bg-stone-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </section>

      <NewsletterFooter />
    </div>
  );
}
