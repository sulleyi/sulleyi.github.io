// RetroTerminal.vue - A component that mimics a retro computer terminal
<template>
  <div class="terminal" :class="{ 'terminal-active': isActive }">
    <div class="terminal-header">
      <div class="terminal-title">{{ title }}</div>
      <div class="terminal-controls">
        <span class="control"></span>
        <span class="control"></span>
        <span class="control"></span>
      </div>
    </div>
    <div class="terminal-body">
      <div v-if="showPrompt" class="prompt-line">
        <span class="prompt">{{ prompt }}</span>
        <span class="cursor" v-if="cursorVisible"></span>
      </div>
      <div class="terminal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RetroTerminal',
  props: {
    title: {
      type: String,
      default: 'TERMINAL'
    },
    prompt: {
      type: String,
      default: '>'
    },
    showPrompt: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      cursorVisible: true,
      cursorInterval: null
    }
  },
  mounted() {
    // Blinking cursor
    this.cursorInterval = setInterval(() => {
      this.cursorVisible = !this.cursorVisible;
    }, 500);
  },
  beforeUnmount() {
    clearInterval(this.cursorInterval);
  }
}
</script>

<style scoped>
.terminal {
  background-color: #121212;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  font-family: 'VT323', 'Courier New', monospace;
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
}

.terminal-header {
  background-color: #1a1a1a;
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #2a2a2a;
}

.terminal-title {
  color: #888;
  font-size: 14px;
  letter-spacing: 1px;
}

.terminal-controls {
  display: flex;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 8px;
  background-color: #333;
}

.control:nth-child(1) {
  background-color: #464646;
}

.control:nth-child(2) {
  background-color: #3a3a3a;
}

.control:nth-child(3) {
  background-color: #2d2d2d;
}

.terminal-body {
  padding: 15px;
  color: #33ff33;
  font-size: 16px;
  line-height: 1.4;
  min-height: 150px;
  background-color: #121212;
  position: relative;
  overflow: auto;
}

.terminal-body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  opacity: 0.2;
}

.prompt-line {
  display: flex;
  margin-bottom: 10px;
}

.prompt {
  color: #33ff33;
  margin-right: 8px;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: #33ff33;
  animation: blink 1s step-end infinite;
}

.terminal-content {
  word-break: break-word;
}

.terminal-active .terminal-body {
  animation: scanline 0.2s linear infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes scanline {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 4px;
  }
}
</style>
