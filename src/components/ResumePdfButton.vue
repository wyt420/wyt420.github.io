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
  <button class="rounded border px-3 py-1 text-sm" @click="exportPdf">导出 PDF</button>
</template>
