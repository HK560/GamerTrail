<script lang="ts" setup>
import { ref } from "vue";
const title = ref("hello");
</script>
<template>
  <q-card class="h-[48px] justify-center flex flex-col align-middle relative">
    <div class="row">
      <div
        id="site-title"
        class="w-[54px] h-full ml-5 flex justify-center items-center"
      >
        logo
      </div>
      <div class="ml-2 box-center text-h5">{{ title }}</div>
      <div class="absolute top-[50%] translate-y-[-50%] right-5 box-center">right</div>
    </div>
  </q-card>
</template>
