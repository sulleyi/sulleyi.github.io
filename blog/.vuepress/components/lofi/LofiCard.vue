// LofiCard.vue - A card component with subtle noise texture and retro styling
<template>
  <div class="lofi-card" :class="{ 'hover-effect': hoverEffect }">
    <div class="card-header" v-if="title">{{ title }}</div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LofiCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    hoverEffect: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.lofi-card {
  background-color: #1e1e1e;
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.lofi-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=');
  opacity: 0.1;
  pointer-events: none;
}

.lofi-card.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.card-header {
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  color: #8f8f8f;
  border-bottom: 1px solid #333;
}

.card-content {
  font-family: 'Roboto', sans-serif;
  color: #a0a0a0;
  line-height: 1.6;
}
</style>
