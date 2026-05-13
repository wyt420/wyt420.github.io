<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  window.addEventListener("keydown", (event) => {
    if (event.key === "/") {
      event.preventDefault();
      const searchInput = document.querySelector<HTMLInputElement>("[data-global-search]");
      searchInput?.focus();
    }
  });
});
</script>

<template>
  <div class="hidden"></div>
</template>
