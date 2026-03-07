import { draftMode } from "next/headers";
import { client } from "./client";

const token = process.env.SANITY_VIEWER_TOKEN;

/**
 * Returns the Sanity client. In draft mode, uses the viewer token for draft content.
 */
export async function getClient() {
  const { isEnabled } = await draftMode();
  if (isEnabled && token) {
    return client.withConfig({ token, perspective: "previewDrafts", useCdn: false });
  }
  return client;
}

/**
 * Fetch with GROQ. Uses draft-aware client when draft mode is enabled.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const c = await getClient();
  return c.fetch<T>(query, params);
}
