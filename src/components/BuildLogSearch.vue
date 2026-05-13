<script setup lang="ts">
import { computed, ref } from "vue";

interface Item {
  slug: string;
  title: string;
  date: string;
  problem: string;
}

const props = defineProps<{ items: Item[] }>();
const q = ref("");

const filtered = computed(() => {
  const keyword = q.value.trim().toLowerCase();
  if (!keyword) return props.items;
  return props.items.filter((item) =>
    `${item.title} ${item.problem}`.toLowerCase().includes(keyword)
  );
});
</script>

<template>
  <div class="space-y-4">
    <input
      v-model="q"
      type="search"
      placeholder="搜索建设日志关键词..."
      class="w-full rounded border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
    />
    <ul class="space-y-2 text-sm">
      <li v-for="item in filtered" :key="item.slug">
        <a :href="`#${item.slug}`" class="hover:text-sky-500">{{ item.title }} · {{ item.date }}</a>
      </li>
    </ul>
  </div>
</template>
