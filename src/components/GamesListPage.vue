<script lang="ts" setup>
import GamesListBox from "@/components/GamesList/GamesListBox.vue";
import GameTimeline from "@/components/GameTimeline.vue";
import { t } from "@/plugins/i18n";
import { ref } from "vue";

const viewMode = ref<"list" | "timeline">("list");
</script>

<template>
  <div class="games-page-container">
    <div class="view-controls mb-4">
      <q-btn-toggle
        v-model="viewMode"
        :options="[
          { label: t('title.listView'), value: 'list' },
          { label: t('title.timelineView'), value: 'timeline' }
        ]"
        class="q-mb-md"
        size="md"
        text-color="white"
        color="primary"
        rounded
      />
    </div>
    <div class="content-container">
      <GamesListBox v-if="viewMode === 'list'" />
      <GameTimeline v-else />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.games-page-container {
  @apply w-[80%] h-[90vh] flex flex-col relative;
}

.view-controls {
  @apply flex justify-end sticky top-0 z-10 py-2;
}

.content-container {
  @apply flex-1 overflow-y-auto overflow-x-hidden;
  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE Edge */
}

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
