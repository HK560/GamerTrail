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
        class="game-card-container"
        :root="boxRoot"
      >
        <GameCard
          :gameData="game"
          :showConfig="showConfig"
          class="f-card"
        ></GameCard>
      </q-intersection>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.list-box {
  @apply w-full grid gap-8 grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  items-start justify-items-center;
}

.game-card-container {
  @apply w-full aspect-[3/4] relative;
}

.f-card {
  @apply w-full h-full;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

* {
  -ms-overflow-style: none; /* IE Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
