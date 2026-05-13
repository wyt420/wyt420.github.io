<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps<{ slug: string }>();
const key = `post-like:${props.slug}`;
const liked = ref(false);
const count = ref(0);
const shareUrl = ref("");

const canLike = computed(() => !liked.value);
const twitterUrl = computed(() =>
  shareUrl.value
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}`
    : "#"
);
const linkedinUrl = computed(() =>
  shareUrl.value
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`
    : "#"
);

onMounted(() => {
  count.value = Number(localStorage.getItem(`${key}:count`) ?? "0");
  liked.value = localStorage.getItem(key) === "1";
  shareUrl.value = window.location.href;
});

const handleLike = () => {
  if (!canLike.value) return;
  liked.value = true;
  count.value += 1;
  localStorage.setItem(key, "1");
  localStorage.setItem(`${key}:count`, String(count.value));
};

const copyLink = async () => {
  if (!shareUrl.value) return;
  await navigator.clipboard.writeText(shareUrl.value);
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 text-sm">
    <button class="rounded border px-3 py-1" :disabled="!canLike" @click="handleLike">
      👍 点赞 {{ count }}
    </button>
    <button class="rounded border px-3 py-1" @click="copyLink">复制链接</button>
    <a class="rounded border px-3 py-1" :href="twitterUrl">
      Twitter
    </a>
    <a class="rounded border px-3 py-1" :href="linkedinUrl">
      LinkedIn
    </a>
  </div>
</template>
