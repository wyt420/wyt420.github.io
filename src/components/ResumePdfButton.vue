<script setup lang="ts">
const exportPdf = () => {
  window.print();
};
</script>

<template>
  <button
    type="button"
    class="rounded-full border border-brand/30 bg-gradient-to-r from-brand to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:shadow-lg hover:shadow-brand/35"
    @click="exportPdf"
  >
    打印 / 导出 PDF
  </button>
</template>
