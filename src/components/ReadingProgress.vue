<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const progress = ref(0);
let onScroll: () => void;

onMounted(() => {
  onScroll = () => {
    const top = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = Math.min(100, Math.max(0, (top / Math.max(height, 1)) * 100));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div class="fixed left-0 right-0 top-0 z-50 h-1 bg-transparent">
    <div class="h-full bg-sky-500 transition-all" :style="{ width: `${progress}%` }"></div>
  </div>
</template>
