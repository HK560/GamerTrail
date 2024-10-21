<script lang="ts" setup>
import avatar from "@/assets/img/avatar_hk560.jpg";
import { ref } from "vue";
import { t } from "@/plugins/i18n";
const desc = ref("与光同尘");
const avatar_src = ref("images/gamer/avatar_hk560.jpg");

const statusList = ref([
  {
    icon: "mdi-gamepad-variant-outline",
    label: t("title.totalPlayed"),
    value: "256"
  },
  {
    icon: "schedule",
    label: t("title.totalPlayTime"),
    value: "8000h"
  },
  {
    icon: "devices",
    label: t("title.mainPlatform"),
    value: "PC"
  }
]);
</script>
<template>
  <div
    class="w-full flex flex-col lg:flex-row no-wrap lg:!gap-4 justify-center items-center"
  >
    <div class="m-panel lg:!w-[30%]">
      <div
        class="flex flex-col lg:flex-row !flex-nowrap mx-[2%] justify-center items-center lg:justify-normal w-full"
      >
        <div id="avatar" class="hover:scale-[110%] duration-100 cursor-default">
          <q-avatar size="128px" class="shadow-lg">
            <q-img :src="avatar_src" />
          </q-avatar>
        </div>
        <div id="name-and-description" class="m-desc-box">
          <div class="text-2xl font-bold">HK560</div>
          <q-scroll-area class="mt-2 h-10 lg:h-20">
            <p
              class="text-[0.8rem] text-gray-300 text-nowrap whitespace-pre-wrap lg:text-left"
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
    <div class="m-panel">
      <div class="m-gamer-base-status">
        <div v-for="item in statusList" class="m-child">
          <q-icon :name="item.icon" size="3rem" class="text-gray-300"></q-icon>
          <div class="flex flex-col flex-nowrap text-left">
            <span class="ml-3 text-[1rem] text-gray-300">{{ item.label }}</span>
            <span class="ml-3 text-[1.5rem]">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.m-panel {
  @apply w-full bg-black/10 rounded-xl  backdrop-blur-md border border-white/20 shadow-lg p-6 py-[20px] max-w-[450px] flex items-center justify-center;
  animation: fadeIn;
  animation-duration: 2s;
  @apply mb-5 last:mb-0;
  @apply lg:h-[180px] lg:max-w-none lg:mb-0 lg:justify-start lg:w-[unset];
  @apply first:bg-white/0 first:backdrop-blur-none first:border-none first:shadow-none;
}

.m-desc-box {
  @apply h-full py-2 text-white grow text-center flex-col flex-nowrap w-full;
  @apply lg:pl-[20px] lg:grow lg:w-[250px] lg:text-left lg:h-[128px];
}

.m-gamer-base-status {
  @apply flex flex-col flex-nowrap  overflow-hidden items-start;
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
