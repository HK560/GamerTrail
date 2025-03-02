<script lang="ts" setup>
import TitleBox from "@/components/TitleBox.vue";
import MainInfoPage from "@/components/MainInfoPage.vue";
import GamesListPage from "@/components/GamesListPage.vue";
import bgImg from "@/assets/img/Avg_avg_ac9_8.jpg";
import { ref, onMounted } from "vue";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";
import "@quasar/extras/animate/slideInUp.css";
import "@quasar/extras/animate/slideOutUp.css";
import "@quasar/extras/animate/slideInDown.css";
import "@quasar/extras/animate/slideOutDown.css";
import { t } from "@/plugins/i18n";

const pageSwitch = ref(false);

// 添加组件显示状态控制
const showGamerInfo = ref(false);
const showPlatforms = ref(false);
const showPicShow = ref(false);
const showChart = ref(false);

const showComponentsSequentially = async () => {
  showGamerInfo.value = true;
  showPlatforms.value = true;
  showPicShow.value = true;
  showChart.value = true;
};

// 处理页面切换
const handlePageSwitch = (toFirst: boolean = false) => {
  pageSwitch.value = !toFirst;
};

// 在组件挂载时开始显示
onMounted(() => {
  showComponentsSequentially();
});
</script>

<template>
  <div class="home-box">
    <TransitionGroup
      type="animation"
      tag="div"
      class="w-full h-full relative"
      :enter-active-class="`animate__animated animate__${!pageSwitch ? 'slideInDown' : 'slideInUp'} animate__slower`"
      :leave-active-class="`animate__animated   animate__${!pageSwitch ? 'slideOutDown' : 'slideOutUp'}   animate__slower`"
    >
      <div v-if="pageSwitch === false" :key="'main'" class="page-container">
        <MainInfoPage
          class="w-[90%] lg:w-auto"
          :show-gamer-info="showGamerInfo"
          :show-platforms="showPlatforms"
          :show-pic-show="showPicShow"
          :show-chart="showChart"
        />
      </div>

      <div
        v-else-if="pageSwitch === true"
        :key="'games'"
        class="page-container"
      >
        <GamesListPage
          class="w-[90%] lg:w-auto"
          @back="handlePageSwitch(true)"
        />
      </div>
    </TransitionGroup>

    <!-- 向下滑动指示器 -->
    <Transition name="fade" appear>
      <div
        v-show="!pageSwitch"
        class="scroll-indicator cursor-pointer hover:scale-110 transition-transform pointer-events-auto"
        @click="handlePageSwitch()"
      >
        <q-icon
          name="keyboard_arrow_down"
          size="2rem"
          class="text-white scroll-icon"
        />
        <div class="scroll-text">{{ t("scroll.toSeeMore") }}</div>
      </div>
    </Transition>

    <!-- 向上滑动指示器 -->
    <Transition name="fade" appear>
      <div
        v-show="pageSwitch"
        class="scroll-indicator-up cursor-pointer hover:scale-110 transition-transform"
        @click="handlePageSwitch(true)"
      >
        <q-icon
          name="keyboard_arrow_up"
          size="2rem"
          class="text-white scroll-icon"
        />
        <div class="scroll-text">{{ t("scroll.backToTop") }}</div>
      </div>
    </Transition>

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
  @apply w-full h-full relative flex flex-col items-center gap-[1.25rem] justify-center overflow-hidden;
  @apply lg:min-w-[1500px];
}

.scroll-indicator,
.scroll-indicator-up {
  @apply absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center;
  z-index: 100;
}

.scroll-indicator {
  @apply bottom-4 w-20 h-12;
  animation: bounce 2s infinite;
}

.scroll-indicator-up {
  @apply top-4 w-20 h-12;
  animation: bounceUp 2s infinite;
}

.scroll-icon {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}

.scroll-text {
  @apply text-white text-sm font-medium;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* Vue 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* 修改页面切换动画 */

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

@keyframes bounceUp {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(30px) translateX(-50%);
  }
  60% {
    transform: translateY(15px) translateX(-50%);
  }
}

.page-container {
  @apply absolute top-0 left-0 w-full h-full flex justify-center overflow-auto py-10;
}
</style>
