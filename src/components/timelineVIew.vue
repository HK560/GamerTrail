<script lang="ts" setup>
import { ref } from "vue";

// 组件的数据和逻辑
const count = ref(0);
</script>

<template>
  <div class="timeline-container"></div>
</template>

<style lang="postcss" scoped>
.timeline-container {
  @apply w-full bg-black/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg p-4;
  animation: fadeIn;
  animation-duration: 1s;
}

.content {
  @apply mt-4;
}
</style>
