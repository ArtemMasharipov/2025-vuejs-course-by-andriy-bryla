<template>
  <div class="page-title">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.page-title {
  text-align: center;
  margin-bottom: var(--space-xl);
}

h2 {
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0 0 var(--space-xs) 0;
}
</style>
