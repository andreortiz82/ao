import { getCollection, type CollectionEntry } from "astro:content";

export type WorkEntry = CollectionEntry<"work">;

/** Work case studies sorted by `order` frontmatter (homepage + nav source of truth). */
export async function getWorkEntries(): Promise<WorkEntry[]> {
  const entries = await getCollection("work");
  return entries.sort(
    (a, b) => (a.data.order ?? 99) - (b.data.order ?? 99),
  );
}

export function getWorkSlug(entry: WorkEntry): string {
  return entry.id;
}
