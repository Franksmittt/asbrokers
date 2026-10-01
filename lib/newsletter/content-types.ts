export type ContentPickKind = "article" | "calculator" | "course" | "page";

export type ContentPickItem = {
  kind: ContentPickKind;
  id: string;
  label: string;
  href: string;
  description?: string;
};

export function filterContentItems(
  items: ContentPickItem[],
  query: string
): ContentPickItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.href.toLowerCase().includes(q) ||
      (item.description?.toLowerCase().includes(q) ?? false)
  );
}
