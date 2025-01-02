<script lang="ts" setup>
import { ref } from "vue";
import { getGameData } from "../types";
const gameData = getGameData();
const game = ref(gameData[0]);
</script>

<template>
  <div></div>
</template>

<style scoped>
/* 组件样式 */
</style>
