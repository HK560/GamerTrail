<script lang="ts" setup>
import TitleBox from "@/components/TitleBox.vue";
import GamerInfoBox from "@/components/GamerInfoBox.vue";
// const bgImg = () => import("@/assets/img/89579007_p0.jpg");
import bgImg from "@/assets/img/Avg_avg_ac9_8.jpg";
</script>
<template>
  <div class="w-full h-full relative flex flex-col items-center gap-[20px]">
    <TitleBox class="w-full" />
    <div
      id="main-box"
      class="flex flex-col items-center lg:w-[1440px] my-5"
    >
      <GamerInfoBox />
    </div>
    <q-img
      id="bg"
      class="absolute top-0 left-0 w-full h-full z-[-10]"
      position="top"
      :src="bgImg"
    />
  </div>
</template>
<style lang="sass" />
