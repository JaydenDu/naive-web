import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { generate, getRgbStr } from '@arco-design/color'

export const useAppStore = defineStore('app', {
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
    setThemeColor(color = this.primaryColor, isDark = this.isDark) {
      const colors = generate(color, {
        list: true,
        dark: isDark,
      })
      document.body.style.setProperty('--primary-color', getRgbStr(colors[5]))
      this.naiveThemeOverrides.common = Object.assign(this.naiveThemeOverrides.common || {}, {
        primaryColor: colors[5],
        primaryColorHover: colors[4],
        primaryColorSuppl: colors[4],
        primaryColorPressed: colors[6],
      })
    },
  },
  persist: {
    paths: ['collapsed', 'layout', 'primaryColor', 'naiveThemeOverrides'],
    storage: sessionStorage,
  },
})
