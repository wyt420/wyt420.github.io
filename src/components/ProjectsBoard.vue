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

const kindFilter = ref<"all" | Project["kind"]>("all");
const techFilter = ref("all");
const stats = ref<Record<string, { stars: number; forks: number }>>({});

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
  <div class="space-y-4">
    <div class="flex flex-wrap gap-2 text-sm">
      <button class="rounded border px-3 py-1" @click="kindFilter = 'all'">全部类型</button>
      <button class="rounded border px-3 py-1" @click="kindFilter = 'personal'">个人项目</button>
      <button class="rounded border px-3 py-1" @click="kindFilter = 'company'">公司项目</button>
      <button class="rounded border px-3 py-1" @click="kindFilter = 'opensource'">开源贡献</button>
      <select v-model="techFilter" class="rounded border px-2 py-1 dark:bg-slate-900">
        <option v-for="tech in techOptions" :key="tech" :value="tech">{{ tech }}</option>
      </select>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="project in ordered"
        :key="project.slug"
        class="space-y-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800"
      >
        <img :src="project.image" :alt="project.name" loading="lazy" class="h-40 w-full rounded object-cover" />
        <div class="flex items-center gap-2">
          <h3 class="font-semibold">{{ project.name }}</h3>
          <span v-if="project.pinned" class="rounded bg-rose-500 px-2 py-0.5 text-xs text-white">置顶</span>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-300">{{ project.description }}</p>
        <div class="flex flex-wrap gap-2 text-xs">
          <span v-for="tech in project.tech" :key="tech" class="rounded bg-slate-100 px-2 py-1 dark:bg-slate-900">
            {{ tech }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2 text-xs">
          <a v-if="project.repo" :href="project.repo" target="_blank" @mouseenter="loadStats(project)">GitHub</a>
          <a v-if="project.demo" :href="project.demo" target="_blank">Demo</a>
          <span v-if="stats[project.slug]">⭐ {{ stats[project.slug].stars }} / Fork {{ stats[project.slug].forks }}</span>
        </div>
      </article>
    </div>
  </div>
</template>
