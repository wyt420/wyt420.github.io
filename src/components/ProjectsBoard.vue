<script setup lang="ts">
import { computed, ref } from "vue";

interface Project {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  kind: "personal" | "company" | "opensource";
  pinned?: boolean;
  image: string;
}

const props = defineProps<{ projects: Project[] }>();
const kindFilter = ref<"all" | Project["kind"]>("all");
const kinds = [["all", "全部项目"], ["company", "企业项目"], ["personal", "个人实践"], ["opensource", "开源实践"]] as const;
const ordered = computed(() => [...props.projects]
  .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)))
  .filter((project) => kindFilter.value === "all" || project.kind === kindFilter.value));

function projectUrl(slug: string) {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}projects/${slug}/`.replace(/\/{2,}/g, "/");
}

function assetUrl(src: string) {
  const base = import.meta.env.BASE_URL ?? "/";
  return src.startsWith("http") ? src : `${base}${src.replace(/^\//, "")}`;
}

function projectPreview(image: string) {
  return image.replace(/\.png$/i, "-home.webp");
}
</script>

<template>
  <div>
    <div class="mb-10 flex flex-wrap gap-x-7 gap-y-2 border-b border-stone-300 pb-4 dark:border-white/15" role="group" aria-label="项目类型">
      <button v-for="[value, label] in kinds" :key="value" type="button" class="border-b pb-1 text-sm transition" :class="kindFilter === value ? 'border-brand text-brand' : 'border-transparent text-surface-ink/50 hover:text-surface-ink dark:text-white/50 dark:hover:text-white'" @click="kindFilter = value">{{ label }}</button>
    </div>
    <div class="grid gap-x-7 gap-y-12 md:grid-cols-2">
      <article v-for="(project, index) in ordered" :key="project.slug" class="group relative">
        <a :href="projectUrl(project.slug)" class="absolute inset-0 z-10" :aria-label="`查看项目：${project.name}`" />
        <div class="aspect-[16/9] overflow-hidden bg-stone-200 dark:bg-stone-800">
          <img
            :src="assetUrl(projectPreview(project.image))"
            alt=""
            width="1400"
            height="788"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="mt-4 grid grid-cols-[2.5rem_1fr] gap-3 border-t border-stone-300 pt-4 dark:border-white/15">
          <span class="font-serif text-sm text-brand">{{ String(index + 1).padStart(2, "0") }}</span>
          <div>
            <h2 class="font-serif text-2xl font-medium leading-tight transition group-hover:text-brand">{{ project.name }}</h2>
            <p class="mt-3 line-clamp-3 text-sm leading-6 text-surface-ink/58 dark:text-white/55">{{ project.description }}</p>
            <p class="mt-4 text-[11px] tracking-wide text-surface-ink/40 dark:text-white/35">{{ project.tech.slice(0, 3).join(" · ") }}</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
