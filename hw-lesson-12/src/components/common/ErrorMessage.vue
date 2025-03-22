<template>
  <div v-if="message" class="error-message">
    <div class="error-content">
      <span class="error-icon">⚠️</span>
      <span class="error-text">{{ message }}</span>
      <button class="error-close" @click="$emit('close')" aria-label="Close">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  emits: ['close']
}
</script>

<style scoped>
.error-message {
  background-color: rgba(255, 87, 87, 0.1);
  border-left: 4px solid #ff5757;
  border-radius: var(--border-radius-sm);
  padding: 12px 16px;
  margin-bottom: var(--element-spacing);
  color: #d32f2f;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.error-content {
  display: flex;
  align-items: center;
}

.error-icon {
  margin-right: 10px;
}

.error-text {
  flex: 1;
}

.error-close {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #d32f2f;
  opacity: 0.7;
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-close:hover {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
