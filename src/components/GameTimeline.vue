<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { t } from "../plugins/i18n";
import dayjs from "dayjs";
import GameCard from "./GamesList/GameCard.vue";
import type { GameData, ListGameCardConfig } from "../configs/types";

const games = ref<GameData[]>([]);
const loading = ref(true);

const cardConfig: ListGameCardConfig = {
  showPlayedTime: true,
  showScore: true,
  showState: true,
  showFavorite: true
};

// 按月份分组的游戏数据
const groupedGames = computed(() => {
  const grouped = new Map<string, GameData[]>();

  games.value.forEach((game) => {
    if (typeof game.startTime === "number") {
      const monthKey = dayjs.unix(game.startTime).format("YYYY-MM");
      if (!grouped.has(monthKey)) {
        grouped.set(monthKey, []);
      }
      grouped.get(monthKey)?.push(game);
    }
  });

  // 转换为按时间排序的数组
  return Array.from(grouped.entries())
    .sort((a, b) => b[0].localeCompare(a[0])) // 降序排列
    .map(([month, games]) => ({
      month,
      monthDisplay: dayjs(month).format("YYYY年MM月"),
      games: games.sort((a, b) => {
        const timeA = a.startTime || 0;
        const timeB = b.startTime || 0;
        return timeB - timeA;
      })
    }));
});

// 加载游戏数据
const loadGameData = async () => {
  try {
    const response = await fetch("/data/gameData.json");
    const data = await response.json();
    games.value = data;
  } catch (error) {
    console.error("加载游戏数据失败:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadGameData();
});
</script>

<template>
  <div class="game-timeline-container">
    <q-timeline color="primary" v-if="!loading">
      <q-timeline-entry
        v-for="group in groupedGames"
        :key="group.month"
        :title="group.monthDisplay"
        icon="event"
      >
        <div class="games-grid">
          <div
            v-for="game in group.games"
            :key="game.id"
            class="game-card-wrapper"
          >
            <GameCard :gameData="game" :showConfig="cardConfig" />
          </div>
        </div>
      </q-timeline-entry>
    </q-timeline>
    <div v-else class="loading-container">
      <q-spinner color="primary" size="3em" />
      <p>加载中...</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.game-timeline-container {
  @apply w-full max-w-6xl mx-auto p-4;
}

.loading-container {
  @apply flex flex-col items-center justify-center min-h-[200px];
}

.games-grid {
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4;
}

.game-card-wrapper {
  @apply h-[200px] md:h-[240px] lg:h-[280px] xl:h-[320px];
}
</style>
