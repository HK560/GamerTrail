import {
  type Router,
  createRouter,
  // type RouteRecordRaw,
  // type RouteComponent,
  // createMemoryHistory,
  createWebHistory
} from "vue-router";
import { LoadingBar } from "quasar";

import { routes } from "./path";
export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  next();
});

router.afterEach(() => {
  LoadingBar.stop();
});

export default router;
