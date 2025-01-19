<template>
  <div
    class="w-full h-[300px] bg-black/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg p-4 relative"
  >
    <q-carousel
      v-model="slide"
      animated
      swipeable
      infinite
      :height="carouselHeight"
      class="bg-transparent"
      navigation
      navigation-position="bottom"
      control-color="white"
      navigation-icon="remove"
      :navigation-offset="50"
      :navigation-icon-size="5"
    >
      <q-carousel-slide
        v-for="(page, pageIndex) in platformPages"
        :key="pageIndex"
        :name="pageIndex"
        class="p-0"
      >
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="(platform, index) in page"
            :key="index"
            :name="index"
            class="col-span-1"
            @click="copyUsernameAndJump(platform.accountName, platform.url)"
          >
            <div
              class="h-[5rem] flex-col flex-nowrap items-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer"
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
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { G_playerData } from "../configs/types";
import { isMobile } from "vue-device-detect";
import { t } from "@/plugins/i18n";

const $q = useQuasar();
const slide = ref(0);
const platforms = computed(() => G_playerData?.platforms || []);

// 固定每页显示6个平台（2列3行）
const itemsPerPage = computed(() => 6);

// 计算轮播高度
const carouselHeight = computed(() => {
  return "300px"; // 固定高度以适应3行内容
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
</script>
