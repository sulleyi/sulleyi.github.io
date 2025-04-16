// VhsTape.vue - A VHS-inspired progress indicator
<template>
  <div class="vhs-container">
    <div class="vhs-label">{{ label }}</div>
    <div class="vhs-track">
      <div class="vhs-progress" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="vhs-percentage">{{ progress }}%</div>
  </div>
</template>

<script>
export default {
  name: 'VhsTape',
  props: {
    progress: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0 && value <= 100
    },
    label: {
      type: String,
      default: 'LOADING'
    }
  }
}
</script>

<style scoped>
.vhs-container {
  background-color: #111;
  border: 1px solid #333;
  border-radius: 3px;
  padding: 0.8rem;
  font-family: 'VCR OSD Mono', 'Courier New', monospace;
}

.vhs-label {
  color: #888;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.vhs-track {
  height: 10px;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.vhs-progress {
  height: 100%;
  background: linear-gradient(90deg, #444 0%, #666 50%, #444 100%);
  background-size: 10px 10px;
  position: relative;
}

.vhs-progress::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.1) 2px,
    rgba(255, 255, 255, 0.1) 4px
  );
}

.vhs-percentage {
  text-align: right;
  color: #666;
  margin-top: 0.3rem;
  font-size: 0.8rem;
}
</style>