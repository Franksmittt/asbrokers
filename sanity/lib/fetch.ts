import { cache } from "react";
import { sanityFetch } from "./live";

/**
 * Cached fetch so generateMetadata and the page component share one request per article.
 */
export const cachedSanityFetch = cache(sanityFetch);
