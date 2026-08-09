import { firstImageSrcFromHtml } from "@/lib/client-studio/studio-body-metadata";

/** Last-resort visual when a Studio article has no cover or body image. */
export const STUDIO_INSIGHT_COVER_FALLBACK = "/images/insights-hero-16x9.jpg";

const INVALID_SRC_TOKENS = [
  "YOUR_IMAGE_URL_HERE",
  "{{IMAGE_URL}}",
  "REPLACE_WITH_IMAGE_URL",
  "YOUR_IMAGE_URL",
];

function isUsableCoverSrc(src: string | null | undefined): src is string {
  if (!src) return false;
  const value = src.trim();
  if (!value) return false;
  if (value === "#") return false;
  if (value.toLowerCase().startsWith("javascript:")) return false;
  if (value.startsWith("blob:")) return false;
  if (INVALID_SRC_TOKENS.some((token) => value.includes(token))) return false;
  return true;
}

/**
 * Canonical cover for Studio insight articles.
 * Prefer the published hero (Image Slot #1), then the first real body image.
 */
export function resolveStudioInsightCoverImage(input: {
  heroImageUrl?: string | null;
  bodyHtmlPublished?: string | null;
  bodyHtml?: string | null;
}): string {
  if (isUsableCoverSrc(input.heroImageUrl)) {
    return input.heroImageUrl.trim();
  }

  const fromPublished = firstImageSrcFromHtml(input.bodyHtmlPublished);
  if (isUsableCoverSrc(fromPublished)) {
    return fromPublished.trim();
  }

  const fromDraft = firstImageSrcFromHtml(input.bodyHtml);
  if (isUsableCoverSrc(fromDraft)) {
    return fromDraft.trim();
  }

  return STUDIO_INSIGHT_COVER_FALLBACK;
}
