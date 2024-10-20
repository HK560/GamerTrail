import { Loading, LoadingBar, Notify } from "quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import "quasar/src/css/index.sass";
import en from "quasar/lang/en-US";
import zh from "quasar/lang/zh-CN";
// returns a string
// Assumes your root component is App.vue
// and placed in same folder as main.js

export const quasarConfig = {
  plugins: { Loading, LoadingBar, Notify }, // import Quasar plugins and add here
  lang: localStorage.getItem("lang") === "zh" ? zh : en,
  config: {
    dark: true,
    loading: {},
    loadingBar: {},
    notify: {}
    //   brand: {
    //     // primary: '#e46262',
    //     // ... or all other brand colors
    //   }
    //   // notify: {...}, // default set of options for Notify Quasar plugin
    //   // loading: {...}, // default set of options for Loading Quasar plugin
    //   // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    //   // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
};
