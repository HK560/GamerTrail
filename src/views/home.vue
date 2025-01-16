<script lang="ts" setup>
import TitleBox from "@/components/TitleBox.vue";
import GamerInfoBox from "@/components/GamerInfoBox.vue";
import PicShow from "@/components/PicBox.vue";
import PlatformsBox from "@/components/PlatformsBox.vue";
import bgImg from "@/assets/img/Avg_avg_ac9_8.jpg";
import { ref } from "vue";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";
import GamesListBox from "@/components/GamesList/GamesListBox.vue";

const pageSwitch = ref(false);
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
          <GamerInfoBox class="mb-5" />
          <PlatformsBox class="platforms" />
        </div>
        <div class="right-panel">
          <PicShow class="pic-show" />
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
</style>
