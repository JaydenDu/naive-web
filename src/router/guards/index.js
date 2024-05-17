import { createPermissionGuard } from './permission-guard'
import { createTabGuard } from './tab-guard'

export function setupRouterGuards(router) {
  createPermissionGuard(router)
  createTabGuard(router)
}
