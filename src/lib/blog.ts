import { getCollection, type CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

/** Blog posts sorted newest first. */
export async function getBlogPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection("blog");
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function formatBlogDate(date: Date, style: "short" | "long" = "short") {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });
}
