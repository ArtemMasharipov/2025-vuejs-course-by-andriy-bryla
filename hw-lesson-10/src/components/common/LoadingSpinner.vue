<template>
  <div class="spinner-container" :class="{ overlay: overlay }">
    <div class="spinner">
      <div class="spinner-circle"></div>
      <div v-if="message" class="spinner-text">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    message: {
      type: String,
      default: 'Loading...'
    },
    overlay: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.spinner-container.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
}

.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner-circle {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 102, 204, 0.2);
  border-top-color: #0066cc;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

.spinner-text {
  margin-top: 1rem;
  color: #0066cc;
  font-weight: bold;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
