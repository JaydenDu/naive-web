<template>
  <n-config-provider
    class="h-full w-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="appStore.isDark ? darkTheme : undefined"
    :theme-overrides="appStore.naiveThemeOverrides"
  >
    <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
      <component :is="Layout">
        <KeepAlive :include="keepAliveNames">
          <component :is="Component" v-if="!tabStore.reloading" :key="curRoute.fullPath" />
        </KeepAlive>
      </component>
    </router-view>
  </n-config-provider>
</template>

<script setup>
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { useAppStore, useTabStore } from '@/store'

const layouts = new Map()
function getLayout(name) {
  // 利用map将加载过的layout缓存起来，防止重新加载layout导致页面闪烁
  if (layouts.get(name)) return layouts.get(name)
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`)))
  layouts.set(name, layout)
  return layout
}

const route = useRoute()
const appStore = useAppStore()
if (appStore.layout === 'default') appStore.setLayout('')
const Layout = computed(() => {
  if (!route.matched?.length) return null
  return getLayout(route.meta?.layout || appStore.layout)
})

const tabStore = useTabStore()
const keepAliveNames = computed(() => {
  return tabStore.tabs.filter((item) => item.keepAlive).map((item) => item.name)
})

watchEffect(() => {
  appStore.setThemeColor(appStore.primaryColor, appStore.isDark)
})
</script>
