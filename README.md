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
- `GITHUB_API_TOKEN`: GitHub API Token（可选，用于提高项目页 API 限流阈值）

## 部署到 GitHub Pages

首次在仓库中启用：**Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**（不要选「Deploy from a branch」的 `gh-pages`，本工作流使用官方 Pages 工件部署）。

仓库已提供 `.github/workflows/deploy.yml`：

- 推送到 `main` 自动构建并部署到 GitHub Pages
- 支持 Pages 环境 URL 回填
- 支持 `public/CNAME` 自定义域名

> 使用前请把 `astro.config.mjs` 中 `site` 改成你的真实域名（如 `https://<user>.github.io`）。

## 后续建议

- 替换示例数据（个人信息、项目列表、社交链接）
- 在 `GiscusComments` 组件中填入真实 `repo-id/category-id`
- 根据个人品牌补齐 OG 图片与头像素材
