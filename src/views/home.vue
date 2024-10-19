<script lang="ts" setup>
import TitleBox from "@/components/TitleBox.vue";
import GamerInfoBox from "@/components/GamerInfoBox.vue";
</script>
<template>
  <div class="w-full h-full relative">
    <TitleBox />
    <div
      id="main-box"
      class="my-[100px] mx-[50px] xl:mx-[250px] md:mx-[150px] flex flex-col items-center"
    >
      <GamerInfoBox />
    </div>
    <q-img
      id="bg"
      class="absolute top-0 left-0 w-full h-full z-[-10]"
      src="https://cdn.quasar.dev/img/parallax2.jpg"
    />
  </div>
</template>
<style lang="sass" />
