<script setup lang="ts">
interface NavItem {
  href: string;
  label: string;
}

defineProps<{ navItems: NavItem[] }>();
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-slate-200 bg-white/95 text-center text-xs md:hidden dark:border-slate-800 dark:bg-slate-950/95"
  >
    <a
      v-for="item in navItems"
      :key="item.href"
      :href="item.href"
      class="py-3 transition hover:text-sky-500"
    >
      {{ item.label }}
    </a>
  </nav>
</template>
