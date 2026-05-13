---
title: "Astro 启动失败：Node 版本不满足要求"
date: 2026-05-13
problem: |
  执行 `pnpm dev` 时提示 `Node.js v18.20.7 is not supported by Astro`，最低要求是 `>=22.12.0`，
  导致开发服务器无法启动。
solution:
  - "确认当前 Node 版本过低（node -v）。"
  - "使用 nvm 安装并切换到 Node 22.12.0 及以上版本。"
  - "重新执行 pnpm install 与 pnpm dev，验证服务可启动。"
keywords:
  - "node"
  - "astro dev"
  - "version mismatch"
---

## 背景

本地环境默认 Node 18，与当前 Astro 版本要求不兼容。

## 解决步骤

1. 执行 `node -v` 确认版本为 `v18.20.7`。
2. 执行 `nvm install 22.12.0 && nvm use 22.12.0`（或安装任意 `>=22.12.0` 版本）。
3. 重新执行 `pnpm install` 和 `pnpm dev`，开发服务恢复正常。
