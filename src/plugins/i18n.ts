import { createI18n } from 'vue-i18n'
import zhCN from '../locales/zh-CN.json'
import en from '../locales/en.json'
export const i18n = createI18n({
    legacy: false, // you must specify 'legacy: false' option
    globalInjection: true,
    locale: 'zh', // set the initial locale
    fallbackLocale: 'zh', // set the fallback locale
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
  })
  