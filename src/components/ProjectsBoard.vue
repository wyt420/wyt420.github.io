<script setup lang="ts">
import { computed, ref } from "vue";

interface Project {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  kind: "personal" | "company" | "opensource";
  pinned?: boolean;
  repo?: string;
  demo?: string;
  image: string;
}

const props = defineProps<{ projects: Project[]; githubToken?: string }>();

function projectDetailUrl(slug: string) {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}projects/${slug}/`.replace(/\/{2,}/g, "/");
}

/** 与 Astro base 一致，避免子路径部署时 /public 资源 404 */
function publicAssetUrl(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = import.meta.env.BASE_URL ?? "/";
  const path = src.startsWith("/") ? src.slice(1) : src;
  return `${base}${path}`;
}

const kindFilter = ref<"all" | Project["kind"]>("all");
const techFilter = ref("all");
const stats = ref<Record<string, { stars: number; forks: number }>>({});

const kindOrder = ["all", "personal", "company", "opensource"] as const;
const kindLabels: Record<(typeof kindOrder)[number], string> = {
  all: "全部",
  personal: "个人",
  company: "公司",
  opensource: "开源"
};

const kindIndex = computed(() => Math.max(0, kindOrder.indexOf(kindFilter.value)));

function setKind(k: (typeof kindOrder)[number]) {
  kindFilter.value = k;
}

const techOptions = computed(() => {
  const set = new Set<string>();
  props.projects.forEach((p) => p.tech.forEach((item) => set.add(item)));
  return ["all", ...set];
});

const ordered = computed(() => {
  const pinned = props.projects.filter((p) => p.pinned);
  const rest = props.projects.filter((p) => !p.pinned);
  const list = [...pinned, ...rest];
  return list.filter((item) => {
    if (kindFilter.value !== "all" && item.kind !== kindFilter.value) return false;
    if (techFilter.value !== "all" && !item.tech.includes(techFilter.value)) return false;
    return true;
  });
});

const loadStats = async (project: Project) => {
  if (!project.repo || stats.value[project.slug]) return;
  try {
    const [owner, repo] = new URL(project.repo).pathname.split("/").filter(Boolean);
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: props.githubToken ? { Authorization: `Bearer ${props.githubToken}` } : {}
    });
    if (!response.ok) return;
    const json = await response.json();
    stats.value[project.slug] = {
      stars: json.stargazers_count ?? 0,
      forks: json.forks_count ?? 0
    };
  } catch {
    // ignore API failures and rate limits
  }
};
</script>

<template>
  <div class="space-y-5">
    <div class="space-y-3">
      <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">项目类型</p>
      <div
        class="relative flex w-full max-w-md rounded-full border border-slate-200/90 bg-slate-100/90 p-1 shadow-inner dark:border-white/10 dark:bg-slate-900/80"
        role="group"
      >
        <span
          class="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem)/4)] rounded-full bg-gradient-to-r from-brand to-sky-500 shadow-md shadow-brand/20 transition-transform duration-300 ease-out dark:shadow-brand/25"
          :style="{ transform: `translateX(calc(${kindIndex} * 100%))` }"
        />
        <button
          v-for="k in kindOrder"
          :key="k"
          type="button"
          class="relative z-10 flex-1 rounded-full py-2 text-center text-[11px] font-semibold transition-colors sm:text-xs"
          :class="
            kindFilter === k
              ? 'text-white'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          "
          :aria-pressed="kindFilter === k"
          @click="setKind(k)"
        >
          {{ kindLabels[k] }}
        </button>
      </div>
    </div>

    <div class="space-y-2">
      <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">技术栈（横向滑动）</p>
      <div class="-mx-1 flex gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          v-for="tech in techOptions"
          :key="tech"
          type="button"
          class="shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition"
          :class="
            techFilter === tech
              ? 'border-brand/40 bg-brand/12 text-brand dark:border-sky-400/50 dark:bg-brand/25 dark:text-sky-300'
              : 'border-slate-200/80 bg-white/80 text-slate-600 hover:border-brand/25 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300'
          "
          @click="techFilter = tech"
        >
          {{ tech === "all" ? "全部" : tech }}
        </button>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="project in ordered"
        :key="project.slug"
        class="group relative cursor-pointer space-y-3 overflow-hidden rounded-2xl border border-surface-ink/10 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition hover:border-brand/25 hover:shadow-lg hover:shadow-brand/5 dark:border-white/10 dark:bg-surface-ink/50 dark:hover:border-brand/30"
      >
        <a
          :href="projectDetailUrl(project.slug)"
          class="absolute inset-0 z-0 rounded-2xl"
          :aria-label="`查看项目详情：${project.name}`"
        />
        <img
          :src="publicAssetUrl(project.image)"
          :alt="project.name"
          loading="lazy"
          class="pointer-events-none relative z-[1] h-40 w-full rounded object-cover"
        />
        <div class="pointer-events-none relative z-[1] flex items-center gap-2">
          <h3 class="font-semibold transition group-hover:text-brand dark:group-hover:text-sky-400">{{ project.name }}</h3>
          <span v-if="project.pinned" class="rounded bg-rose-500 px-2 py-0.5 text-xs text-white">置顶</span>
        </div>
        <p class="pointer-events-none relative z-[1] line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
          {{ project.description }}
        </p>
        <div class="pointer-events-none relative z-[1] flex flex-wrap gap-2 text-xs">
          <span v-for="tech in project.tech" :key="tech" class="rounded bg-slate-100 px-2 py-1 dark:bg-slate-900">
            {{ tech }}
          </span>
        </div>
        <div class="pointer-events-none relative z-[1] flex flex-wrap items-center gap-3 text-xs">
          <span class="font-medium text-brand dark:text-sky-400">查看详情 →</span>
          <a
            v-if="project.repo"
            :href="project.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="pointer-events-auto relative z-[2] text-slate-600 underline-offset-2 hover:text-brand hover:underline dark:text-slate-300"
            @mouseenter="loadStats(project)"
            @click.stop
          >
            GitHub
          </a>
          <a
            v-if="project.demo"
            :href="project.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="pointer-events-auto relative z-[2] text-slate-600 underline-offset-2 hover:text-brand hover:underline dark:text-slate-300"
            @click.stop
          >
            Demo
          </a>
          <span v-if="stats[project.slug]" class="pointer-events-none text-slate-500 dark:text-slate-400">
            ⭐ {{ stats[project.slug].stars }} / Fork {{ stats[project.slug].forks }}
          </span>
        </div>
      </article>
    </div>
  </div>
</template>
