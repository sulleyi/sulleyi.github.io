<template>
  <div class="bass-card" :class="{ 'card-active': isActive }" @mouseenter="activateCard" @mouseleave="deactivateCard">
    <!-- Bass-inspired dynamic background composition -->
    <div class="bass-composition">
      <!-- Irregular cut-out shapes inspired by Saul Bass film posters -->
      <div class="bass-element jagged-shape"></div>
      <div class="bass-element spiral-arm"></div>
      <div class="bass-element torn-edge"></div>
      <div class="bass-element paper-cut"></div>
      <div class="bass-element fractured-line"></div>
      <div class="bass-element hand-drawn"></div>
      <div class="bass-element staggered-bars"></div>
    </div>
    
    <!-- Stylized status indicator -->
    <div class="status-indicator" :class="{ 'active': isActive }">
      <div class="indicator-cut"></div>
    </div>
    
    <!-- Content Container with strong typography focus -->
    <div class="content-container">
      <!-- Card Header with Bass-inspired typography -->
      <div class="bass-header">
        <h3 class="card-title">{{ title }}</h3>
        <div class="model-identifier">{{ modelNumber || 'SB-' + Math.floor(1000 + Math.random() * 9000) }}</div>
      </div>
      
      <!-- Card Content with improved readability -->
      <div class="bass-content">
        <slot></slot>
      </div>
      
      <!-- Bass-inspired Footer with Specs -->
      <div class="bass-footer" v-if="specs && specs.length">
        <div class="specs-label">SPECIFICATIONS</div>
        <ul class="specs-list">
          <li v-for="(spec, index) in specs" :key="index" class="spec-item">
            {{ spec }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircuitBoardCard',
  props: {
    title: {
      type: String,
      default: 'Bass Module'
    },
    modelNumber: {
      type: String,
      default: ''
    },
    specs: {
      type: Array,
      default: () => []
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.isActive = this.active;
  },
  methods: {
    activateCard() {
      this.isActive = true;
      this.$emit('activate');
    },
    deactivateCard() {
      if (!this.active) {
        this.isActive = false;
        this.$emit('deactivate');
      }
    }
  },
  watch: {
    active(newValue) {
      this.isActive = newValue;
    }
  }
}
</script>

<style scoped>
.bass-card {
  background-color: var(--dark-bg-color, #0a0a0a);
  border-radius: 0;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  color: var(--dark-text-color, #f0f0f0);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border: none;
  min-height: 240px;
}

/* Bold background inspired by Saul Bass movie posters */
.bass-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0a0a0a;
  opacity: 0.95;
  z-index: -2;
}

/* Bass-inspired composition */
.bass-composition {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.bass-element {
  position: absolute;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 0.12;
  background-color: #D32F2F; /* Bass signature red */
  mix-blend-mode: overlay;
}

/* Jagged paper-cut shape inspired by Vertigo poster */
.jagged-shape {
  width: 120px;
  height: 100%;
  top: 0;
  right: -60px;
  clip-path: polygon(
    30% 0%, 70% 5%, 40% 20%, 60% 40%, 
    30% 50%, 70% 60%, 40% 75%, 60% 95%, 30% 100%, 
    0% 100%, 0% 0%
  );
  background-color: #2e2e2e;
  opacity: 0.1;
  transform-origin: right center;
  transform: scaleX(0.8);
}

/* Spiraling arm inspired by Vertigo poster */
.spiral-arm {
  width: 100px;
  height: 300px;
  bottom: -150px;
  left: 30%;
  background-color: transparent;
  border-top: 3px solid #2e2e2e;
  border-left: 3px solid #2e2e2e;
  border-radius: 50% 0 0 0;
  transform: rotate(25deg) scale(0.6);
  opacity: 0.08;
}

/* Torn paper edge effect */
.torn-edge {
  width: 120px;
  height: 25px;
  top: 40px;
  left: -50px;
  background-color: #2e2e2e;
  clip-path: polygon(
    0% 0%, 5% 30%, 15% 10%, 25% 40%, 35% 5%, 
    45% 30%, 55% 5%, 65% 40%, 75% 10%, 85% 30%, 
    95% 0%, 100% 100%, 0% 100%
  );
  transform: rotate(-10deg) scaleX(1.5);
  opacity: 0.07;
}

/* Paper cut-out shape inspired by Anatomy of a Murder */
.paper-cut {
  width: 160px;
  height: 220px;
  bottom: -80px;
  right: 35%;
  clip-path: polygon(
    50% 0%, 80% 15%, 100% 40%, 90% 70%, 60% 85%, 
    40% 85%, 10% 70%, 0% 40%, 20% 15%
  );
  transform: rotate(-15deg) scale(0.7);
  background-color: #2e2e2e;
  opacity: 0.06;
}

/* Fractured line inspired by Saul Bass's fragmented designs */
.fractured-line {
  height: 3px;
  width: 200px;
  top: 75%;
  left: -30px;
  background-color: #2e2e2e;
  transform: rotate(-5deg);
  opacity: 0.1;
  clip-path: polygon(
    0% 0%, 20% 0%, 22% 100%, 40% 100%,
    42% 0%, 60% 0%, 62% 100%, 80% 100%,
    82% 0%, 100% 0%, 100% 100%, 0% 100%
  );
}

/* Hand-drawn irregular shape */
.hand-drawn {
  width: 140px;
  height: 120px;
  top: 15%;
  left: 10%;
  background-color: transparent;
  border: 2px solid #2e2e2e;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  transform: rotate(15deg) scale(0.7);
  opacity: 0.05;
}

/* Staggered bars inspired by The Man with the Golden Arm */
.staggered-bars {
  width: 100px;
  height: 120px;
  bottom: 20%;
  right: 10%;
  background-color: transparent;
  background-image: 
    linear-gradient(90deg, #2e2e2e 2px, transparent 2px),
    linear-gradient(90deg, #2e2e2e 2px, transparent 2px),
    linear-gradient(90deg, #2e2e2e 2px, transparent 2px),
    linear-gradient(90deg, #2e2e2e 2px, transparent 2px),
    linear-gradient(90deg, #2e2e2e 2px, transparent 2px);
  background-size: 
    100% 20%, 
    100% 20%, 
    100% 20%, 
    100% 20%, 
    100% 20%;
  background-position: 
    0% 0%, 
    10% 20%, 
    25% 40%, 
    5% 60%, 
    15% 80%;
  background-repeat: no-repeat;
  transform: rotate(-5deg);
  opacity: 0.07;
}

/* Hover animations for Bass elements */
.bass-card:hover .jagged-shape {
  transform: scaleX(1);
  opacity: 0.14;
}

.bass-card:hover .spiral-arm {
  transform: rotate(15deg) scale(0.7);
  opacity: 0.12;
}

.bass-card:hover .torn-edge {
  transform: rotate(-5deg) scaleX(1.7);
  opacity: 0.09;
}

.bass-card:hover .paper-cut {
  transform: rotate(-12deg) scale(0.8);
  opacity: 0.09;
}

.bass-card:hover .fractured-line {
  width: 220px;
  opacity: 0.13;
}

.bass-card:hover .hand-drawn {
  transform: rotate(10deg) scale(0.8);
  opacity: 0.08;
}

.bass-card:hover .staggered-bars {
  transform: rotate(-8deg) translateX(5px);
  opacity: 0.1;
}

/* Bass-inspired dramatic slash effect */
.bass-card::after {
  content: "";
  position: absolute;
  top: -20%;
  left: -150%;
  width: 100%;
  height: 200%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.07) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 1;
  pointer-events: none;
  transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  transform: skewX(-25deg) translateX(0);
  opacity: 0;
}

.bass-card:hover::after {
  opacity: 1;
  transform: skewX(-25deg) translateX(250%);
}

/* Content container with strong contrast */
.content-container {
  position: relative;
  z-index: 10;
  background-color: transparent;
  border-radius: 0;
  padding: 0;
}

/* Bass-inspired status indicator */
.status-indicator {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 20;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.indicator-cut {
  width: 14px;
  height: 14px;
  background-color: transparent;
  border: 2px solid rgba(180, 180, 180, 0.3);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%);
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.status-indicator.active .indicator-cut {
  background-color: rgba(220, 220, 220, 0.15);
  border-color: rgba(220, 220, 220, 0.6);
  transform: rotate(180deg);
}

/* Card Content Styles with Bass-inspired typography */
.bass-header {
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(150, 150, 150, 0.12);
  display: flex;
  flex-direction: column;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-family: var(--font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);
  color: var(--c-text, #f0f0f0);
  font-size: 1.6rem;
  letter-spacing: -0.02em;
  font-weight: 700;
  line-height: 1.1;
  text-transform: uppercase;
}

.model-identifier {
  font-family: var(--font-family-mono, "SFMono-Regular", Consolas, monospace);
  color: var(--c-text-lighter, rgba(200, 200, 200, 0.6));
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  margin-top: 0.4rem;
  text-transform: uppercase;
}

.bass-content {
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
  font-family: var(--font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);
  color: var(--c-text, rgba(240, 240, 240, 0.95));
  line-height: 1.7;
  font-size: 1rem;
  font-weight: 400;
}

.bass-footer {
  position: relative;
  z-index: 1;
  border-top: 2px solid rgba(150, 150, 150, 0.12);
  padding-top: 1rem;
  margin-top: 1.5rem;
}

.specs-label {
  font-family: var(--font-family-mono, "SFMono-Regular", Consolas, monospace);
  color: var(--c-text-lighter, rgba(200, 200, 200, 0.6));
  font-size: 0.7rem;
  margin-bottom: 1rem;
  letter-spacing: 0.15em;
  font-weight: 700;
  text-transform: uppercase;
}

.specs-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
}

.spec-item {
  font-family: var(--font-family-mono, "SFMono-Regular", Consolas, monospace);
  color: var(--c-text-light, rgba(220, 220, 220, 0.85));
  font-size: 0.8rem;
  padding-left: 12px;
  position: relative;
  letter-spacing: 0.05em;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.spec-item::before {
  content: '/';
  position: absolute;
  left: 0;
  color: var(--c-text-lighter, rgba(180, 180, 180, 0.6));
}

/* Interactive States with Bass-inspired depth */
.bass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.card-active {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

/* Deep dark mode enhancement */
@media (prefers-color-scheme: dark) {
  .bass-card {
    background-color: #0a0a0a;
  }
  
  .bass-card::before {
    background: #0a0a0a;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .bass-card {
    padding: 1.75rem 1.5rem;
  }
  
  .specs-list {
    grid-template-columns: 1fr;
  }
  
  .card-title {
    font-size: 1.4rem;
  }
  
  .jagged-shape {
    right: -80px;
  }
}

/* Improved focus states for accessibility */
.bass-card:focus-within {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2), 0 12px 30px rgba(0, 0, 0, 0.3);
}

/* Animation for card active state */
@keyframes pulse {
  0% { box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25); }
  50% { box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35); }
  100% { box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25); }
}

.card-active {
  animation: pulse 3s infinite ease-in-out;
}
</style>