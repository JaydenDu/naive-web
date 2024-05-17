<template>
  <div class="h-full w-full flex">
    <article class="w-0 flex-1">
      <AppHeader class="h-60 flex-shrink-0" />
      <slot />
    </article>
  </div>
</template>

<script setup>
import AppHeader from './header/index.vue'
</script>

<style>
.collapsed {
  width: 64px;
}
</style>
