<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

type ThemeMode = "light" | "dark" | "system";
type FontSize = "sm" | "base" | "lg";

const mode = ref<ThemeMode>("system");
const fontSize = ref<FontSize>("base");

const apply = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = mode.value === "dark" || (mode.value === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.fontSize = fontSize.value;
};

onMounted(() => {
  mode.value = (localStorage.getItem("theme-mode") as ThemeMode) ?? "system";
  fontSize.value = (localStorage.getItem("font-size") as FontSize) ?? "base";
  apply();
});

watch([mode, fontSize], () => {
  localStorage.setItem("theme-mode", mode.value);
  localStorage.setItem("font-size", fontSize.value);
  apply();
});
</script>

<template>
  <div class="flex items-center gap-2 text-xs">
    <select v-model="mode" class="rounded border border-slate-300 bg-transparent px-1 py-1 dark:border-slate-700">
      <option value="light">亮色</option>
      <option value="dark">暗色</option>
      <option value="system">跟随系统</option>
    </select>
    <select
      v-model="fontSize"
      class="rounded border border-slate-300 bg-transparent px-1 py-1 dark:border-slate-700"
    >
      <option value="sm">小</option>
      <option value="base">中</option>
      <option value="lg">大</option>
    </select>
  </div>
</template>
