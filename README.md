# WYT420 技术博客

王雨婷的个人技术博客（仓库名：`wyt420.github.io`）。

基于 **Astro + Vue 3 + Tailwind CSS** 的个人技术博客模板，包含：

- 标准博客系统（分页、标签、归档、RSS、sitemap、搜索）
- 在线简历页面（支持导出 PDF）
- 项目作品集页面（支持类型/技术栈筛选 + GitHub Star/Fork 动态拉取）
- 特色模块：博客建设日志（支持自动化追加）
- GitHub Pages 自动部署与 PWA 基础配置

## 技术栈

- Astro 6
- Vue 3（仅用于交互组件，按需 hydration）
- Tailwind CSS
- Astro Content Collections + Zod schema
- Pagefind（静态全文搜索）
- Giscus（评论）
- GitHub Actions（自动部署）

## 本地开发

```bash
pnpm install
pnpm dev
```

> `pnpm dev / build / check / lint` 已接入自动故障日志：命令失败时会自动追加到 `src/content/build-logs/`。
> 若你只想执行原始命令（不自动记录），使用 `pnpm dev:raw / build:raw / check:raw / lint:raw`。

### Windows / PowerShell

- **不要用 CMD 写法**：`cd /d E:\path` 与 `cmd1 && cmd2` 在旧版 PowerShell 中容易报错；先进入目录再执行，或写成一行：`Set-Location E:\wyt420Blog; pnpm dev`（PowerShell 7+ 也可用 `cd E:\wyt420Blog; pnpm dev`）。
- **检查耗时**：`pnpm check:raw` 会依次跑 `astro check`、`tsc`、`eslint` 全仓库，可能较慢。日常只改页面或配置时，可优先 `pnpm exec astro check` 或 `pnpm build:raw` 做快速校验。

## 构建与预览

```bash
pnpm build
pnpm preview
```

`pnpm build` 会执行：

1. `astro build`
2. `pagefind --site dist`（生成全文检索索引）

## 建设日志自动追加（重点）

执行：

```bash
pnpm add-log
```

脚本会交互式询问：

- 问题标题
- 问题详细描述（多行）
- 解决方案步骤（多行）
- 相关链接（可选；建议填本仓库 commit / issue / PR 链接，无则回车跳过）
- 关键词（可选）

随后自动在 `src/content/build-logs/` 下新增一条 Markdown 日志，日期自动取当前时间。重新构建后，日志会自动展示在 `/build-log` 页面。

### 命令失败自动记录（新增）

常用命令已默认走自动记录包装器：

- `pnpm dev`
- `pnpm build`
- `pnpm check`
- `pnpm lint`

当命令退出码非 0 时，脚本会自动追加一条建设日志，包含：

- 失败命令
- 退出码
- 关键错误行
- 末尾日志片段（用于复盘）

## 内容编写

### 博客文章

路径：`src/content/posts/*.md|mdx`

Front Matter 字段（已通过 Zod 校验）：

- `title`
- `description`
- `pubDate`
- `updatedDate`（可选）
- `tags`（数组）
- `category`
- `cover`（可选）
- `draft`（布尔）
- `top`（布尔）

### 建设日志

路径：`src/content/build-logs/*.md`

## 环境变量

复制 `.env.example` 到 `.env`：

```bash
cp .env.example .env
```

- `PUBLIC_GA_ID`: Google Analytics ID（可选）
- `GITHUB_API_TOKEN`: GitHub Token（可选）。本地填入 PAT 可拉高 REST 限流；**关于页**构建时会拉取 Stars、公开仓库数，并在有 Token 时用 GraphQL 拉取**近 12 个月提交贡献**。CI 中 `deploy.yml` 已把 `secrets.GITHUB_TOKEN` 注入为同名变量，线上构建一般无需再配。
- `GITHUB_FETCH_TIMEOUT_MS`：可选，关于页拉取 GitHub 时**单次请求**超时毫秒数（默认 `15000`）。超时格子显示「**获取数据超时**」而不会用数字顶替。可在仓库 **Actions → Variables** 配置（与 `deploy.yml` 中已引用）。
- **Giscus 评论（开启后必填两项 ID）**：在 [giscus.app](https://giscus.app/zh-CN) 选择仓库 `wyt420/wyt420.github.io` 与 Discussion 分类，复制生成的 `repo-id`、`category-id` 填入：
  - `PUBLIC_GISCUS_REPO`（默认 `wyt420/wyt420.github.io`）
  - `PUBLIC_GISCUS_REPO_ID`
  - `PUBLIC_GISCUS_CATEGORY`（默认 `General`）
  - `PUBLIC_GISCUS_CATEGORY_ID`

**GitHub Actions 线上构建**：在仓库 **Settings → Secrets and variables → Actions → Variables** 中添加上述 `PUBLIC_GISCUS_*`（与 `.env` 同名），否则线上构建产物里评论区会显示「待配置」提示。

## 部署到 GitHub Pages

首次在仓库中启用：**Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**（不要选「Deploy from a branch」的 `gh-pages`，本工作流使用官方 Pages 工件部署）。

仓库已提供 `.github/workflows/deploy.yml`：

- 推送到 `main` 自动构建并部署到 GitHub Pages
- 支持 Pages 环境 URL 回填
- 支持 `public/CNAME` 自定义域名

> 站点域名已配置为 `https://wyt420.github.io`；若使用自定义域名，请同步修改 `astro.config.mjs` 的 `site` 与 `public/robots.txt`。

## 后续建议

- 将 `src/config/resume.ts`、`src/config/projects.ts` 等配置为真实内容；关于页 GitHub 统计在构建时自动拉取（见 `src/lib/githubStats.ts`，需 `GITHUB_API_TOKEN` 本地 / CI 注入）
- 配置 Giscus 的 `PUBLIC_GISCUS_REPO_ID` / `PUBLIC_GISCUS_CATEGORY_ID`（本地 `.env` + GitHub Actions Variables）
- 根据个人品牌补齐 OG 图片与头像素材
