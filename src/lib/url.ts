import type { CollectionEntry } from "astro:content";

export function postPermalink(post: CollectionEntry<"posts">) {
  const year = post.data.pubDate.getFullYear();
  const month = String(post.data.pubDate.getMonth() + 1).padStart(2, "0");
  const slug = post.id.split("/").pop() ?? post.id;
  return `/posts/${year}/${month}/${slug}/`;
}
