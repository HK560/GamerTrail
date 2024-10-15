import { createApp } from 'vue'
import App from './App.vue'

// plugins
import {i18n} from './plugins/i18n'

const app = createApp(App)

app.use(i18n)
app.mount('#app')