<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    mode="out-in"
  >
    <div class="w-full aspect-[16:9] overflow-hidden relative">
      <q-carousel
        v-model="slide"
        animated
        infinite
        height="100%"
        :fullscreen="false"
        :swipeable="true"
        :autoplay="500000"
        transition-prev="slide-right"
        transition-next="slide-left"
        class="rounded-lg shadow-lg w-full h-full bg-gray-900"
      >
        <q-carousel-slide
          v-for="(image, index) in images"
          :key="index"
          :name="index"
          class="h-full flex justify-center items-center bg-gray-800"
        >
          <div
            class="relative w-full h-full flex justify-center items-center overflow-hidden"
          >
            <img
              :src="image.url"
              :alt="image.title"
              class="min-w-full min-h-full object-cover"
              :style="{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }"
            />
            <div
              class="absolute bottom-0 left-0 right-0 bg-black/50 p-4 transition-opacity duration-300 h-[20%] flex flex-row justify-start items-center lg:!flex-col lg:justify-start lg:items-start"
            >
              <span class="text-white text-sm font-bold lg:text-base lg:w-full">
                {{ image.title }}
              </span>
              <span class="ml-2 text-gray-300 text-xs lg:w-full">
                {{ image.description }}
              </span>
            </div>
            <!-- 添加导航按钮 -->
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div
        class="absolute top-1/2 left-0 right-0 flex justify-between px-2 transform -translate-y-1/2"
      >
        <q-btn
          round
          flat
          dense
          color="white"
          icon="chevron_left"
          class="nav-btn !bg-black/30"
          @click="prevSlide"
          size="sm"
        />
        <q-btn
          round
          flat
          dense
          color="white"
          icon="chevron_right"
          class="nav-btn !bg-black/30"
          @click="nextSlide"
          size="sm"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";

interface ImageData {
  url: string;
  title: string;
  description: string;
}

const slide = ref(0);
const images = ref<ImageData[]>([]);

const nextSlide = () => {
  if (images.value.length > 0) {
    slide.value = (slide.value + 1) % images.value.length;
  }
};

const prevSlide = () => {
  if (images.value.length > 0) {
    slide.value = slide.value === 0 ? images.value.length - 1 : slide.value - 1;
  }
};

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
/* 添加背景图片样式 */
.bg-gray-900 {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFhMWExYTtzdG9wLW9wYWNpdHk6MSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFmMWYxZjtzdG9wLW9wYWNpdHk6MSIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==");
  background-size: cover;
}

/* 确保图片始终占满父容器 */
img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>
