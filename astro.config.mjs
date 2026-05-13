/**
 * Astro 工程总配置：集成 Vue / Tailwind / MDX / RSS / Sitemap / PWA，
 * 以及 Markdown 数学公式与代码高亮。site 需与 GitHub Pages 最终域名一致。
 */
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pwa from "@vite-pwa/astro";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  site: "https://wyt420.github.io",
  integrations: [
    vue(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
    pwa({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "avatar.svg", "default-og.svg"],
      manifest: {
        name: "WYT 技术博客",
        short_name: "WYT Blog",
        description: "基于 Astro + Vue 的个人技术博客与在线简历",
        theme_color: "#165DFF",
        background_color: "#1D2129",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webp,xml,txt}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 8, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      }
    })
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }]
    ],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true
    }
  },
  scopedStyleStrategy: "where",
  vite: {
    build: { target: "es2022" }
  }
});
