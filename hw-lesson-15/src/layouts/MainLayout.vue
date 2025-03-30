<template>
  <div>
    <div v-if="isLoading">
      <loading-spinner :message="loadingMessage" />
    </div>
    <v-alert v-else-if="hasError" type="error" border="start" class="mb-4">
      {{ errorMessage || 'Sorry, an error occurred' }}
    </v-alert>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '../components/common/LoadingSpinner.vue';

export default {
  name: 'MainLayout',
  components: {
    LoadingSpinner
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    loadingMessage: {
      type: String,
      default: 'Loading...',
    }
  },
}
</script>
