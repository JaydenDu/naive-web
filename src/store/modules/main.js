import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { generate, getRgbStr } from '@arco-design/color'

export const useMainStore = defineStore('main', {
  state: () => ({
    collapsed: false,
    isDark: useDark(),
    layout: 'normal',
    primaryColor: '#316C72',
    naiveThemeOverrides: {
      common: {
        primaryColor: '#316C72FF',
        primaryColorHover: '#316C72E3',
        primaryColorPressed: '#2B4C59FF',
        primaryColorSuppl: '#316C72E3',
      },
    },
  }),
  actions: {
    switchCollapsed() {
      this.collapsed = !this.collapsed
    },
    setCollapsed(b) {
      this.collapsed = b
    },
    toggleDark() {
      this.isDark = !this.isDark
    },
    setLayout(v) {
      this.layout = v
    },
    setPrimaryColor(color) {
      this.primaryColor = color
    },
  },
  persist: {
    paths: ['collapsed', 'layout', 'primaryColor', 'naiveThemeOverrides'],
    storage: sessionStorage,
  },
})
