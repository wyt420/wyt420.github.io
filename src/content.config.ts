import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().default("默认"),
      cover: image().optional(),
      draft: z.boolean().default(false),
      top: z.boolean().default(false)
    })
});

const buildLogs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/build-logs" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    problem: z.string(),
    solution: z.array(z.string()),
    links: z.array(z.string().url()).optional(),
    keywords: z.array(z.string()).default([])
  })
});

export const collections = { posts, buildLogs };
