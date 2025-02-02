<template>
  <transition name="toast">
    <div v-if="show" class="toast" :class="type">
      <i class="fas" :class="icon"></i>
      <span class="toast-message">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import { DEFAULT_TOAST_MESSAGE, TOAST_TYPES } from '@/constants'

export default {
  name: 'ToastNotification',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: DEFAULT_TOAST_MESSAGE
    },
    type: {
      type: String,
      default: TOAST_TYPES.SUCCESS,
      validator: value => Object.values(TOAST_TYPES).includes(value)
    }
  },
  computed: {
    icon() {
      return {
        [TOAST_TYPES.SUCCESS]: 'fa-check-circle',
        [TOAST_TYPES.ERROR]: 'fa-exclamation-circle',
        [TOAST_TYPES.INFO]: 'fa-info-circle'
      }[this.type]
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 80px;
  right: 20px;
  padding: 12px 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.success {
  background-color: #28a745;
}

.error {
  background-color: #dc3545;
}

.info {
  background-color: #17a2b8;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
