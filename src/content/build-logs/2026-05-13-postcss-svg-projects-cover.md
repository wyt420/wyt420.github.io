---
title: "项目页：PostCSS @apply 报错与封面 SVG 裂图"
date: 2026-05-13
problem: |
  （现象一）本地 `pnpm dev` 时 PostCSS 报错：`border-surface-ink/12` 等类在 `@layer components` 的 `@apply` 中「不存在」，页面样式编译失败。
  （现象二）项目作品集 `/projects` 中 EAM 三张封面显示裂图，浏览器无法解析 SVG。
  （流程疑问）上述问题为何没有自动出现在「建设日志」里？
solution:
  - "自动建设日志：仅当通过 `pnpm dev` / `build` / `check` / `lint`（走 `scripts/run-with-auto-log.ts`）且命令退出码非 0 时，才会追加一条日志。在对话里直接修改仓库、或只跑 `astro check`/`build` 且已成功、或失败发生在未包装命令中，都不会触发自动写入。"
  - "需要留档时：运行 `pnpm add-log` 交互式新增；或在 `src/content/build-logs/` 手工新增 Markdown，front matter 符合 `content.config.ts` 中 buildLogs 的 schema。"
  - "PostCSS：避免在 `@apply` 中对扩展色使用 `border-surface-ink/12` 这类透明度简写；改为 `border-slate-200/90` 等 Tailwind 能稳定展开的工具类，或不用 `@apply` 改写为原生 CSS。"
  - "SVG 封面：保证文件为合法 UTF-8 XML；文案与属性中避免未转义 `&`；中文或特殊标点若在部分编辑器/链路上被写成非法字节会导致整图解析失败，可改为 ASCII 或 XML 实体，并为 `linearGradient`/`filter` 的 id 使用文件内唯一前缀。"
  - "前端资源路径：在 `ProjectsBoard.vue` 中对 `public` 图片使用 `import.meta.env.BASE_URL` 拼接，避免将来配置非根 `base` 时裂图。"
keywords:
  - "postcss"
  - "tailwind"
  - "apply"
  - "svg"
  - "建设日志"
  - "run-with-auto-log"
---

## 为何没有自动进建设日志

包装脚本只在**命令失败**时写日志。排查过程中若在 IDE/助手里直接修好、或运行的检查已通过，就不会产生「失败一次 → 自动追加一条」的记录。这与「是否重要」无关，纯粹是触发条件设计如此。

## 本次关联文件（备忘）

- `src/styles/global.css`：`.shell-input`、`.prose pre` 的 `@apply` 调整。
- `public/project-eam-api.svg`、`project-eam-web.svg`、`project-eam-app.svg`：合法 XML 重写。
- `src/components/ProjectsBoard.vue`：`publicAssetUrl()` 与 `<img>` 的 `src`。
