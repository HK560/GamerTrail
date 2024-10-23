<script lang="ts" setup>
import { ref } from "vue";
import GameCard from "./GameCard.vue";
const boxRoot = ref(null);
</script>
<template>
  <div ref="boxRoot" class="w-full h-full max-w-full">
    <div
      class="list-box px-4 overflow-y-scroll overflow-x-hidden custom-scrollbar"
    >
      <q-intersection
        v-for="i in 60"
        :key="i"
        transition="scale"
        class="h-[23vh] aspect-[3/4]"
        :root="boxRoot"
      >
        <GameCard class=""></GameCard>
      </q-intersection>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.list-box {
  @apply w-full h-full grid gap-5 grid-flow-row  grid-cols-2  items-center justify-items-center;
  @apply lg:grid-cols-6;
}
</style>
