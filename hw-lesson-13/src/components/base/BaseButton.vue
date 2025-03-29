<template>
  <button 
    :class="['base-button', variant, { 'full-width': fullWidth }]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
    },
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.base-button {
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-base);
  transition: background-color var(--transition-fast);
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.primary {
  background-color: var(--color-primary);
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.secondary {
  background-color: var(--color-background-light);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-dark);
}

.secondary:hover:not(:disabled) {
  background-color: var(--color-border);
}

.danger {
  background-color: var(--color-danger);
  color: white;
}

.danger:hover:not(:disabled) {
  background-color: var(--color-danger-dark);
}

.success {
  background-color: var(--color-secondary);
  color: white;
}

.success:hover:not(:disabled) {
  background-color: var(--color-secondary-dark);
}

.full-width {
  width: 100%;
}
</style>
