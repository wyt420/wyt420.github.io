---
title: "将首屏 JS 控制在 50KB 以内"
description: "通过 Astro 岛屿架构和按需 hydration 控制包体积。"
pubDate: 2026-05-10
tags: ["性能优化", "Astro"]
category: "性能"
draft: false
top: false
---

核心思路：

1. 非交互页面尽量 0 JS。
2. 交互组件按 `client:idle` 或 `client:visible` 延迟加载。
3. 只把 Vue 用在必要交互模块。
