<script setup lang="ts">
interface NavItem {
  href: string;
  label: string;
}

const props = defineProps<{ navItems: NavItem[]; currentPath: string }>();

function normalizePath(p: string) {
  return p.replace(/\/$/, "") || "/";
}

function isActive(href: string) {
  const h = normalizePath(href);
  const path = normalizePath(props.currentPath);
  if (h === "/") return path === "/" || path.startsWith("/page/");
  return path === h || path.startsWith(`${h}/`);
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-40 border-t border-surface-ink/10 bg-white/85 text-center text-xs shadow-[0_-8px_30px_rgba(22,93,255,0.08)] backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-slate-950/90 dark:shadow-[0_-8px_30px_rgba(0,0,0,0.35)]"
    aria-label="主导航"
  >
    <div class="mx-auto grid max-w-lg grid-cols-4">
      <a
        v-for="item in navItems"
        :key="item.href"
        :href="item.href"
        class="relative block py-3.5 font-medium transition"
        :class="
          isActive(item.href)
            ? 'text-brand dark:text-sky-400'
            : 'text-slate-600 hover:text-brand dark:text-slate-400 dark:hover:text-sky-300'
        "
      >
        <span
          v-if="isActive(item.href)"
          class="absolute inset-x-3 top-1 h-0.5 rounded-full bg-gradient-to-r from-brand to-sky-500"
        />
        {{ item.label }}
      </a>
    </div>
  </nav>
</template>
