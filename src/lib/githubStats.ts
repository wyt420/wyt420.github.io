/**
 * 关于页构建期拉取 GitHub 公开统计（Stars 汇总、公开仓库数、近 12 个月提交贡献）。
 * 超时显示「获取数据超时」，不按数字回退；其它失败仍显示「—」。
 */

const GH_ACCEPT = "application/vnd.github+json";

/** 单次 HTTP 超时（毫秒）；可用环境变量 GITHUB_FETCH_TIMEOUT_MS 覆盖 */
export function getGithubFetchTimeoutMs(): number {
  const raw = import.meta.env.GITHUB_FETCH_TIMEOUT_MS ?? "";
  const n = Number.parseInt(String(raw), 10);
  if (Number.isFinite(n) && n > 0) return n;
  return 15_000;
}

export class GithubFetchTimeoutError extends Error {
  override name = "GithubFetchTimeoutError";
  constructor() {
    super("GitHub request timeout");
  }
}

export function githubLoginFromUrl(profileUrl: string): string | null {
  try {
    const u = new URL(profileUrl);
    if (!u.hostname.endsWith("github.com")) return null;
    const seg = u.pathname.replace(/^\//, "").split("/").filter(Boolean)[0];
    return seg ? decodeURIComponent(seg) : null;
  } catch {
    return null;
  }
}

export type GithubStatResult =
  | { status: "ok"; value: number }
  | { status: "timeout" }
  | { status: "failed" }
  | { status: "skipped" };

export type GithubAboutStats = {
  totalStars: GithubStatResult;
  publicRepos: GithubStatResult;
  commitsLastYear: GithubStatResult;
};

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") throw new GithubFetchTimeoutError();
    throw e;
  } finally {
    clearTimeout(id);
  }
}

async function fetchJson<T>(url: string, token: string | undefined, timeoutMs: number): Promise<{ ok: boolean; data: T; status: number }> {
  const headers: Record<string, string> = { Accept: GH_ACCEPT, "User-Agent": "wyt420-blog-build" };
  if (token?.trim()) headers.Authorization = `Bearer ${token.trim()}`;
  const res = await fetchWithTimeout(url, { headers }, timeoutMs);
  const data = (await res.json()) as T;
  return { ok: res.ok, data, status: res.status };
}

async function fetchTotalStars(login: string, token: string | undefined, timeoutMs: number): Promise<number | null> {
  let page = 1;
  let total = 0;
  const maxPages = 30;
  while (page <= maxPages) {
    const url = `https://api.github.com/users/${encodeURIComponent(login)}/repos?per_page=100&page=${page}`;
    const { ok, data, status } = await fetchJson<Array<{ stargazers_count?: number }>>(url, token, timeoutMs);
    if (status === 403 || status === 404) return page === 1 ? null : total;
    if (!ok || !Array.isArray(data)) return page === 1 ? null : total;
    if (data.length === 0) break;
    for (const r of data) total += r.stargazers_count ?? 0;
    if (data.length < 100) break;
    page += 1;
  }
  return total;
}

async function fetchPublicRepos(login: string, token: string | undefined, timeoutMs: number): Promise<number | null> {
  const url = `https://api.github.com/users/${encodeURIComponent(login)}`;
  const { ok, data } = await fetchJson<{ public_repos?: number }>(url, token, timeoutMs);
  if (!ok || typeof data.public_repos !== "number") return null;
  return data.public_repos;
}

async function fetchCommitsLastYear(login: string, token: string, timeoutMs: number): Promise<number | null> {
  const to = new Date();
  const from = new Date(to);
  from.setUTCMonth(from.getUTCMonth() - 12);
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
        }
      }
    }
  `;
  const res = await fetchWithTimeout(
    "https://api.github.com/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
        "User-Agent": "wyt420-blog-build"
      },
      body: JSON.stringify({
        query,
        variables: {
          login,
          from: from.toISOString(),
          to: to.toISOString()
        }
      })
    },
    timeoutMs
  );
  const json = (await res.json()) as {
    errors?: unknown;
    data?: { user?: { contributionsCollection?: { totalCommitContributions?: number } } };
  };
  if (json.errors || !json.data?.user?.contributionsCollection) return null;
  const n = json.data.user.contributionsCollection.totalCommitContributions;
  return typeof n === "number" ? n : null;
}

function wrapNumberOrFailed(v: number | null): GithubStatResult {
  if (v === null) return { status: "failed" };
  return { status: "ok", value: v };
}

async function tryStat(fn: () => Promise<number | null>): Promise<GithubStatResult> {
  try {
    return wrapNumberOrFailed(await fn());
  } catch (e) {
    if (e instanceof GithubFetchTimeoutError) return { status: "timeout" };
    return { status: "failed" };
  }
}

/** 各字段独立；超时为 timeout，不与其他状态混用 */
export async function fetchGithubAboutStats(login: string, token?: string): Promise<GithubAboutStats> {
  const timeoutMs = getGithubFetchTimeoutMs();
  if (!login.trim()) {
    return {
      totalStars: { status: "failed" },
      publicRepos: { status: "failed" },
      commitsLastYear: { status: "failed" }
    };
  }

  const [totalStars, publicRepos] = await Promise.all([
    tryStat(() => fetchTotalStars(login, token, timeoutMs)),
    tryStat(() => fetchPublicRepos(login, token, timeoutMs))
  ]);

  let commitsLastYear: GithubStatResult;
  if (!token?.trim()) {
    commitsLastYear = { status: "skipped" };
  } else {
    commitsLastYear = await tryStat(() => fetchCommitsLastYear(login, token, timeoutMs));
  }

  return { totalStars, publicRepos, commitsLastYear };
}

export function formatStat(n: number): string {
  return n.toLocaleString("zh-CN");
}

/** 超时固定文案；不回退为数字占位 */
export function formatGithubStatResult(r: GithubStatResult): string {
  if (r.status === "ok") return formatStat(r.value);
  if (r.status === "timeout") return "获取数据超时";
  if (r.status === "skipped") return "—";
  return "—";
}

export function hintForGithubStat(label: "stars" | "repos" | "commits", r: GithubStatResult): string {
  if (r.status === "timeout") return "请求超过设定时间，请检查网络或调大 GITHUB_FETCH_TIMEOUT_MS 后重新构建";
  if (r.status === "ok") {
    if (label === "stars") return "本人公开仓库 star 合计";
    if (label === "repos") return "GitHub 个人资料 public_repos";
    return "与 GitHub Profile 贡献统计口径一致";
  }
  if (r.status === "skipped" && label === "commits") return "未配置 GITHUB_API_TOKEN 时跳过 GraphQL 提交统计";
  return "构建时未能拉取（网络、限流或接口错误）";
}
