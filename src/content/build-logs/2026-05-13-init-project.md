---
title: "初始化项目与内容集合"
date: 2026-05-13
problem: |
  需要把博客、在线简历、项目集和建设日志整合在一个 Astro 工程里，同时保证可扩展性。
solution:
  - "先定义 astro:content 的 posts 与 buildLogs schema。"
  - "再围绕内容集合实现首页、详情页、标签页、归档页。"
  - "最后补齐自动化 add-log 脚本，保证日志可以持续追踪。"
keywords:
  - "content collections"
  - "schema"
---

## 背景

希望将博客开发过程沉淀为可验证的项目经历，用于后续简历与面试展示。

## 解决步骤

1. 设计内容模型并加上类型约束。
2. 实现建设日志页面结构与统计信息。
3. 加入 `npm run add-log` 自动追加流程。
