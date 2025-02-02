<template>
  <div class="spinner-container">
    <div class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
      <div class="dot3"></div>
    </div>
    <div class="spinner-text">Завантаження...</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner'
}
</script>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  display: flex;
  gap: 0.5rem;
}

.spinner-text {
  margin-top: 1rem;
  color: #666;
}

.dot1, .dot2, .dot3 {
  width: 12px;
  height: 12px;
  background: #007bff;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot1 {
  animation-delay: -0.32s;
}

.dot2 {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  }
  40% { 
    transform: scale(1.0);
  }
}
</style>