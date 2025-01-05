<template>
  <div class="w-full overflow-hidden">
    <q-carousel
      v-model="slide"
      animated
      infinite
      :autoplay="3000"
      transition-prev="slide-right"
      transition-next="slide-left"
      class="rounded-lg shadow-lg"
    >
      <q-carousel-slide
        v-for="(image, index) in images"
        :key="index"
        :name="index"
        class="relative"
      >
        <img
          :src="image.url"
          :alt="image.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
          <h3 class="text-white text-lg font-bold">{{ image.title }}</h3>
          <p class="text-gray-300 text-sm">{{ image.description }}</p>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface ImageData {
  url: string;
  title: string;
  description: string;
}

const slide = ref(0);
const images = ref<ImageData[]>([]);

onMounted(async () => {
  try {
    const response = await fetch("/data/pic.json");
    const data = await response.json();
    images.value = data.images;
  } catch (error) {
    console.error("Failed to load images:", error);
  }
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
