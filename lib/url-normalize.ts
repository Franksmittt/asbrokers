/** Edge URL normalization, Phase 1. Skips /images/ and /fonts/ (case-sensitive paths). */

const TRACKING_PARAM = /^(utm_|fbclid$|gclid$)/i;

/** Repeated path segment 4+ times → faceted crawl trap. */
const CRAWL_TRAP_PATH = /(\/[^/]+)\1{3,}/;

function isStaticAssetPath(pathname: string): boolean {
  if (/^\/(images|fonts)\//.test(pathname)) return true;
  return /\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff2?|ttf|otf)$/i.test(pathname);
}

export type NormalizeResult =
  | { action: "next" }
  | { action: "redirect"; url: URL }
  | { action: "gone" };

export function normalizeRequestUrl(url: URL): NormalizeResult {
  const pathname = url.pathname;

  if (CRAWL_TRAP_PATH.test(pathname)) {
    return { action: "gone" };
  }

  if (/([?&]sort=[^&]*).*\1/i.test(url.search)) {
    return { action: "gone" };
  }

  if (isStaticAssetPath(pathname)) {
    return { action: "next" };
  }

  let changed = false;
  let newPath = pathname;

  const stripped = newPath.replace(/[.,;:'"!*]+$/g, "");
  if (stripped !== newPath) {
    newPath = stripped || "/";
    changed = true;
  }

  const kept = new URLSearchParams();
  url.searchParams.forEach((value, key) => {
    if (TRACKING_PARAM.test(key)) {
      changed = true;
    } else {
      kept.append(key, value);
    }
  });

  if (!changed) {
    return { action: "next" };
  }

  const normalized = new URL(url.toString());
  normalized.pathname = newPath;
  normalized.search = kept.toString() ? `?${kept.toString()}` : "";
  return { action: "redirect", url: normalized };
}
