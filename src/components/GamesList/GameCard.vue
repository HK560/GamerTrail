<script lang="ts" setup>
import bgImg from "@/assets/img/gameTest.jpg";
import { type GameData } from "../../configs/types";
import { type ListGameCardConfig } from "../../configs/types";
import { computed } from "vue";
const props = defineProps<{
  gameData: GameData;
  showConfig: ListGameCardConfig;
}>();
const getGameStatusIcons = computed((): string => {
  if (props.gameData.isFinished) {
    return "mdi-check-outline";
  }
  if (props.gameData.isPlaying) {
    return "mdi-controller-classic";
  }
  return "mdi-pause";
});
const getGameStatusColor = computed((): string => {
  if (props.gameData.isFinished) {
    return "text-[#FFD700] ";
  }
  if (props.gameData.isPlaying) {
    return "text-[#00FF00]";
  }
  return "text-blue";
});
</script>
<template>
  <div
    class="hover:scale-110 duration-200 grow object-cover max-h-full max-w-full aspect-[3/4] h-full overflow-hidden flex items-center justify-center rounded-md shadow-2xl relative"
  >
    <q-img
      loading="lazy"
      :src="gameData.imgUrl || bgImg"
      class="w-[99%] h-[100%]"
      style="will-change: transform"
    >
    </q-img>
    <div
      class="absolute top-0 left-0 right-0 bottom-0 opacity-100 hover:opacity-100 transition-opacity duration-200 overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 right-0 text-center text-sm bg-gradient-to-t from-transparent to-[#2c2c2c] p-6 rounded flex items-center justify-center"
      >
        <div class="mb-1 absolute flex items-center justify-center gap-x-3">
          <div
            class="flex items-center justify-center gap-x-1"
            v-if="showConfig.showScore && gameData.score"
          >
            <q-icon class="text-white" name="mdi-star" />
            <span class="text-white">{{ gameData.score }}</span>
          </div>

          <div
            class="flex items-center justify-center gap-x-1"
            v-if="showConfig.showPlayedTime && gameData.playedTime"
          >
            <q-icon class="text-white" name="mdi-clock" />
            <span class="text-white">{{ gameData.playedTime }}H</span>
          </div>
          <div
            class="flex items-center justify-center gap-x-1"
            v-if="showConfig.showState"
          >
            <q-icon
              :class="getGameStatusColor"
              size="1rem"
              :name="getGameStatusIcons"
            />
            {{
              gameData.isFinished
                ? "Finished"
                : gameData.isPlaying
                  ? "Playing"
                  : "Paused"
            }}
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 text-center text-sm h-4 bg-gradient-to-t from-[#2c2c2c] to-transparent p-6 rounded flex items-center justify-center"
      >
        <div class="mb-1 absolute text-shadow-xl shadow-black">
          {{ gameData.name }}
        </div>
      </div>
    </div>
  </div>
</template>
