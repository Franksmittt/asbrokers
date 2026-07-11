/**
 * Fetch wrapper for the AI chat transport. Next.js (and some hosts) return a full HTML
 * document for 404/500 pages; the AI SDK would otherwise put that entire string in
 * `error.message`, which is unusable in the UI.
 */
function looksLikeHtmlDocument(body: string): boolean {
  const head = body.trimStart().slice(0, 80).toLowerCase();
  return head.startsWith("<!doctype") || head.startsWith("<html");
}

export function asbrokersChatFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(input, init).then(async (response) => {
    if (response.ok) return response;

    const text = await response.text();

    if (response.status === 404) {
      throw new Error(
        "Chat API not found (404). This server may be missing the Next.js route at POST /api/chat, deploy the latest build or fix reverse-proxy rewrites for /api/*."
      );
    }

    if (looksLikeHtmlDocument(text)) {
      throw new Error(
        `Chat request failed (${response.status}). The server returned a web page instead of a chat stream, usually a missing API route, redirect, or hosting misconfiguration.`
      );
    }

    const trimmed = text.trim();
    throw new Error(trimmed.length > 500 ? `${trimmed.slice(0, 500)}…` : trimmed || `Chat request failed (${response.status}).`);
  });
}
