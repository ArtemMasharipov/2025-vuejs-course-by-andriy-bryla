<template>
  <div class="loading-container" :class="{ overlay: isOverlay }">
    <div class="spinner" :style="spinnerStyle"></div>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: '#4CAF50'
    },
    message: {
      type: String,
      default: 'Завантаження...'
    },
    isOverlay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    spinnerStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderTopColor: this.color
      }
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
}

.loading-container.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid;
  animation: spin 1s linear infinite;
}

.message {
  margin-top: var(--space-md);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
