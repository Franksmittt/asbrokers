/**
 * Three-way merge for the Course Studio snapshot.
 *
 * A block save and a publish can land on different servers at the same time.
 * Each server used to write its whole in-memory snapshot and wipe the other
 * change. Merging against the snapshot this server started from keeps both.
 */

function clone<T>(value: T): T {
  return structuredClone(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key, index) => key === bKeys[index] && deepEqual(a[key], b[key]));
  }
  return false;
}

function itemKey(item: unknown): string | null {
  if (!isPlainObject(item)) return null;
  if (typeof item.id === "string" && item.id) return `id:${item.id}`;
  if (typeof item.studentId === "string" && item.studentId) return `student:${item.studentId}`;
  return null;
}

function reindexSortOrder(items: unknown[]): unknown[] {
  if (!items.every((item) => isPlainObject(item) && typeof item.sortOrder === "number")) return items;
  return [...items]
    .sort((a, b) => {
      const left = isPlainObject(a) && typeof a.sortOrder === "number" ? a.sortOrder : 0;
      const right = isPlainObject(b) && typeof b.sortOrder === "number" ? b.sortOrder : 0;
      return left - right;
    })
    .map((item, index) => (isPlainObject(item) ? { ...item, sortOrder: index } : item));
}

function orderKeys(preferred: unknown[], extra: unknown[]): string[] {
  const seen = new Set<string>();
  const keys: string[] = [];
  for (const item of [...preferred, ...extra]) {
    const key = itemKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    keys.push(key);
  }
  return keys;
}

function mergeIdArrays(base: unknown[], local: unknown[], remote: unknown[]): unknown[] {
  const baseMap = new Map(base.map((item) => [itemKey(item) as string, item]));
  const localMap = new Map(local.map((item) => [itemKey(item) as string, item]));
  const remoteMap = new Map(remote.map((item) => [itemKey(item) as string, item]));
  const baseOrder = orderKeys(base, []);
  const localOrder = orderKeys(local, []);
  const remoteOrder = orderKeys(remote, []);
  const localReordered = localOrder.join("|") !== baseOrder.join("|");
  const remoteReordered = remoteOrder.join("|") !== baseOrder.join("|");
  const keys = localReordered || !remoteReordered ? orderKeys(local, remote) : orderKeys(remote, local);

  const merged: unknown[] = [];
  for (const key of keys) {
    const before = baseMap.get(key);
    const ours = localMap.get(key);
    const theirs = remoteMap.get(key);
    if (ours === undefined && theirs === undefined) continue;
    if (ours === undefined && theirs !== undefined) {
      if (before === undefined || deepEqual(theirs, before)) continue;
      merged.push(clone(theirs));
      continue;
    }
    if (theirs === undefined && ours !== undefined) {
      if (before === undefined || deepEqual(ours, before)) continue;
      merged.push(clone(ours));
      continue;
    }
    merged.push(mergeValue(before, ours, theirs));
  }
  return reindexSortOrder(merged);
}

function mergeValue(base: unknown, local: unknown, remote: unknown): unknown {
  if (deepEqual(local, remote)) return clone(local);
  if (deepEqual(local, base)) return clone(remote);
  if (deepEqual(remote, base)) return clone(local);

  if (isPlainObject(local) && isPlainObject(remote)) {
    const before = isPlainObject(base) ? base : {};
    const keys = new Set([...Object.keys(before), ...Object.keys(local), ...Object.keys(remote)]);
    const out: Record<string, unknown> = {};
    for (const key of keys) {
      if (
        key === "updatedAt" &&
        typeof local[key] === "string" &&
        typeof remote[key] === "string"
      ) {
        out[key] = local[key] > remote[key] ? local[key] : remote[key];
        continue;
      }
      const next = mergeValue(before[key], local[key], remote[key]);
      if (next !== undefined) out[key] = next;
    }
    return out;
  }

  if (Array.isArray(local) && Array.isArray(remote)) {
    const before = Array.isArray(base) ? base : [];
    const keyed =
      [...before, ...local, ...remote].every((item) => itemKey(item)) &&
      (local.length > 0 || remote.length > 0 || before.length > 0);
    if (keyed) return mergeIdArrays(before, local, remote);
  }

  return clone(local);
}

export function mergeCourseStudioSnapshots<T>(base: T, local: T, remote: T): T {
  return mergeValue(base, local, remote) as T;
}
