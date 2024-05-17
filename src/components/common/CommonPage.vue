<template>
  <main class="h-full flex flex-col flex-1 overflow-hidden bg-#f5f6fb dark:bg-#121212">
    <transition name="fade-slide" mode="out-in" appear>
      <AppCard class="cus-scroll m-12 h-0 flex-1 rounded-8 p-24" bordered>
        <slot />
      </AppCard>
    </transition>
  </main>
  <footer class="bg-#f5f6fb dark:bg-#121212">
    <slot v-if="$slots.footer" name="footer" />
  </footer>
</template>

<script setup>
defineProps({
  back: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: undefined,
  },
})
const route = useRoute()
const router = useRouter()
</script>
