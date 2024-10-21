<script lang="ts" setup>
import avatar from "@/assets/img/avatar_hk560.jpg";
import { ref } from "vue";
const desc = ref("与光同尘");
const avatar_src = ref("images/gamer/avatar_hk560.jpg");
</script>
<template>
  <div
    class="w-full flex flex-col lg:flex-row no-wrap !gap-[5%] justify-center items-center"
  >
    <div class="m-panel lg:basis-[35%]">
      <div
        class="flex flex-col lg:flex-row !flex-nowrap mx-[2%] justify-center items-center lg:justify-normal w-full"
      >
        <div id="avatar" class="hover:scale-[110%] duration-100 cursor-default">
          <q-avatar size="128px">
            <q-img :src="avatar_src" />
          </q-avatar>
        </div>
        <div id="name-and-description" class="m-desc-box">
          <div class="text-2xl font-bold">HK560</div>
          <q-scroll-area class="mt-2 h-[40px] lg:h-[80px]">
            <p
              class="text-[12px] text-gray-300 text-nowrap whitespace-pre-wrap lg:text-left"
            >
              {{ desc }}
            </p>
          </q-scroll-area>
          <!-- <div class="mt-2 text-sm text-gray-300 overflow-hidden">
            The issue "Replace
            ⏎········"error",⏎········{·allowBitwiseExpressions:·true·}⏎······
            with "error",·{·allowBitwiseExpressions:·true·}" is a suggestion to
            simplify the code by removing unnecessary line breaks and
            indentation. In the given code snippet, the line:
          </div> -->
        </div>
      </div>
    </div>
    <div class="m-panel grow">
      <div class="m-gamer-base-status">
        <div class="m-child">
          <q-icon
            name="mdi-gamepad-variant-outline"
            size="64px"
            class="text-gray-300"
          ></q-icon>
          <div class="flex flex-col flex-nowrap text-left">
            <span class="ml-2 text-md text-gray-300">Total Played</span>
            <span class="ml-2 text-3xl">256</span>
          </div>
        </div>
        <div class="m-child">
          <q-icon name="schedule" size="64px" class="text-gray-300"></q-icon>
          <div class="flex flex-col flex-nowrap text-left">
            <span class="ml-2 text-md text-gray-300">Total Played Time</span>
            <span class="ml-2 text-3xl">8000h</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.m-panel {
  @apply w-full bg-black/10 rounded-xl  !backdrop-blur-md border border-white/20 shadow-lg p-6 py-[20px] max-w-[450px] flex items-center justify-center;
  animation: fadeIn; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
  @apply mb-5 last:mb-0;
  @apply lg:h-[180px] lg:max-w-none lg:mb-0 lg:justify-start;
}

.m-desc-box {
  @apply h-full py-2 text-white grow text-center flex-col flex-nowrap w-full;
  @apply lg:pl-[20px] lg:grow lg:w-[250px] lg:text-left lg:h-[128px];
}

.m-gamer-base-status {
  @apply flex flex-col flex-nowrap m-5 overflow-hidden items-start;
  @apply lg:flex-row;
  .m-child {
    @apply flex flex-row flex-nowrap items-center justify-center;
    @apply mb-5 last:mb-0;
    @apply lg:mb-0 lg:mr-5 lg:last:mr-0 lg:translate-x-0;
  }
}
</style>
<style lang="css" scoped>
.m-panel {
  backdrop-filter: blur(24px);
}
</style>
