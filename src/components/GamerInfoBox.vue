<script lang="ts" setup>
import avatar from "@/assets/img/avatar_hk560.jpg";
import "animate.css";
import { ref } from "vue";
const desc = ref("与光同尘");
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
            <q-img :src="avatar" />
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
    <div class="m-panel grow"></div>
  </div>
</template>

<style lang="postcss" scoped>
.m-panel {
  @apply w-full bg-white/10 rounded-xl  !backdrop-blur-md border-white/20 shadow-lg p-6 py-[20px] max-w-[450px];
  animation: fadeIn; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
  @apply mb-5 last:mb-0;
  @apply lg:h-[170px] lg:max-w-none lg:mb-0;
}

.m-desc-box {
  @apply h-full py-2 text-white grow text-center flex-col flex-nowrap w-full;
  @apply lg:pl-[20px] lg:grow lg:w-[250px] lg:text-left lg:h-[128px];
}
</style>
<style lang="css" scoped>
.m-panel {
  backdrop-filter: blur(24px);
}
</style>
