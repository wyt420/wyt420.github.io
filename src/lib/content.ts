import { getCollection, type CollectionEntry } from "astro:content";
import readingTime from "reading-time";

export type Post = CollectionEntry<"posts">;
export type BuildLog = CollectionEntry<"buildLogs">;

export const sortByDateDesc = <T extends { data: { pubDate?: Date; date?: Date } }>(
  items: T[]
) =>
  [...items].sort((a, b) => {
    const ad = a.data.pubDate ?? a.data.date ?? new Date(0);
    const bd = b.data.pubDate ?? b.data.date ?? new Date(0);
    return bd.getTime() - ad.getTime();
  });

export async function getPublishedPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const sorted = sortByDateDesc(posts);
  const top = sorted.filter((post) => post.data.top);
  const normal = sorted.filter((post) => !post.data.top);
  return [...top, ...normal];
}

export async function getBuildLogs() {
  const logs = await getCollection("buildLogs");
  return sortByDateDesc(logs);
}

export function estimateReadingTime(html: string) {
  return readingTime(html, { wordsPerMinute: 260 }).minutes;
}

export function toTagMap(posts: Post[]) {
  const map = new Map<string, number>();
  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    });
  });
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function toArchiveMap(posts: Post[]) {
  const map = new Map<string, Map<string, Post[]>>();
  posts.forEach((post) => {
    const year = post.data.pubDate.getFullYear().toString();
    const month = String(post.data.pubDate.getMonth() + 1).padStart(2, "0");
    if (!map.has(year)) map.set(year, new Map());
    const monthMap = map.get(year)!;
    if (!monthMap.has(month)) monthMap.set(month, []);
    monthMap.get(month)!.push(post);
  });
  return map;
}
