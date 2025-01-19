<script lang="ts" setup>
import TitleBox from "@/components/TitleBox.vue";
import GamerInfoBox from "@/components/GamerInfoBox.vue";
import PicShow from "@/components/PicBox.vue";
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

// 依次显示组件的函数
const showComponentsSequentially = async () => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(100); // 初始延迟
  showGamerInfo.value = true;

  await delay(300); // GamerInfo 显示后等待 300ms
  showPlatforms.value = true;

  await delay(300); // Platforms 显示后等待 300ms
  showPicShow.value = true;

  await delay(300); // PicShow 显示后等待 300ms
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
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <GamerInfoBox v-if="showGamerInfo" class="mb-5" />
          </transition>
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <PlatformsBox v-if="showPlatforms" class="platforms" />
          </transition>
        </div>
        <div class="right-panel">
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <PicShow v-if="showPicShow" class="pic-show" />
          </transition>
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
          >
            <div v-if="showChart" class="chart-container">
              <div class="chart-controls">
                <q-btn-toggle
                  v-model="chartPeriod"
                  :options="[
                    { label: t('title.byYear'), value: 'year' },
                    { label: t('title.byMonth'), value: 'month' }
                  ]"
                  class="q-mb-md"
                  size="sm"
                  text-color="white"
                  rounded
                />
              </div>
              <GameStartsChart :period="chartPeriod" />
            </div>
          </transition>
        </div>
      </div>

      <div
        id="game-list-box"
        v-else-if="pageSwitch === true"
        class="info-box !w-[80%]"
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
  @apply w-full h-full relative flex flex-col items-center gap-[20px] justify-center;
  @apply overflow-hidden;
  @apply lg:min-w-[1500px] lg:min-h-[720px];
}

.main-box {
  @apply absolute flex flex-col lg:flex-row  items-center h-full lg:h-[720px]  w-[90%] lg:w-[unset] my-5 min-h-[calc(100vh-20vh)] overflow-auto;
  @apply py-4 gap-5;

  .left-panel {
    @apply w-full lg:w-[400px] h-full max-w-[450px] lg:max-w-[unset];
  }
  .right-panel {
    @apply w-full lg:w-[668px] h-full;
  }
}

.content-box {
  @apply w-full mt-4 flex flex-col lg:flex-row gap-4 grow;
}

.platforms {
  @apply w-full lg:w-[unset];
}

.pic-show {
  @apply w-full h-[376px];
}

.chart-container {
  @apply mt-5 rounded-lg relative bg-black/10 backdrop-blur-md shadow-lg;
  animation-fill-mode: both !important;
}

.chart-controls {
  @apply flex justify-end mb-2 absolute z-10 right-4 bottom-0;
}
</style>
