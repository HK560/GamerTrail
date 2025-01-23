<script lang="ts" setup>
import TitleBox from "@/components/TitleBox.vue";
import GamerInfoBox from "@/components/GamerInfoBox.vue";
import GameScreenshotsBox from "@/components/GameScreenshotsBox.vue";
import PlatformsBox from "@/components/PlatformsBox.vue";
import GameStartsChart from "@/components/GameStartsChart.vue";
import bgImg from "@/assets/img/Avg_avg_ac9_8.jpg";
import { ref, onMounted } from "vue";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";
import GamesListBox from "@/components/GamesList/GamesListBox.vue";
import { t } from "@/plugins/i18n";

const pageSwitch = ref(false);
const chartPeriod = ref<"year" | "month">("year");

// 添加组件显示状态控制
const showGamerInfo = ref(false);
const showPlatforms = ref(false);
const showPicShow = ref(false);
const showChart = ref(false);

const showComponentsSequentially = async () => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  showGamerInfo.value = true;

  showPlatforms.value = true;

  showPicShow.value = true;

  showChart.value = true;
};

// 在组件挂载时开始显示
onMounted(() => {
  showComponentsSequentially();
});
</script>

<template>
  <div class="home-box">
    <!-- <TitleBox class="w-full absolute top-0 z-10" /> -->
    <Transition
      type="animation"
      enter-active-class="animate__animated"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div id="gamer-info-box" v-if="pageSwitch === false" class="main-box">
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

      <div
        id="game-list-box"
        v-else-if="pageSwitch === true"
        class="info-box !w-[80%] h-[100vh] overflow-hidden"
      >
        <GamesListBox />
      </div>
    </Transition>
    <q-btn
      label="click"
      class="absolute bottom-5 right-5"
      @click="pageSwitch = !pageSwitch"
    />
    <q-img
      id="bg"
      class="absolute top-0 left-0 w-full h-full z-[-10]"
      position="top"
      :src="bgImg"
    />
  </div>
</template>

<style lang="postcss" scoped>
.home-box {
  @apply w-full h-full relative flex flex-col items-center gap-[1.25rem] justify-center;
  @apply overflow-hidden;
  @apply lg:min-w-[1500px] lg:min-h-[720px];
}

.main-box {
  @apply absolute flex flex-col lg:flex-row  items-center h-full lg:h-[720px]  w-[90%] lg:w-[unset] my-[1.25rem] min-h-[calc(100vh-20vh)] overflow-auto;
  @apply py-4 gap-[1.25rem];

  .left-panel {
    @apply w-full lg:w-[25rem]  max-w-[28.125rem] lg:max-w-[unset];
  }
  .right-panel {
    @apply w-full lg:w-[41.75rem];
  }
}

.content-box {
  @apply w-full mt-4 flex flex-col lg:flex-row gap-4 grow;
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
  @apply mt-[1.25rem]  relative bg-black/10 backdrop-blur-md rounded-xl shadow-lg;
  animation-fill-mode: both !important;
  animation: fadeIn;
  animation-duration: 1s;
}

.chart-controls {
  @apply flex justify-end  absolute z-10 right-4 bottom-[-0.5rem];
}
</style>
