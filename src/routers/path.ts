import type { RouteRecordRaw } from "vue-router";

const HomeView_component = () => import("@/views/home.vue");
const Test_component = () => import("@/views/test/test.vue");
export const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: HomeView_component },
  { path: "/test", component: Test_component },
  {
    path: "/:pathMatch(.*)*", // 匹配所有未定义的路径
    redirect: "/"
    // component: HomeView_component // 跳转到 NotFound 组件
  }
];
