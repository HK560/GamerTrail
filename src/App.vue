<script setup lang="ts">
import { ref } from "vue";
import { getGameData, getPlayerData } from "./configs/types";

const games = ref(getGameData());
const players = ref(getPlayerData());
</script>

<template>
  <div class="w-dvw h-dvh select-none">
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* 全局禁止选择 */
* {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
