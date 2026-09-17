import Link from "next/link";

import type { ArticleOfTheWeek as ArticleOfTheWeekType } from "@/lib/newsletter/types";
import { NewsletterAccordion } from "./NewsletterAccordion";

interface ArticleOfTheWeekProps {
  article: ArticleOfTheWeekType;
}

export function ArticleOfTheWeek({ article }: ArticleOfTheWeekProps) {
  if (!article.title || !article.articleHref) {
    return null;
  }

  return (
    <NewsletterAccordion id="article-of-the-week" title="Article of the Week" defaultOpen>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-shark">{article.title}</h3>

        {article.intro && (
          <p className="text-stone-600">{article.intro}</p>
        )}

        {article.whyItMatters && (
          <div className="rounded-lg border border-samsung-blue/20 bg-samsung-blue/5 p-4">
            <p className="text-sm font-semibold text-samsung-blue">Why this matters:</p>
            <p className="mt-1 text-sm text-stone-700">{article.whyItMatters}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href={article.articleHref}
            className="inline-flex items-center gap-2 font-semibold text-samsung-blue hover:underline"
          >
            Read the Full Article
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

          {article.relatedCalculator && (
            <Link
              href={article.relatedCalculator.href}
              className="inline-flex items-center gap-2 text-stone-600 hover:text-samsung-blue"
            >
              <span className="text-sm">{article.relatedCalculator.label}</span>
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
          )}

          {article.relatedVideo && (
            <Link
              href={article.relatedVideo.href}
              className="inline-flex items-center gap-2 text-stone-600 hover:text-samsung-blue"
            >
              <span className="text-sm">{article.relatedVideo.label}</span>
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
          )}

          {article.relatedCourse && (
            <Link
              href={article.relatedCourse.href}
              className="inline-flex items-center gap-2 text-stone-600 hover:text-samsung-blue"
            >
              <span className="text-sm">{article.relatedCourse.label}</span>
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
          )}
        </div>
      </div>
    </NewsletterAccordion>
  );
}
