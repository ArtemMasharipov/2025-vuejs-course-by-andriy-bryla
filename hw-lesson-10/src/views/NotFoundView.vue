<template>
  <div class="not-found">
    <div class="alert alert-warning">
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <router-link to="/" class="btn btn-primary mt-3">Go to Home Page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  text-align: center;
}

.alert {
  max-width: 500px;
  width: 100%;
}
</style>
