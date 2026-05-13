/**
 * Tailwind 配置：扫描 src 下源码，并启用 typography 插件渲染文章 prose。
 * 品牌色与中性色与全局 CSS 变量一致，便于在 class 中写 bg-brand、text-surface 等。
 */
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#165DFF",
          accent: "#722ED1"
        },
        surface: {
          muted: "#F5F7FA",
          ink: "#1D2129"
        }
      }
    }
  },
  plugins: [typography]
};
