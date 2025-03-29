<template>
  <div class="empty-layout">
    <main class="content" :class="{ 'with-padding': autoPadding }">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  props: {
    autoPadding: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.empty-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.content {
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.with-padding {
  padding: var(--space-lg);
}
</style>
