export type OrderedItem = { id: string; sortOrder: number };

export function sortedByOrder<T extends OrderedItem>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));
}

/** Write 0..n-1 from the current array order. Does not re-sort. */
export function reindexInPlace<T extends OrderedItem>(items: T[]): T[] {
  items.forEach((row, index) => {
    row.sortOrder = index;
  });
  return items;
}

/**
 * Swap an item one place up or down, then rewrite sortOrder to 0..n-1.
 * Mutates the original objects (the store holds those references).
 */
export function moveBySortOrder<T extends OrderedItem>(
  items: T[],
  id: string,
  direction: "up" | "down"
): T[] {
  const ordered = sortedByOrder(items);
  const index = ordered.findIndex((row) => row.id === id);
  if (index < 0) return reindexInPlace(ordered);

  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= ordered.length) return reindexInPlace(ordered);

  const current = ordered[index];
  const other = ordered[swapWith];
  if (!current || !other) return reindexInPlace(ordered);

  ordered[index] = other;
  ordered[swapWith] = current;
  return reindexInPlace(ordered);
}

export function canMove(items: OrderedItem[], id: string, direction: "up" | "down"): boolean {
  const ordered = sortedByOrder(items);
  const index = ordered.findIndex((row) => row.id === id);
  if (index < 0) return false;
  return direction === "up" ? index > 0 : index < ordered.length - 1;
}
