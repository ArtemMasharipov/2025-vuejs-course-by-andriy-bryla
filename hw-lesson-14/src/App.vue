<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card class="app-header mb-6" color="primary" elevation="3">
          <v-card-title class="text-h4 text-center text-white py-4">
            Приклади використання слотів і динамічних компонентів
          </v-card-title>
        </v-card>
        <navigation-examples-wrapper />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationExamplesWrapper from '@/components/examples/NavigationExamplesWrapper.vue';

export default {
  name: 'App',
  components: {
    NavigationExamplesWrapper
  }
}
</script>

<style>
/* Global card styles */
.section-card {
  margin-bottom: 32px;
  border-radius: 8px;
  overflow: hidden;
}

.section-card .v-card-title {
  font-weight: bold;
  padding: 16px 24px;
}

.example-container {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

/* Standardized paginated component container */
.paginated-container {
  width: 100%;
  max-width: 350px;
  border: 2px solid #2c9652;
  border-radius: 12px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  padding: 20px;
  background-color: #ffffff;
}

/* Common paginated component elements */
.paginated-header {
  font-weight: bold;
  margin-bottom: 16px;
  font-size: 1.1rem;
  color: #333;
}

.paginated-content {
  margin: 20px 0px;
  min-height: 140px;
}

.paginated-nav {
  display: flex;
  justify-content: center;
}

.paginated-btn {
  border: 1px solid #2c3e50;
  border-radius: 4px;
  display: grid;
  place-items: center;
  min-width: 28px;
  height: 28px;
  cursor: pointer;
  margin: 0 4px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #eaeaea;
  }
}
</style>
