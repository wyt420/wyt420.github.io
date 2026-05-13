<script setup lang="ts">
import { computed, ref } from "vue";

interface Item {
  slug: string;
  title: string;
  date: string;
  problem: string;
  keywords?: string[];
}

const props = defineProps<{ items: Item[] }>();
const q = ref("");

const filtered = computed(() => {
  const keyword = q.value.trim().toLowerCase();
  if (!keyword) return props.items;
  return props.items.filter((item) => {
    const kw = (item.keywords ?? []).join(" ");
    return `${item.title} ${item.problem} ${kw}`.toLowerCase().includes(keyword);
  });
});
</script>

<template>
  <section
    class="rounded-3xl border border-surface-ink/10 bg-gradient-to-br from-white/95 via-slate-50/80 to-brand/[0.04] p-5 shadow-lg shadow-brand/5 backdrop-blur-md dark:border-white/10 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-brand-accent/[0.08] md:p-6"
  >
    <div class="mb-4 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-brand to-sky-500 shadow-sm shadow-brand/40" />
        <h2 class="text-sm font-bold uppercase tracking-[0.18em] text-surface-ink/70 dark:text-surface-muted/70">快速索引</h2>
      </div>
      <span class="text-xs tabular-nums text-surface-ink/45 dark:text-surface-muted/45">{{ filtered.length }} 条</span>
    </div>
    <input v-model="q" type="search" placeholder="按标题、问题描述或关键词过滤…" class="shell-input" />
    <ul class="mt-4 grid gap-2 sm:grid-cols-2">
      <li v-for="item in filtered" :key="item.slug">
        <a
          :href="`#${item.slug}`"
          class="group flex flex-col rounded-2xl border border-surface-ink/10 bg-white/70 p-3.5 transition hover:border-brand/35 hover:shadow-md hover:shadow-brand/10 dark:border-white/10 dark:bg-surface-ink/40 dark:hover:border-brand/40"
        >
          <span
            class="line-clamp-2 text-sm font-semibold text-surface-ink group-hover:text-brand dark:text-surface-muted dark:group-hover:text-sky-400"
          >{{ item.title }}</span>
          <time class="mt-1 text-xs tabular-nums text-surface-ink/50 dark:text-surface-muted/50">{{ item.date }}</time>
          <div v-if="item.keywords?.length" class="mt-2 flex flex-wrap gap-1">
            <span
              v-for="k in item.keywords.slice(0, 5)"
              :key="k"
              class="rounded-full border border-brand/15 bg-brand/8 px-2 py-0.5 text-[10px] font-medium text-brand dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300"
            >
              {{ k }}
            </span>
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>
