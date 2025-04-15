// File: .vuepress/theme/HopeLayout.vue

<template>
  <HopeLayout>
    <template #navbarStart>
      <div class="monogram-wrapper">
        <ClientOnly>
          <ThreeScene :width="120" :height="60" />
        </ClientOnly>
      </div>
    </template>
  </HopeLayout>
</template>

<script>
import { useLayoutComponents } from "vuepress-theme-hope/client";

export default {
  components: {
    HopeLayout
  }
}
</script>

<style>
.monogram-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}
</style>