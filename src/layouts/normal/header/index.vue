<template>
  <AppCard
    class="flex items-center justify-between px-12"
    border-b="1px solid light_border dark:dark_border"
  >
    <div class="flex flex-shrink-0 items-center">
      <img
        class="h-32"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
      <span class="mx-6 opacity-20">|</span>
    </div>
    <div>
      <div class="flex flex-shrink-0 items-center px-12 text-18">
        <i
          class="mr-16 cursor-pointer"
          :class="isDark ? 'i-fe:moon' : 'i-fe:sun'"
          @click="toggleDark"
        />
        <UserAvatar />
      </div>
    </div>
  </AppCard>
</template>

<script setup>
import { UserAvatar } from '@/layouts/components'
import { useDark, useToggle } from '@vueuse/core'
import { useMainStore } from '@/store'

const mainStore = useMainStore()
const isDark = useDark()
const toggleDark = () => {
  mainStore.toggleDark()
  useToggle(isDark)()
}
</script>
