/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** 构建时拉取 GitHub 统计；GitHub Actions 可由 workflow 注入 GITHUB_TOKEN */
  readonly GITHUB_API_TOKEN?: string;
  /** 单次 GitHub REST/GraphQL 请求超时（毫秒），可选 */
  readonly GITHUB_FETCH_TIMEOUT_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
