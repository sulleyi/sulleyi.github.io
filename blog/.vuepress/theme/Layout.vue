// File: .vuepress/theme/Layout.vue

<template>
  <Layout>
    <template #sidebar-top>
      <div class="monogram-wrapper">
        <ClientOnly>
          <ThreeScene :width="200" :height="100" />
        </ClientOnly>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

export default {
  components: {
    Layout
  }
}
</script>

<style>
.monogram-wrapper {
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>