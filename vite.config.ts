import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { codeInspectorPlugin } from "code-inspector-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      autoImportComponentCase: "combined",
      sassVariables: "src/styles/quasar-variables.sass"
    }),
    codeInspectorPlugin({
      bundler: "vite"
    })
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
