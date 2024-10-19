import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/tailwind.css";
import "@/style.css";
import router from "./routers";
// plugins
import { i18n } from "./plugins/i18n";
import { Quasar } from "quasar";
import { quasarConfig } from "./plugins/quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import "quasar/src/css/index.sass";

const app = createApp(App);
app.use(Quasar, quasarConfig);
app.use(i18n);
app.use(router);
app.mount("#app");
