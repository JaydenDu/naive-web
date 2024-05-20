<template>
  <n-config-provider
    class="h-full w-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="mainStore.isDark ? darkTheme : undefined"
    :theme-overrides="mainStore.naiveThemeOverrides"
  >
    <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
      <component :is="Layout">
        <component :is="Component" :key="curRoute.fullPath" />
      </component>
    </router-view>
  </n-config-provider>
</template>

<script setup>
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { useMainStore } from '@/store'

const route = useRoute()
const mainStore = useMainStore()

const layouts = new Map()
function getLayout(name) {
  // 利用map将加载过的layout缓存起来，防止重新加载layout导致页面闪烁
  if (layouts.get(name)) return layouts.get(name)
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`)))
  layouts.set(name, layout)
  return layout
}

const Layout = computed(() => {
  if (!route.matched?.length) return null
  return getLayout(route.meta?.layout || mainStore.layout)
})
</script>
