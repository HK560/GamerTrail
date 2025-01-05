<script lang="ts" setup>
import TitleBox from "@/components/TitleBox.vue";
import GamerInfoBox from "@/components/GamerInfoBox.vue";
import PicShow from "@/components/PicBox.vue";
// const bgImg = () => import('@/assets/img/89579007_p0.jpg');
import bgImg from "@/assets/img/Avg_avg_ac9_8.jpg";
import { ref } from "vue";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";
// import 'animate.css';
import GamesListBox from "@/components/GamesList/GamesListBox.vue";

const pageSwitch = ref(false);
</script>
<template>
  <div class="home-box">
    <TitleBox class="w-full absolute top-0 z-10" />
    <Transition
      type="animation"
      enter-active-class="animate__animated  "
      leave-active-class="animate__animated animate__fadeOutUp  "
    >
      <div id="gamer-info-box" v-if="pageSwitch === false" class="info-box">
        <GamerInfoBox />
        <PicShow class="mt-4" />
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

.info-box {
  @apply absolute flex flex-col items-center h-[80vh] w-[60%] lg:w-[1440px] my-5 min-h-[calc(100vh-20vh)];
}
</style>
