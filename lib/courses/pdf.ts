/** Course PDF helpers shared by Course Studio, the lesson page, and the media download. */

export const COURSE_PDFS_BUCKET = process.env.SUPABASE_COURSE_PDFS_BUCKET || "course-pdfs";
export const COURSE_PDF_MIME_TYPE = "application/pdf";
export const COURSE_PDF_FILE_SIZE_LIMIT = 20 * 1024 * 1024;

const PDF_NAME_MAX = 120;

/**
 * Keep a download name that is safe to put in Content-Disposition and on disk.
 * Empty input stays empty so a block can be saved before a file is chosen.
 */
export function sanitizePdfFileName(value: string): string {
  const base = value.trim().split(/[/\\]/).pop() ?? "";
  const cleaned = base
    .replace(/[^A-Za-z0-9._ -]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[\s.-]+|[\s.-]+$/g, "")
    .slice(0, PDF_NAME_MAX);
  if (!cleaned) return "";
  const withExt = cleaned.toLowerCase().endsWith(".pdf") ? cleaned : `${cleaned.slice(0, PDF_NAME_MAX - 4)}.pdf`;
  return withExt.slice(0, PDF_NAME_MAX);
}

export function isPdfUpload(contentType: string, fileName: string): boolean {
  const name = fileName.trim().toLowerCase();
  if (!name.endsWith(".pdf")) return false;
  const type = contentType.trim().toLowerCase();
  return type === COURSE_PDF_MIME_TYPE || type === "application/octet-stream" || type === "";
}

/** Accept our private media proxy or an https link. Drop anything else. */
export function sanitizeCoursePdfUrl(value: string): string {
  const url = value.trim();
  if (!url) return "";

  if (url.startsWith("/api/studio/media?")) {
    try {
      const parsed = new URL(url, "https://asbrokers.local");
      if (parsed.pathname !== "/api/studio/media") return "";
      const bucket = parsed.searchParams.get("bucket") ?? "";
      const objectPath = parsed.searchParams.get("path") ?? "";
      if (!/^[a-zA-Z0-9_-]+$/.test(bucket)) return "";
      if (!isSafeStoragePath(objectPath) || !objectPath.toLowerCase().endsWith(".pdf")) return "";
      return `/api/studio/media?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(objectPath)}`;
    } catch {
      return "";
    }
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return "";
    return parsed.toString();
  } catch {
    return "";
  }
}

export function coursePdfDownloadHref(url: string, fileName: string): string {
  const safe = sanitizeCoursePdfUrl(url);
  if (!safe) return "";
  if (!safe.startsWith("/api/studio/media?")) return safe;

  const parsed = new URL(safe, "https://asbrokers.local");
  parsed.searchParams.set("download", "1");
  const name = sanitizePdfFileName(fileName) || "document.pdf";
  parsed.searchParams.set("name", name);
  return `${parsed.pathname}?${parsed.searchParams.toString()}`;
}

export function coursePdfProxyUrl(bucket: string, objectPath: string): string {
  return `/api/studio/media?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(objectPath)}`;
}

export function isSafeStoragePath(objectPath: string): boolean {
  if (!objectPath || objectPath.includes("..") || objectPath.includes("\\")) return false;
  return /^[a-zA-Z0-9/_\-.]+$/.test(objectPath);
}

export function contentDispositionAttachment(fileName: string): string {
  const safe = sanitizePdfFileName(fileName) || "document.pdf";
  return `attachment; filename="${safe}"; filename*=UTF-8''${encodeURIComponent(safe)}`;
}
