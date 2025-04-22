<template>
  <v-container class="d-flex justify-center align-center flex-column" style="min-height: 80vh;">
    <v-icon size="100" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
    <p class="text-body-1 text-center mb-6">
      The page you are looking for does not exist or has been moved.
    </p>
    
    <v-btn 
      color="primary" 
      size="large" 
      :to="{ name: 'home' }"
    >
      {{ $t('errors.returnHome') }}
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundView'
};
</script>