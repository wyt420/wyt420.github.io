import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPublishedPosts } from "@/lib/content";
import { postPermalink } from "@/lib/url";
import { siteConfig } from "@/config/site";

export const GET: APIRoute = async (context) => {
  const posts = await getPublishedPosts();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description ?? "",
      link: postPermalink(post)
    }))
  });
};
