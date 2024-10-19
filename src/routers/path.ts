import { type RouteRecordRaw } from "vue-router";

const HomeView_component = () => import("@/views/home/index.vue");

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: HomeView_component }
  //   { path: '/about', component: AboutView },
];
