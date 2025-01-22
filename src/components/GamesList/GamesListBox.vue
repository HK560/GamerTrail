<script lang="ts" setup>
import { ref } from "vue";
import GameCard from "./GameCard.vue";
import { G_gameData, ListGameCardConfig } from "../../configs/types";
const boxRoot = ref(null);

const gameAllData = G_gameData;
const showConfig: ListGameCardConfig = {
  showScore: true,
  showPlayedTime: true,
  showFavorite: true,
  showState: true
};
</script>
<template>
  <div ref="boxRoot" class="w-full h-full max-w-full">
    <div
      class="list-box py-4 overflow-y-auto overflow-x-hidden custom-scrollbar h-full"
    >
      <q-intersection
        v-for="game in gameAllData"
        :key="game.id"
        transition="scale"
        class="h-[23vh] aspect-[3/4] lg:h-[30vh] max-h-full max-w-full"
        :root="boxRoot"
      >
        <GameCard :gameData="game" :showConfig="showConfig"></GameCard>
      </q-intersection>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.list-box {
  @apply w-full h-full grid gap-[1.25rem] grid-flow-row  grid-cols-2  items-center justify-items-center;
  @apply lg:grid-cols-6;
}
</style>
