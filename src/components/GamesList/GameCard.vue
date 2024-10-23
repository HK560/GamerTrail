<script lang="ts" setup>
import bgImg from "@/assets/img/gameTest.jpg";
</script>
<template>
  <div
    class="grow object-cover max-h-full max-w-full aspect-[3/4] h-full overflow-hidden flex items-center justify-center rounded-md shadow-2xl relative"
  >
    <q-img
      loading="lazy"
      :src="bgImg"
      class="w-full h-full"
      style="will-change: transform"
    >
      <div class="absolute bottom-0 left-0 right-0 text-center text-sm">
        SUMMER POCKETS
      </div>
    </q-img>
  </div>
</template>
