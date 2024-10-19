<script lang="ts" setup>
import { useQuasar, Platform } from "quasar";
import languages from "quasar/lang/index.json";
import "quasar/lang/de";
import { ref, watch } from "vue";
import { i18n } from "@/plugins/i18n";
import { testi18n } from "./data";
import { useRouter } from "vue-router";
import "@quasar/extras/animate/fadeIn.css";

const router = useRouter();
const appLanguages = languages.filter((lang) => ["zh-CN", "en-US"].includes(lang.isoName));

const langOptions = appLanguages.map((lang) => ({
  label: lang.nativeName,
  value: lang.isoName
}));
const $q = useQuasar();
const lang = ref($q.lang.isoName);

watch(lang, (val) => {
  // dynamic import, so loading on demand only
  console.log("lang", val);
  /* @vite-ignore */
  import("../../../node_modules/quasar/lang/" + val).then((lang) => {
    $q.lang.set(lang.default);
  });
  switch (val) {
    case "zh-CN":
      i18n.global.locale.value = "zh";
      localStorage.setItem("lang", "zh");
      break;
    case "en-US":
      i18n.global.locale.value = "en";
      localStorage.setItem("lang", "en");
      break;
    default:
      i18n.global.locale.value = "en";
      localStorage.setItem("lang", "en");
      break;
  }
  router.go(0);
  $q.loading.show({
    delay: 400 // ms
  });
});
console.debug(Platform);
const isShow = ref(true);
</script>
<template>
  <div>你好</div>
  <q-btn label="Do something" />
  <q-icon name="alarm" />
  <q-select
    v-model="lang"
    :options="langOptions"
    label="Quasar Language"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
  <div>{{ $q.lang.label.close }}</div>
  <div>vue中的i18n:{{ $t("message.hello") }}</div>
  <div>{{ testi18n }}</div>
  <div>{{ Platform }}</div>
  <transition
    :appear="true"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <!-- Wrapping only one DOM element, defined by QBtn -->
    <q-btn
      v-if="isShow"
      class="text-h1"
      color="secondary"
      icon="mail"
      label="Email"
      @click="isShow = !isShow"
    />
  </transition>
  <q-btn
    label="darkmode"
    @click="
      () => {
        $q.dark.toggle();
        $q.notify('Message');
      }
    "
  />
</template>
