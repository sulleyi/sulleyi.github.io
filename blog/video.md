<div class="responsive-center">
<a href="about">
  <ClientOnly>
    <VideotapeMonogram :width="500" :height="300" :debug="false" />
</ClientOnly>
</a>
</div>

<ClientOnly>
  <div class="bass-example-wrapper">
    <VerticalCarousel
      :cardComponent="CircuitBoardCard"
      :items="cardItems"
      title="SYSTEM MODULES"
      :cardOffset="40">
    </VerticalCarousel>
  </div>
</ClientOnly>

<script setup>
import { ref } from 'vue'
import CircuitBoardCard from '/.vuepress/components/CircuitBoardCard.vue'
import VerticalCarousel from '/.vuepress/components/VerticalCarousel.vue'

const cardItems = ref([
  {
    props: {
      title: 'Robotic Camera Systems',
      modelNumber: 'SB-4581',
      specs: [
        'Multi-axis robotic camera mounts',
        'AI-powered subject tracking',
        'Seamless remote control capabilities',
        'Customizable configurations for different production needs'
      ]
    },
    content: 'Cutting-edge automated camera tracking solutions designed for dynamic live production environments. Our advanced robotic systems provide precise, intelligent movement and seamless remote operation across various event scales.'
  },
  {
    props: {
      title: 'Wireless A/V Transmission',
      modelNumber: 'SB-6109',
      specs: [
        'Ultra-low latency streaming',
        'High-definition video transmission',
        'Robust and reliable connectivity'
      ]
    },
    content: 'High-performance wireless audio and video transmission technologies delivering reliable, low-latency communication for professional broadcasting and live events.'
  },
  {
    props: {
      title: 'Custom Engineering Solutions',
      modelNumber: 'SB-7823',
      specs: [
        'End-to-end technical consultation',
        'Cutting-edge technology integration',
        'Customized solution development',
      ]
    },
    content: 'Bespoke technological solutions tailored to unique challenges in live production, broadcast technology, and event management.'
  }
])
</script>

<style>
.bass-example-wrapper {
  max-width: 800px;
  margin: 4rem auto;
  position: relative;
  padding: 0;
}

/* Complete override of carousel positioning for fixed cards */
.bass-example-wrapper .bass-vertical-carousel {
  margin: 0;
}

.bass-example-wrapper .carousel-title-bar {
  background: transparent;
  border-bottom: 2px solid rgba(120, 120, 120, 0.15);
  padding: 0 0 1rem 0;
  margin: 0 0 2rem 0;
}

/* Fix card positioning with absolute approach */
.bass-example-wrapper .cards-container {
  height: 480px !important; /* Slightly reduced height */
  position: relative;
  overflow: visible !important; /* Allow cards to overflow */
}

/* Force override stacking with !important */
.bass-example-wrapper .cards-stack {
  position: static !important; /* Change from relative */
  transform: none !important; /* Remove any transforms */
  height: 100%;
}

.bass-example-wrapper .card-wrapper {
  position: absolute !important;
  width: 90% !important;
  max-width: 700px;
  left: 50% !important;
  transform: translateX(-50%) !important; /* Center horizontally */
  opacity: 0 !important; /* Hide all cards by default */
  visibility: hidden;
  transition: opacity 0.5s ease, transform 0.5s ease, top 0.5s ease !important;
}

/* Show only active card and adjust positioning */
.bass-example-wrapper .card-wrapper.active-card {
  top: 0 !important;
  opacity: 1 !important;
  visibility: visible;
  z-index: 10 !important;
}

/* Position previous cards */
.bass-example-wrapper .card-wrapper.previous-card {
  top: -60px !important; /* Stack above */
  opacity: 0.2 !important;
  visibility: visible;
  z-index: 5 !important;
  transform: translateX(-50%) scale(0.95) !important;
}

/* Position next cards */
.bass-example-wrapper .card-wrapper.next-card {
  top: 60px !important; /* Stack below */
  opacity: 0.2 !important;
  visibility: visible;
  z-index: 5 !important;
  transform: translateX(-50%) scale(0.95) !important;
}

/* Enhanced control buttons for better usability */
.bass-example-wrapper .control-btn {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 50%;
  z-index: 100;
  background: rgba(30, 30, 30, 0.7);
  border: 1px solid rgba(160, 160, 160, 0.3);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

.bass-example-wrapper .prev-btn {
  left: -24px;
}

.bass-example-wrapper .next-btn {
  right: -24px;
}

.bass-example-wrapper .control-btn:hover:not(:disabled) {
  background-color: rgba(40, 40, 40, 0.9);
  border-color: rgba(180, 180, 180, 0.5);
  transform: translateY(-50%) scale(1.05);
}

/* Make the arrows more visible */
.bass-example-wrapper .arrow-up:before,
.bass-example-wrapper .arrow-up:after,
.bass-example-wrapper .arrow-down:before,
.bass-example-wrapper .arrow-down:after {
  width: 14px;
  height: 2px;
}

/* Redesigned Horizontal Pagination - MOVED UP CLOSER TO CARDS */
.bass-example-wrapper .bass-pagination {
  position: absolute !important;
  bottom: 10px !important; /* Position at the bottom of the cards container */
  width: 100%;
  margin: 0 !important;
  padding: 0;
  display: flex;
  justify-content: center;
  height: 36px;
  z-index: 20 !important; /* Ensure it's above cards */
}

.bass-example-wrapper .pagination-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  background: rgba(20, 20, 20, 0.6);
  padding: 6px 16px;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.bass-example-wrapper .pagination-indicator {
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
}

.bass-example-wrapper .indicator-line {
  width: 18px;
  height: 4px;
  background-color: rgba(150, 150, 150, 0.3);
  transition: all 0.3s ease;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.bass-example-wrapper .pagination-indicator:hover .indicator-line {
  background-color: rgba(180, 180, 180, 0.6);
  width: 20px;
}

.bass-example-wrapper .pagination-indicator.active .indicator-line {
  background-color: #f0f0f0;
  width: 24px;
  height: 4px;
}

@media (max-width: 768px) {
  .bass-example-wrapper {
    padding: 0 2rem;
  }
  
  .bass-example-wrapper .prev-btn {
    left: -15px;
  }
  
  .bass-example-wrapper .next-btn {
    right: -15px;
  }
  
  .bass-example-wrapper .control-btn {
    width: 42px;
    height: 42px;
  }
  
  .bass-example-wrapper .card-wrapper {
    width: 100% !important;
  }
  
  .bass-example-wrapper .cards-container {
    height: 450px !important;
  }
}
</style>


<!-- <CircuitBoardCard 
  title="Camera Stabilization System" 
  modelNumber="CAM-4872"
  :specs="[
    'Servo Response: 0.08 sec/60°',
    'Voltage Range: 7.4-12V DC',
    'Control Interface: I2C/UART',
    'Stabilization Axes: 3 (Pitch/Roll/Yaw)'
  ]"
  :active="true"
>
  <p>Advanced 3-axis stabilization system with precision servo control for professional video applications.</p>
  
  <p>Features adaptive motion prediction and vibration dampening for smooth tracking even in challenging environments.</p>
</CircuitBoardCard>
 -->