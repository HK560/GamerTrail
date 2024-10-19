import {
  type Router,
  createRouter,
  type RouteRecordRaw,
  type RouteComponent,
  createMemoryHistory
} from "vue-router";

import { routes } from "./path";

export const router: Router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;
