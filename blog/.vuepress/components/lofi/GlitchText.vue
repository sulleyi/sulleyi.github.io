// GlitchText.vue - Fixed version with more reliable glitch effect
<template>
  <div class="glitch-container" @mouseover="triggerGlitch">
    <div class="glitch-text" :class="{ 'glitch-active': isGlitching }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlitchText',
  props: {
    // How often should random glitches occur (in milliseconds)
    glitchFrequency: {
      type: Number,
      default: 3000
    },
    // Duration of each glitch effect (in milliseconds)
    glitchDuration: {
      type: Number,
      default: 300
    },
    // Probability of glitch occurring during each check (0-1)
    glitchProbability: {
      type: Number,
      default: 0.3
    }
  },
  data() {
    return {
      isGlitching: false,
      glitchInterval: null
    }
  },
  mounted() {
    // Force a glitch on initial load after a short delay
    setTimeout(() => {
      this.triggerGlitch();
    }, 1000);
    
    // Set up recurring random glitches
    this.glitchInterval = setInterval(() => {
      if (Math.random() < this.glitchProbability) {
        this.triggerGlitch();
      }
    }, this.glitchFrequency);
  },
  beforeUnmount() {
    // Clean up interval when component is destroyed
    clearInterval(this.glitchInterval);
  },
  methods: {
    triggerGlitch() {
      // Don't start a new glitch if one is already in progress
      if (this.isGlitching) return;
      
      // Start the glitch effect
      this.isGlitching = true;
      
      // For more interesting effect, add multiple quick glitches
      const glitchSequence = () => {
        // Number of sub-glitches
        const glitchCount = 2 + Math.floor(Math.random() * 3);
        let glitchDelay = 0;
        
        for (let i = 0; i < glitchCount; i++) {
          setTimeout(() => {
            this.isGlitching = false;
            
            // Brief pause between sub-glitches
            setTimeout(() => {
              this.isGlitching = true;
            }, 50);
          }, glitchDelay);
          
          glitchDelay += 100 + Math.floor(Math.random() * 150);
        }
        
        // End the entire glitch sequence
        setTimeout(() => {
          this.isGlitching = false;
        }, glitchDelay + 100);
      };
      
      // Start the glitch sequence
      glitchSequence();
    }
  }
}
</script>

<style scoped>
.glitch-container {
  position: relative;
  display: inline-block;
  cursor: default;
}

.glitch-text {
  position: relative;
  font-family: 'Courier New', monospace;
  color: #c0c0c0;
  text-shadow: 0 0 2px rgba(90, 90, 90, 0.5);
  transition: transform 0.05s ease;
}

.glitch-active {
  animation: glitch 0.2s linear;
  color: #eaeaea;
}

@keyframes glitch {
  0% {
    transform: translate(0);
    text-shadow: 0 0 2px rgba(90, 90, 90, 0.5);
  }
  20% {
    transform: translate(-3px, 2px);
    text-shadow: -2px 0 #ff0000, 2px 0 #00ffff;
  }
  40% {
    transform: translate(3px, -2px);
    text-shadow: 2px 0 #ff0000, -2px 0 #00ffff;
  }
  60% {
    transform: translate(-2px, -1px);
    text-shadow: -1px 0 #00ff00, 1px 0 #ff00ff;
  }
  80% {
    transform: translate(2px, 1px);
    text-shadow: 1px 0 #00ff00, -1px 0 #ff00ff;
  }
  100% {
    transform: translate(0);
    text-shadow: 0 0 2px rgba(90, 90, 90, 0.5);
  }
}
</style>