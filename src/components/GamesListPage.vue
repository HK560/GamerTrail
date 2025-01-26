<script lang="ts" setup>
import GamesListBox from "@/components/GamesList/GamesListBox.vue";
import { t } from "@/plugins/i18n";
</script>

<template>
  <div class="info-box !w-[80%] min-h-[100vh] overflow-hidden relative">
    <GamesListBox />
  </div>
</template>

<style lang="postcss" scoped>
.back-indicator {
  @apply fixed right-8 bottom-8 flex flex-col items-center;
  animation: bounce 2s infinite;
  z-index: 100;
}

.back-arrow {
  @apply w-8 h-8 border-t-4 border-l-4 border-white transform -rotate-45 mb-3;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}

.back-text {
  @apply text-white text-sm font-medium;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-30px) translateX(-50%);
  }
  60% {
    transform: translateY(-15px) translateX(-50%);
  }
}
</style>
