export type VideoProvider = "youtube" | "vimeo" | "unknown";

export type ParsedVideo = {
  provider: VideoProvider;
  embedUrl: string | null;
};

export function parseVideoUrl(raw: string): ParsedVideo {
  const url = raw.trim();
  if (!url) return { provider: "unknown", embedUrl: null };

  try {
    const parsed = new URL(url);

    if (
      parsed.hostname === "youtu.be" ||
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube-nocookie.com"
    ) {
      const id =
        parsed.hostname === "youtu.be"
          ? parsed.pathname.replace("/", "")
          : parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();
      if (id && /^[\w-]{6,}$/.test(id)) {
        return {
          provider: "youtube",
          embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
        };
      }
    }

    if (parsed.hostname === "vimeo.com" || parsed.hostname === "www.vimeo.com" || parsed.hostname === "player.vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) {
        return { provider: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}` };
      }
    }
  } catch {
    return { provider: "unknown", embedUrl: null };
  }

  return { provider: "unknown", embedUrl: null };
}
