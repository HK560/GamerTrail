<script lang="ts" setup>
import GamerInfoBox from "@/components/GamerInfoBox.vue";
import GameScreenshotsBox from "@/components/GameScreenshotsBox.vue";
import PlatformsBox from "@/components/PlatformsBox.vue";
import GameStartsChart from "@/components/GameStartsChart.vue";
import { ref } from "vue";
import { t } from "@/plugins/i18n";

defineProps<{
  showGamerInfo: boolean;
  showPlatforms: boolean;
  showPicShow: boolean;
  showChart: boolean;
}>();

const chartPeriod = ref<"year" | "month">("year");
</script>

<template>
  <div class="main-box">
    <div class="left-panel">
      <GamerInfoBox v-if="showGamerInfo" class="mb-5" />
      <PlatformsBox v-if="showPlatforms" class="platforms" />
    </div>
    <div class="right-panel">
      <GameScreenshotsBox v-if="showPicShow" class="pic-show" />
      <div v-if="showChart" class="chart-container">
        <div class="chart-controls">
          <q-btn-toggle
            v-model="chartPeriod"
            :options="[
              { label: t('title.byYear'), value: 'year' },
              { label: t('title.byMonth'), value: 'month' }
            ]"
            class="q-mb-md"
            size="xs"
            text-color="white"
            rounded
          />
        </div>
        <GameStartsChart :period="chartPeriod" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.main-box {
  @apply flex flex-col lg:flex-row items-center w-[90%] lg:w-[unset];
  @apply gap-[1.25rem];

  .left-panel {
    @apply w-full lg:w-[25rem] max-w-[28.125rem] lg:max-w-[unset];
  }
  .right-panel {
    @apply w-full lg:w-[41.75rem];
  }
}

.platforms {
  @apply w-full lg:w-[unset];
}

.pic-show {
  @apply w-full relative shadow-lg rounded-xl;
  aspect-ratio: 16/9;

  @screen lg {
    height: 23.5rem;
  }
}

.pic-show :deep(.pic-content) {
  @apply w-full h-full;
}

.chart-container {
  @apply mt-[1.25rem] relative bg-black/10 backdrop-blur-md rounded-xl shadow-lg;
  animation-fill-mode: both !important;
  animation: fadeIn;
  animation-duration: 1s;
}

.chart-controls {
  @apply flex justify-end absolute z-10 right-4 bottom-[-0.5rem];
}

.timeline-container {
  @apply mt-[1.25rem];
}
</style>
