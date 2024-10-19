import {
  type Router,
  createRouter,
  type RouteRecordRaw,
  type RouteComponent,
  createMemoryHistory,
  createWebHistory
} from "vue-router";

import { routes } from "./path";

export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
