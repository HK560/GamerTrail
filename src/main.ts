import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/tailwind.css";
import "@/style.css";
import router from "./routers";
// plugins
import { i18n } from "./plugins/i18n";

const app = createApp(App);

app.use(i18n);
app.use(router);
app.mount("#app");
