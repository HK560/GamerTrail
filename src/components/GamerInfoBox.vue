<script lang="ts" setup>
import avatar from "@/assets/img/avatar_hk560.jpg";
</script>
<template>
  <div class="w-full flex flex-col lg:flex-row no-wrap gap-[5%]">
    <div class="m-panel basis-[35%] max-w-[500px]">
      <div class="flex flex-row mx-[2%] lg:mx-[10%] justify-center">
        <div
          id="avatar"
          class="hover:scale-[110%] duration-100 cursor-default"
        >
          <q-avatar size="128px">
            <q-img :src="avatar" />
          </q-avatar>
        </div>
        <div
          id="name-and-description"
          class="m-desc-box box-center"
        >
          <div class="text-2xl font-bold">HK560</div>
          <div class="mt-3 text-lg text-sm text-gray-300">与光同尘</div>
        </div>
      </div>
    </div>
    <div class="m-panel grow"></div>
  </div>
</template>

<style lang="postcss" scoped>
.m-panel {
  @apply bg-black/30 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6 py-[50px];
}

.m-desc-box {
  @apply h-full mx-8 py-2 text-white grow lg:!text-right text-center;
}
</style>
