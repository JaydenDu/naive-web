import { createPermissionGuard } from './express.js'
import { createTabGuard } from './tab-guard'

export function setupRouterGuards(router) {
  createPermissionGuard(router)
  createTabGuard(router)
}
