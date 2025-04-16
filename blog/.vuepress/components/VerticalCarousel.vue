<template>
  <div class="bass-vertical-carousel" :class="{ 'is-navigating': isNavigating }">

    
    <!-- Cards Container -->
    <div class="cards-container" ref="cardsContainer">
      <!-- Stacked Cards -->
      <div class="cards-stack" 
           :style="{ transform: `translateY(${-activeIndex * cardOffset}px)` }">
        <div v-for="(item, index) in items" 
             :key="index" 
             class="card-wrapper"
             :class="{ 
               'active-card': index === activeIndex,
               'previous-card': index < activeIndex,
               'next-card': index > activeIndex
             }"
             :style="{ 
               transform: `translateY(${getCardPosition(index)}px) scale(${getCardScale(index)})`,
               opacity: getCardOpacity(index),
               zIndex: items.length - Math.abs(index - activeIndex)
             }">
          <component 
            :is="cardComponent" 
            v-bind="item.props"
            :active="index === activeIndex"
            @activate="activateCard(index)"
            @deactivate="deactivateCard(index)">
            <slot name="card-content" :item="item" :index="index">
              {{ item.content }}
            </slot>
          </component>
        </div>
      </div>
    </div>
    
    <!-- Pagination Indicators -->
    <div class="bass-pagination">
      <div class="pagination-wrapper">
        <button v-for="(item, index) in items" 
                :key="index"
                class="pagination-indicator" 
                :class="{ 'active': index === activeIndex }"
                @click="goToCard(index)"
                :aria-label="`Go to card ${index + 1}`"
                :aria-current="index === activeIndex ? 'true' : 'false'">
          <div class="indicator-line"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerticalCarousel',
  props: {
    // Component to use for rendering cards
    cardComponent: {
      type: [Object, String],
      required: true
    },
    // Array of items to display in carousel
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    // Title for the carousel
    title: {
      type: String,
      default: ''
    },
    // Auto-play settings
    autoplay: {
      type: Boolean,
      default: false
    },
    // Delay between auto-play transitions (in ms)
    autoplayDelay: {
      type: Number,
      default: 5000
    },
    // Initial active card index
    initialIndex: {
      type: Number,
      default: 0
    },
    // Initial vertical offset for stacking (in px)
    cardOffset: {
      type: Number,
      default: 60
    },
    // Animation duration (in ms)
    transitionDuration: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      activeIndex: this.initialIndex,
      isNavigating: false,
      autoplayTimer: null,
      cardHeight: 0,
      containerHeight: 0
    };
  },
  mounted() {
    this.startAutoplay();
    this.updateCardHeight();
    window.addEventListener('resize', this.updateCardHeight);
    
    // Initial update of container height
    this.$nextTick(() => {
      this.updateContainerHeight();
    });
  },
  beforeDestroy() {
    this.stopAutoplay();
    window.removeEventListener('resize', this.updateCardHeight);
  },
  methods: {
    // Navigation methods
    nextCard() {
      if (this.activeIndex < this.items.length - 1) {
        this.goToCard(this.activeIndex + 1);
      }
    },
    prevCard() {
      if (this.activeIndex > 0) {
        this.goToCard(this.activeIndex - 1);
      }
    },
    goToCard(index) {
      if (index === this.activeIndex || this.isNavigating) return;
      
      this.isNavigating = true;
      this.activeIndex = index;
      
      // Reset autoplay timer
      this.restartAutoplay();
      
      // Update container height based on active card
      this.updateContainerHeight();
      
      // Emit change event
      this.$emit('change', this.activeIndex);
      
      // Reset navigation lock after animation completes
      setTimeout(() => {
        this.isNavigating = false;
      }, this.transitionDuration);
    },
    
    // Calculate card positions and styling
    getCardPosition(index) {
      const diff = index - this.activeIndex;
      
      if (diff === 0) {
        return 0; // Active card
      } else if (diff < 0) {
        // Cards before the active one (stacked above)
        return diff * this.cardOffset * 0.6;
      } else {
        // Cards after the active one (stacked below)
        return diff * this.cardOffset;
      }
    },
    getCardScale(index) {
      const diff = Math.abs(index - this.activeIndex);
      return Math.max(0.9, 1 - (diff * 0.06));
    },
    getCardOpacity(index) {
      const diff = Math.abs(index - this.activeIndex);
      return Math.max(0.4, 1 - (diff * 0.15));
    },
    
    // Card interaction handlers
    activateCard(index) {
      if (index !== this.activeIndex) {
        this.goToCard(index);
      }
    },
    deactivateCard() {
      // This method is just a stub for the event
    },
    
    // Autoplay functionality
    startAutoplay() {
      if (this.autoplay && !this.autoplayTimer) {
        this.autoplayTimer = setInterval(() => {
          if (this.activeIndex < this.items.length - 1) {
            this.nextCard();
          } else {
            this.goToCard(0); // Loop back to first card
          }
        }, this.autoplayDelay);
      }
    },
    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    },
    restartAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    },
    
    // Layout calculations
    updateCardHeight() {
      if (this.$refs.cardsContainer) {
        const activeCard = this.$refs.cardsContainer.querySelector('.active-card');
        if (activeCard) {
          this.cardHeight = activeCard.offsetHeight;
          this.updateContainerHeight();
        }
      }
    },
    updateContainerHeight() {
      // Set container height based on active card
      this.$nextTick(() => {
        if (this.$refs.cardsContainer) {
          const activeCard = this.$refs.cardsContainer.querySelector('.active-card');
          if (activeCard) {
            this.containerHeight = activeCard.offsetHeight;
            this.$refs.cardsContainer.style.height = `${this.containerHeight}px`;
          }
        }
      });
    }
  },
  watch: {
    items() {
      this.$nextTick(() => {
        this.updateCardHeight();
      });
    }
  }
};
</script>

<style scoped>
.bass-vertical-carousel {
  position: relative;
  width: 100%;
  margin: 2rem 0;
  font-family: var(--font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);
}

/* Title Bar styling */
.carousel-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(120, 120, 120, 0.15);
}

.carousel-title {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #f0f0f0;
}

.carousel-controls {
  display: flex;
  align-items: center;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid rgba(120, 120, 120, 0.2);
  color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.control-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.control-btn:hover:not(:disabled) {
  background-color: rgba(120, 120, 120, 0.1);
  border-color: rgba(120, 120, 120, 0.3);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Custom Bass-inspired arrows */
.arrow-up,
.arrow-down {
  position: relative;
  width: 12px;
  height: 12px;
}

.arrow-up:before,
.arrow-down:before {
  content: '';
  position: absolute;
  width: 10px;
  height: 1px;
  background-color: #f0f0f0;
  left: 50%;
  top: 50%;
}

.arrow-up:after,
.arrow-down:after {
  content: '';
  position: absolute;
  width: 1px;
  height: 10px;
  background-color: #f0f0f0;
  left: 50%;
  top: 50%;
}

.arrow-up:before {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.arrow-up:after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.arrow-down:before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.arrow-down:after {
  transform: translate(-50%, -50%) rotate(45deg);
}

.card-counter {
  margin: 0 12px;
  font-family: var(--font-family-mono, "SFMono-Regular", Consolas, monospace);
  font-size: 0.8rem;
  color: rgba(200, 200, 200, 0.8);
  letter-spacing: 0.05em;
}

/* Cards container and stacking */
.cards-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: height 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.cards-stack {
  position: relative;
  width: 100%;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.card-wrapper {
  position: absolute;
  width: 100%;
  will-change: transform, opacity;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  transform-origin: center bottom;
}

.active-card {
  z-index: 10;
}

.previous-card {
  z-index: 5;
  pointer-events: none;
}

.next-card {
  z-index: 1;
  pointer-events: none;
}

/* Show pointers only on active and specific cards */
.is-navigating .card-wrapper {
  pointer-events: none;
}

.card-wrapper:nth-child(n+6) {
  opacity: 0;
  visibility: hidden;
}

/* Custom Bass-inspired pagination */
.bass-pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.pagination-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.pagination-indicator {
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4px;
  height: 24px;
  position: relative;
}

.indicator-line {
  width: 2px;
  height: 18px;
  background-color: rgba(150, 150, 150, 0.3);
  transition: all 0.3s ease;
}

.pagination-indicator:hover .indicator-line {
  background-color: rgba(180, 180, 180, 0.6);
  height: 22px;
}

.pagination-indicator.active .indicator-line {
  background-color: #f0f0f0;
  height: 24px;
  width: 2px;
}

.pagination-indicator:focus {
  outline: none;
}

.pagination-indicator:focus .indicator-line {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .carousel-title-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .carousel-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>