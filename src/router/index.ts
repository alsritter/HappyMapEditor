import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/mainCanvas/MainCanvas.vue')
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
