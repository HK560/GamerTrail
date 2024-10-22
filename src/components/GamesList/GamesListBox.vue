<script lang="ts" setup>
import GameCard from "./GameCard.vue";
</script>
<template>
  <div class="list-box">
    <GameCard class=""></GameCard>
    <GameCard></GameCard>
    <GameCard></GameCard>

    <GameCard></GameCard>

    <GameCard></GameCard>
  </div>
</template>
<style lang="postcss" scoped>
.list-box {
  @apply max-w-full aspect-[4/3] grid gap-2 grid-flow-col grid-rows-3 grid-cols-2 h-[80vh] overflow-hidden justify-center items-center;
  @apply lg:grid-cols-6;
}
</style>
