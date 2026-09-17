import Link from "next/link";

import type { EvergreenSection, SectionDynamicContent } from "@/lib/newsletter/types";
import { NewsletterAccordion } from "./NewsletterAccordion";

interface FinancialPlanSectionProps {
  section: EvergreenSection;
  dynamicContent?: SectionDynamicContent;
}

const CONTENT_TYPE_LABELS: Record<string, string> = {
  article: "Article",
  video: "Video",
  course: "Course",
  calculator: "Calculator",
  webinar: "Webinar",
  checklist: "Checklist",
};

export function FinancialPlanSection({ section, dynamicContent }: FinancialPlanSectionProps) {
  return (
    <NewsletterAccordion id={section.id} title={section.title}>
      <div className="space-y-4">
        <p className="text-stone-600">{section.evergreenText}</p>

        {section.bulletPoints && section.bulletPoints.length > 0 && (
          <ul className="grid gap-1 text-sm text-stone-600 sm:grid-cols-2">
            {section.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-samsung-blue" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {dynamicContent && dynamicContent.content.length > 0 && (
          <div className="flex flex-col gap-2 pt-2">
            {dynamicContent.content.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="inline-flex items-center gap-2 text-stone-600 hover:text-samsung-blue"
              >
                <span className="text-sm">
                  {item.label}
                  {item.type && (
                    <span className="ml-1 text-xs text-stone-400">
                      ({CONTENT_TYPE_LABELS[item.type] || item.type})
                    </span>
                  )}
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link
            href={section.contactCtaHref}
            className="inline-flex items-center justify-center rounded-lg bg-samsung-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-samsung-blue/90"
          >
            {section.contactCtaLabel}
          </Link>
        </div>
      </div>
    </NewsletterAccordion>
  );
}
