<template>
  <div class="base-card" :class="{ 
    elevated, 
    [`theme-${theme}`]: theme,
    'with-header': $slots.header || title,
    'with-footer': $slots.footer
  }">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
    </div>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    elevated: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: '',
      validator: (value) => ['', 'primary', 'secondary', 'info'].includes(value)
    }
  }
}
</script>

<style scoped>
.base-card {
  position: relative;
  padding: var(--space-lg);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
}

.elevated {
  box-shadow: var(--shadow-md);
}

.card-header {
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
}

.with-header .card-header {
  border-bottom: 1px solid var(--color-border);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
}

.card-footer {
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.theme-primary {
  border-top: 3px solid var(--color-primary);
}

.theme-secondary {
  border-top: 3px solid var(--color-secondary);
}

.theme-info {
  border-top: 3px solid var(--color-warning);
}
</style>
