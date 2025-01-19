<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, watchEffect } from "vue";
import { t } from "../plugins/i18n";
import {
  getTotalPlayedTime,
  gettotalPlayed,
  getPlayerData
} from "../configs/types";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";
// 分别定义头像、昵称和bio的当前索引
const avatarIndex = ref(0);
const nicknameIndex = ref(0);
const bioIndex = ref(0);
// 定义不同的轮换间隔时间
const avatarIntervalTime = 5000; // 头像5秒
const nicknameIntervalTime = 7000; // 昵称7秒
const bioIntervalTime = 8000; // bio 10秒
let avatarIntervalId: number | null = null;
let nicknameIntervalId: number | null = null;
let bioIntervalId: number | null = null;

// 玩家数据
const playerData = ref<ReturnType<typeof getPlayerData>>(null);
const isLoading = ref(true);

// 启动头像轮换
const startAvatarRotation = () => {
  avatarIntervalId = setInterval(() => {
    avatarIndex.value =
      (avatarIndex.value + 1) % (playerData.value?.avatar?.length || 1);
  }, avatarIntervalTime);
};

// 启动昵称轮换
const startNicknameRotation = () => {
  nicknameIntervalId = setInterval(() => {
    nicknameIndex.value =
      (nicknameIndex.value + 1) % (playerData.value?.nickname?.length || 1);
  }, nicknameIntervalTime);
};

// 启动bio轮换
const startBioRotation = () => {
  bioIntervalId = setInterval(() => {
    bioIndex.value =
      (bioIndex.value + 1) % (playerData.value?.bio?.length || 1);
  }, bioIntervalTime);
};

// 停止所有轮换
const stopAllRotation = () => {
  if (avatarIntervalId) clearInterval(avatarIntervalId);
  if (nicknameIntervalId) clearInterval(nicknameIntervalId);
  if (bioIntervalId) clearInterval(bioIntervalId);
  avatarIntervalId = null;
  nicknameIntervalId = null;
  bioIntervalId = null;
};

// 状态列表
const statusList = computed(() => [
  {
    icon: "mdi-gamepad-variant-outline",
    label: t("title.totalPlayed"),
    value: gettotalPlayed()
  },
  {
    icon: "schedule",
    label: t("title.totalPlayTime"),
    value: `${getTotalPlayedTime()}H`
  },
  {
    icon: "devices",
    label: t("title.mainPlatform"),
    value: "PC"
  },
  {
    icon: "mdi-check-outline",
    label: t("title.gameFinished"),
    value: "PC"
  }
]);

// 使用 watchEffect 监听数据变化
watchEffect(() => {
  const data = getPlayerData();
  if (data) {
    playerData.value = data;
    startAvatarRotation();
    startNicknameRotation();
    startBioRotation();
    isLoading.value = false;
  }
});

onUnmounted(() => {
  stopAllRotation();
});
</script>

<template>
  <div
    v-if="!isLoading"
    class="w-full flex flex-col no-wrap lg:!gap-4 justify-center items-center"
  >
    <div class="m-panel w-full">
      <div
        class="flex flex-col lg:flex-row !flex-nowrap mx-[2%] justify-center items-center lg:justify-normal w-full"
      >
        <div id="avatar" class="hover:scale-[110%] duration-100 cursor-default">
          <q-avatar
            size="128px"
            class="shadow-lg cursor-pointer"
            @click="
              avatarIndex =
                (avatarIndex + 1) % (playerData?.avatar?.length || 1)
            "
          >
            <transition
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
              mode="out-in"
            >
              <q-img
                :key="avatarIndex"
                :src="playerData?.avatar?.[avatarIndex]"
              />
            </transition>
          </q-avatar>
        </div>
        <div id="name-and-description" class="m-desc-box">
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
          >
            <div
              :key="nicknameIndex"
              class="text-2xl font-bold cursor-pointer"
              @click="
                nicknameIndex =
                  (nicknameIndex + 1) % (playerData?.nickname?.length || 1)
              "
            >
              {{ playerData?.nickname?.[nicknameIndex] }}
            </div>
          </transition>
          <q-scroll-area class="mt-2 h-5 lg:h-20">
            <transition
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
              mode="out-in"
            >
              <p
                :key="bioIndex"
                class="text-[0.8rem] text-gray-300 text-nowrap whitespace-pre-wrap lg:text-left cursor-pointer"
                @click="
                  bioIndex = (bioIndex + 1) % (playerData?.bio?.length || 1)
                "
              >
                {{ playerData?.bio?.[bioIndex] }}
              </p>
            </transition>
          </q-scroll-area>
        </div>
      </div>
    </div>
    <div class="m-panel">
      <div class="m-gamer-base-status">
        <div v-for="item in statusList" class="m-child">
          <q-icon :name="item.icon" size="3rem" class="text-gray-300"></q-icon>
          <div class="flex flex-col flex-nowrap text-left">
            <span class="ml-3 text-[0.7rem] text-gray-300">{{
              item.label
            }}</span>
            <span class="ml-3 text-[1.5rem]">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full flex justify-center items-center h-64">
    <q-spinner color="primary" size="3em" />
  </div>
</template>

<style lang="postcss" scoped>
.m-panel {
  @apply w-full bg-black/10 rounded-xl  backdrop-blur-md border border-white/20 shadow-lg p-6 py-[20px] flex items-center justify-center;
  animation: fadeIn;
  animation-duration: 2s;
  @apply mb-5 last:mb-0;
  @apply lg:h-[180px] lg:max-w-none lg:mb-0 lg:justify-start;
  @apply first:bg-white/0 first:backdrop-blur-none first:border-none first:shadow-none;
}

.m-desc-box {
  @apply h-full py-2 text-white grow text-center flex-col flex-nowrap w-full;
  @apply lg:pl-[20px] lg:grow lg:w-[250px] lg:text-left lg:h-[128px];
}

.m-gamer-base-status {
  @apply grid grid-cols-2 gap-4 overflow-hidden items-start;
  @apply lg:flex-row;
}

.m-gamer-base-status .m-child {
  @apply flex flex-row flex-nowrap items-center justify-start mx-auto my-auto w-full;
  @apply lg:mb-0 lg:mr-5 lg:last:mr-0 lg:translate-x-0;
}

.m-gamer-base-status .m-child .q-icon {
  @apply min-w-[3rem];
}

.m-gamer-base-status .m-child .flex-col {
  @apply flex justify-center;
}

.m-gamer-base-status .m-child .flex-col span {
  @apply leading-tight;
}

.m-gamer-base-status .m-child .flex-col span:last-child {
  @apply font-medium;
}
</style>
<style lang="css" scoped>
.m-panel {
  backdrop-filter: blur(24px);
}
</style>
