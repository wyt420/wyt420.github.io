<script setup lang="ts">
import { jsPDF } from "jspdf";

const exportPdf = () => {
  const root = document.getElementById("resume-content");
  if (!root) return;

  const doc = new jsPDF("p", "pt", "a4");
  const text = root.innerText.replaceAll(/\n{3,}/g, "\n\n");
  const lines = doc.splitTextToSize(text, 520);
  doc.text(lines, 40, 50);
  doc.save("resume.pdf");
};
</script>

<template>
  <button
    type="button"
    class="rounded-full border border-brand/30 bg-gradient-to-r from-brand to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:shadow-lg hover:shadow-brand/35"
    @click="exportPdf"
  >
    导出 PDF
  </button>
</template>
