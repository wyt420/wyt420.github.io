---
title: "Tailwind 配置报错：require is not defined"
date: 2026-05-13
problem: |
  浏览器报错页显示 `ReferenceError: require is not defined`，定位到 `tailwind.config.mjs`。
  原因是该文件是 ESM 模块，却使用了 CommonJS 的 `require("@tailwindcss/typography")`。
solution:
  - "将 tailwind.config.mjs 改为 ESM 导入语法。"
  - "使用 import typography from \"@tailwindcss/typography\"。"
  - "plugins 从 require(...) 改为 [typography]，重新构建验证。"
keywords:
  - "tailwind"
  - "esm"
  - "require is not defined"
---

## 背景

`*.mjs` 默认按 ESM 解析，不能直接使用 `require`。

## 解决步骤

1. 在 `tailwind.config.mjs` 顶部改为 `import typography from "@tailwindcss/typography"`。
2. 将 `plugins: [require("@tailwindcss/typography")]` 改为 `plugins: [typography]`。
3. 执行 `pnpm build`，确认构建通过且页面恢复正常。
