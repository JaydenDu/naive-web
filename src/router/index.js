import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
import { basicRoutes } from './basic-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app) {
  app.use(router)
  setupRouterGuards(router)
}
