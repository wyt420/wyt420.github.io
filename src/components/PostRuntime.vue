<script setup lang="ts">
import { onMounted } from "vue";
import mermaid from "mermaid";

const props = defineProps<{ prev?: string; next?: string }>();

onMounted(() => {
  mermaid.initialize({ startOnLoad: true, theme: document.documentElement.classList.contains("dark") ? "dark" : "default" });

  document.querySelectorAll("pre").forEach((pre) => {
    if (pre.querySelector(".copy-code-btn")) return;
    const btn = document.createElement("button");
    btn.textContent = "复制";
    btn.className = "copy-code-btn absolute right-2 top-2 rounded bg-slate-800 px-2 py-1 text-xs text-white";
    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.textContent ?? "";
      await navigator.clipboard.writeText(code);
      btn.textContent = "已复制";
      setTimeout(() => (btn.textContent = "复制"), 1000);
    });
    pre.appendChild(btn);
  });

  document.querySelectorAll("article img").forEach((img) => {
    img.classList.add("cursor-zoom-in");
    img.addEventListener("click", () => window.open((img as HTMLImageElement).src, "_blank"));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "t") window.scrollTo({ top: 0, behavior: "smooth" });
    if (event.key === "b") location.href = "/";
    if (event.key === "ArrowLeft" && props.prev) location.href = props.prev;
    if (event.key === "ArrowRight" && props.next) location.href = props.next;
  });

  const backTop = document.createElement("button");
  backTop.textContent = "回到顶部";
  backTop.className =
    "fixed bottom-20 right-4 z-40 hidden rounded bg-sky-500 px-3 py-2 text-xs text-white md:bottom-6";
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(backTop);
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("hidden", window.scrollY < window.innerHeight);
  });
});
</script>

<template>
  <div class="hidden"></div>
</template>
