<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    mode="out-in"
  >
    <div
      class="w-full bg-black/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg px-4 relative"
      style="animation: fadeIn; animation-duration: 2s"
    >
      <template v-if="!isLoading">
        <q-carousel
          v-model="slide"
          animated
          swipeable
          infinite
          :height="carouselHeight"
          class="bg-transparent"
          :navigation="false"
          control-color="white"
          :autoplay="1000000"
        >
          <q-carousel-slide
            v-for="(page, pageIndex) in platformPages"
            :key="pageIndex"
            :name="pageIndex"
            class="p-0"
          >
            <div class="w-full h-full flex justify-center items-center">
              <div class="w-full grid grid-cols-2 gap-2">
                <div
                  v-for="(platform, index) in page"
                  :key="index"
                  :name="index"
                  class="col-span-1 flex flex-col justify-center items-center"
                  :class="{ 'mb-0': index >= page.length - 2 }"
                  @click="
                    copyUsernameAndJump(platform.accountName, platform.url)
                  "
                >
                  <div
                    class="h-[5rem] w-full flex-col flex-nowrap items-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                  >
                    <div class="w-full flex items-center">
                      <template v-if="platform.icon">
                        <q-icon
                          :name="platform.icon"
                          size="1.5rem"
                          class="text-gray-300"
                        ></q-icon>
                      </template>
                      <template v-else-if="platform.iconSrc">
                        <img
                          :src="platform.iconSrc"
                          alt="icon"
                          class="w-6 h-6 text-gray-300"
                          style="fill: currentColor"
                        />
                      </template>
                      <span class="text-gray-300 text-[0.8rem] ml-2"
                        >{{ platform.name }}
                      </span>
                    </div>
                    <div class="w-full h-8 justify-center items-center">
                      <div
                        class="h-full text-white text-lg truncate text-center flex items-center justify-center overflow-hidden whitespace-nowrap text-ellipsis select-text"
                        :title="platform.accountName"
                      >
                        {{ platform.accountName }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
        <!-- 添加自定义导航按钮 -->
        <div
          class="absolute top-1/2 left-0 right-0 flex justify-between px-2 transform -translate-y-1/2 pointer-events-none"
        >
          <q-btn
            round
            flat
            dense
            color="white"
            icon="chevron_left"
            class="nav-btn !bg-black/30 pointer-events-auto"
            @click="prevSlide"
            size="sm"
          />
          <q-btn
            round
            flat
            dense
            color="white"
            icon="chevron_right"
            class="nav-btn !bg-black/30 pointer-events-auto"
            @click="nextSlide"
            size="sm"
          />
        </div>
      </template>
      <template v-else>
        <div class="w-full h-full flex justify-center items-center">
          <q-spinner color="primary" size="3em" />
        </div>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import {
  getPlayerData,
  initializeData,
  type PlayerData
} from "../configs/types";
import { isMobile } from "vue-device-detect";
import { t } from "@/plugins/i18n";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";

const $q = useQuasar();
const slide = ref(0);
const isLoading = ref(true);
const playerData = ref<PlayerData | null>(null);

// 加载数据
onMounted(async () => {
  isLoading.value = true;
  await initializeData();
  playerData.value = getPlayerData();
  isLoading.value = false;
});

const platforms = computed(() => playerData.value?.platforms || []);

// 固定每页显示6个平台（2列3行）
const itemsPerPage = computed(() => 6);

// 计算轮播高度
const carouselHeight = computed(() => {
  return "18.75rem"; // 300px转换为rem
});

// 将平台分组，每组6个
const platformPages = computed(() => {
  const pages = [];
  for (let i = 0; i < platforms.value.length; i += itemsPerPage.value) {
    pages.push(platforms.value.slice(i, i + itemsPerPage.value));
  }
  return pages;
});

// 复制用户名
function copyUsernameAndJump(username: string, url?: string | null): void {
  // 如果是桌面端才复制到剪贴板
  if (!isMobile) {
    navigator.clipboard
      .writeText(username)
      .then(() => {
        $q.notify({
          message: t("message.copySuccess"),
          color: "positive",
          position: "top",
          timeout: 1000
        });
      })
      .catch(() => {
        $q.notify({
          message: t("message.copyFail"),
          color: "negative",
          position: "top",
          timeout: 1000
        });
      });
  } else {
    $q.notify({
      message: t("message.username") + username,
      color: "info",
      position: "top",
      timeout: 1000
    });
  }

  // 如果有URL，弹出确认对话框
  if (url) {
    $q.notify({
      message: t("message.jumpConfirm"),
      color: "primary",
      actions: [
        {
          label: t("message.jump"),
          color: "white",
          handler: () => {
            // 用户确认后在新窗口打开
            window.open(url, "_blank", "noopener,noreferrer");
          }
        },
        {
          label: t("message.cancel"),
          color: "white",
          handler: () => {
            // 用户取消时不执行任何操作
          }
        }
      ]
    });
  }
}

// 添加切换幻灯片的方法
const nextSlide = () => {
  if (platformPages.value.length > 0) {
    slide.value = (slide.value + 1) % platformPages.value.length;
  }
};

const prevSlide = () => {
  if (platformPages.value.length > 0) {
    slide.value =
      slide.value === 0 ? platformPages.value.length - 1 : slide.value - 1;
  }
};
</script>

<style scoped>
.nav-btn {
  z-index: 2;
}
</style>
