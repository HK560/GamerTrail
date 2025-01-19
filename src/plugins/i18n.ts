import { createI18n } from "vue-i18n";
import zhCN from "../locales/zh-CN.json";
import en from "../locales/en.json";

// 获取浏览器语言设置
const getBrowserLanguage = () => {
  const browserLang = navigator.language.toLowerCase();
  // 如果浏览器语言以 zh 开头，返回 zh，否则返回 en
  return browserLang.startsWith("zh") ? "zh" : "en";
};

// 优先使用本地存储的语言设置，如果没有则使用浏览器语言
const defaultLang = localStorage.getItem("lang") || getBrowserLanguage();

export const i18n = createI18n({
  legacy: false, // you must specify 'legacy: false' option
  globalInjection: true,
  locale: defaultLang, // set the initial locale
  fallbackLocale: "zh", // set the fallback locale
  messages: {
    en: {
      // your english translations here
      ...en
    },
    zh: {
      // your chinese translations here
      ...zhCN
    }
  }
});

export const t = (data: any): any => i18n.global.t(data);
