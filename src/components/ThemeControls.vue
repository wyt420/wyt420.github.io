<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

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
  <details class="group relative" aria-label="外观设置">
    <summary class="cursor-pointer list-none border-b border-transparent py-1.5 text-sm text-surface-ink/60 transition hover:border-surface-ink/30 hover:text-surface-ink dark:text-white/60 dark:hover:text-white">
      显示设置
    </summary>
    <div class="absolute right-0 top-full z-50 mt-3 w-64 border border-stone-300 bg-[#fbf8f2] p-5 shadow-[0_18px_50px_rgba(39,30,25,.14)] dark:border-white/15 dark:bg-[#211e1b]">
      <p class="mb-3 text-[10px] font-semibold tracking-[0.18em] text-surface-ink/45 dark:text-white/45">主题</p>
      <div class="grid grid-cols-3 border border-stone-300 dark:border-white/15" role="group" aria-label="主题模式">
        <button
          v-for="m in themeOrder"
          :key="m"
          type="button"
          class="border-r border-stone-300 px-2 py-2 text-xs transition-colors last:border-r-0 dark:border-white/15"
          :class="
            mode === m
              ? 'bg-brand text-white'
              : 'text-surface-ink/60 hover:bg-stone-100 dark:text-white/60 dark:hover:bg-white/5'
          "
          :aria-pressed="mode === m"
          @click="setMode(m)"
        >
          {{ themeLabels[m] }}
        </button>
      </div>
      <p class="mb-3 mt-5 text-[10px] font-semibold tracking-[0.18em] text-surface-ink/45 dark:text-white/45">字号</p>
      <div class="grid grid-cols-3 border border-stone-300 dark:border-white/15" role="group" aria-label="正文字号">
        <button
          v-for="f in fontOrder"
          :key="f"
          type="button"
          class="border-r border-stone-300 px-2 py-2 text-xs transition-colors last:border-r-0 dark:border-white/15"
          :class="
            fontSize === f
              ? 'bg-brand text-white'
              : 'text-surface-ink/60 hover:bg-stone-100 dark:text-white/60 dark:hover:bg-white/5'
          "
          :aria-pressed="fontSize === f"
          @click="setFont(f)"
        >
          {{ fontLabels[f] }}
        </button>
      </div>
    </div>
  </details>
</template>
