import Link from "next/link";

import type { WatchChallenge } from "@/lib/newsletter/types";
import { NewsletterAccordion } from "./NewsletterAccordion";

interface WatchChallengeSectionProps {
  challenge: WatchChallenge;
}

export function WatchChallengeSection({ challenge }: WatchChallengeSectionProps) {
  return (
    <NewsletterAccordion id="watch-challenge" title="104-Week Watch Challenge" defaultOpen>
      <div className="space-y-4">
        <p className="text-stone-600">
          Financial freedom is more valuable if you have the health to enjoy it.
        </p>
        <p className="text-stone-600">
          The AS Brokers 104-Week Watch Challenge is designed to encourage consistent improvement in
          health, fitness and wellbeing over two years.
        </p>
        <p className="font-medium text-shark">
          The focus is not perfection. The focus is measurable improvement over time.
        </p>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href={challenge.challengeHref}
            className="inline-flex items-center gap-2 font-semibold text-samsung-blue hover:underline"
          >
            Join the Challenge
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

          {challenge.latestUpdateHref && (
            <Link
              href={challenge.latestUpdateHref}
              className="inline-flex items-center gap-2 text-stone-600 hover:text-samsung-blue"
            >
              <span className="text-sm">Latest Update</span>
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

          <Link
            href={challenge.vitalityHref}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-samsung-blue"
          >
            <span className="text-sm">Vitality Information</span>
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
        </div>
      </div>
    </NewsletterAccordion>
  );
}
