/** Escape HTML, then restore a small educational-text subset: paragraphs, lists, bold, links. */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineFormat(escaped: string): string {
  const withBold = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return withBold.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g,
    '<a href="$2" class="font-medium text-samsung-blue underline-offset-2 hover:underline">$1</a>'
  );
}

function isBullet(line: string): boolean {
  return /^[-*]\s+/.test(line);
}

function isOrdered(line: string): boolean {
  return /^\d+[.)]\s+/.test(line);
}

export function renderLessonText(body: string): string {
  const trimmed = body.replace(/\r\n/g, "\n").trim();
  if (!trimmed) return "";

  const blocks = trimmed.split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length > 1 && lines.every(isBullet)) {
        const items = lines
          .map((line) => `<li>${inlineFormat(escapeHtml(line.replace(/^[-*]\s+/, "")))}</li>`)
          .join("");
        return `<ul class="my-4 list-disc space-y-1 pl-5">${items}</ul>`;
      }
      if (lines.length > 1 && lines.every(isOrdered)) {
        const items = lines
          .map((line) => `<li>${inlineFormat(escapeHtml(line.replace(/^\d+[.)]\s+/, "")))}</li>`)
          .join("");
        return `<ol class="my-4 list-decimal space-y-1 pl-5">${items}</ol>`;
      }
      return `<p class="my-4">${lines.map((line) => inlineFormat(escapeHtml(line))).join("<br />")}</p>`;
    })
    .join("");
}
