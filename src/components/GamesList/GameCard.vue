<script lang="ts" setup>
import bgImg from "@/assets/img/gameTest.jpg";
</script>
<template>
  <div
    class="aspect-[3/4] overflow-hidden flex items-center justify-center rounded-md shadow-lg"
  >
    <q-img
      loading="lazy"
      :src="bgImg"
      fit="cover"
      class="w-full h-full"
      position="50% 50%"
    />
  </div>
</template>
