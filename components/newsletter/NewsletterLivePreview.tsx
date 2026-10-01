"use client";

import type { ResolvedNewsletterEdition } from "@/lib/newsletter/types";
import { NewsletterView } from "./NewsletterView";
import { NewsletterEmailTeaser } from "./NewsletterEmailTeaser";

type PreviewMode = "web" | "email";
type DeviceMode = "desktop" | "mobile";

type NewsletterLivePreviewProps = {
  edition: ResolvedNewsletterEdition;
  mode: PreviewMode;
  device: DeviceMode;
  baseUrl: string;
};

export function NewsletterLivePreview({
  edition,
  mode,
  device,
  baseUrl,
}: NewsletterLivePreviewProps) {
  const widthClass = device === "mobile" ? "max-w-[375px]" : "max-w-full";

  return (
    <div className="h-full overflow-auto rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-3">
      <div className={`mx-auto ${widthClass} overflow-hidden rounded-lg bg-[#F7F6F3] shadow-lg`}>
        {mode === "web" ? (
          <div className="bg-white text-shark">
            {!edition.articleOfTheWeek.title ? (
              <div className="m-6 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
                <p className="text-sm font-medium text-stone-600">Article of the Week</p>
                <p className="mt-1 text-xs text-stone-400">
                  Pick an insight on the left to see the live preview fill in.
                </p>
              </div>
            ) : null}
            <NewsletterView edition={edition} isArchive />
          </div>
        ) : (
          <NewsletterEmailTeaser edition={edition} baseUrl={baseUrl} />
        )}
      </div>
    </div>
  );
}
