<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

type ThemeMode = "light" | "dark" | "system";
type FontSize = "sm" | "base" | "lg";

const mode = ref<ThemeMode>("system");
const fontSize = ref<FontSize>("base");

const themeOrder: ThemeMode[] = ["light", "system", "dark"];
const fontOrder: FontSize[] = ["sm", "base", "lg"];

const themeLabels: Record<ThemeMode, string> = {
  light: "亮",
  system: "系统",
  dark: "暗"
};

const fontLabels: Record<FontSize, string> = {
  sm: "小",
  base: "中",
  lg: "大"
};

const themeIndex = computed(() => Math.max(0, themeOrder.indexOf(mode.value)));
const fontIndex = computed(() => Math.max(0, fontOrder.indexOf(fontSize.value)));

const apply = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = mode.value === "dark" || (mode.value === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.fontSize = fontSize.value;
};

let mql: MediaQueryList | null = null;
const onSchemeChange = () => apply();

onMounted(() => {
  mode.value = (localStorage.getItem("theme-mode") as ThemeMode) ?? "system";
  fontSize.value = (localStorage.getItem("font-size") as FontSize) ?? "base";
  apply();
  mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", onSchemeChange);
});

onUnmounted(() => {
  mql?.removeEventListener("change", onSchemeChange);
});

watch([mode, fontSize], () => {
  localStorage.setItem("theme-mode", mode.value);
  localStorage.setItem("font-size", fontSize.value);
  apply();
});

function setMode(m: ThemeMode) {
  mode.value = m;
}

function setFont(f: FontSize) {
  fontSize.value = f;
}
</script>

<template>
  <div class="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3" role="toolbar" aria-label="外观设置">
    <div class="flex items-center gap-2">
      <span class="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:inline">主题</span>
      <div
        class="relative flex w-[9.75rem] shrink-0 rounded-full border border-slate-200/90 bg-slate-100/90 p-1 shadow-inner dark:border-white/10 dark:bg-slate-900/80"
        role="group"
        aria-label="主题模式"
      >
        <span
          class="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-gradient-to-r from-brand to-sky-500 shadow-md shadow-brand/25 transition-transform duration-300 ease-out will-change-transform dark:shadow-brand/30"
          :style="{ transform: `translateX(calc(${themeIndex} * 100%))` }"
        />
        <button
          v-for="m in themeOrder"
          :key="m"
          type="button"
          class="relative z-10 flex-1 rounded-full py-1.5 text-center text-[11px] font-semibold transition-colors md:text-xs"
          :class="
            mode === m
              ? 'text-white'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          "
          :aria-pressed="mode === m"
          @click="setMode(m)"
        >
          {{ themeLabels[m] }}
        </button>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <span class="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:inline">字号</span>
      <div
        class="relative flex w-[9.75rem] shrink-0 rounded-full border border-slate-200/90 bg-slate-100/90 p-1 shadow-inner dark:border-white/10 dark:bg-slate-900/80"
        role="group"
        aria-label="正文字号"
      >
        <span
          class="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem)/3)] rounded-full border border-brand/20 bg-white/95 shadow-sm transition-transform duration-300 ease-out will-change-transform dark:border-white/10 dark:bg-slate-700/95"
          :style="{ transform: `translateX(calc(${fontIndex} * 100%))` }"
        />
        <button
          v-for="f in fontOrder"
          :key="f"
          type="button"
          class="relative z-10 flex-1 rounded-full py-1.5 text-center text-[11px] font-semibold transition-colors md:text-xs"
          :class="
            fontSize === f
              ? 'text-brand dark:text-sky-300'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          "
          :aria-pressed="fontSize === f"
          @click="setFont(f)"
        >
          {{ fontLabels[f] }}
        </button>
      </div>
    </div>
  </div>
</template>
