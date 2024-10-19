<script lang="ts" setup></script>
<template>
  <div class="bg-black/30 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6 w-full">
    <!-- <h2 class="text-2xl font-bold mb-4 text-white">毛玻璃效果卡片</h2>
    <p class="text-white/80">这是一个使用 Tailwind CSS 实现的毛玻璃效果示例。</p> -->
    <div class="flex-row items-center justify-center">
      <div
        id="avatar"
        class=""
      >
        <q-avatar size="128px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </div>
      <div
        id="name-and-description"
        class="w-[300px] h-full"
      />
    </div>
  </div>
</template>
