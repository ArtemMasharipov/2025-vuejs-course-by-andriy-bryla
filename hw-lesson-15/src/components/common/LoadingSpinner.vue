<template>
  <div class="d-flex flex-column align-center justify-center pa-4" :class="{ 'loading-overlay': overlay }">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
      width="4"
    ></v-progress-circular>
    <div v-if="message" class="mt-4 text-primary font-weight-medium">{{ message }}</div>
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
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
}
</style>
