<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or you don't have permission to view it.</p>
    <router-link to="/" class="home-link">Return to Home Page</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px 20px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: var(--color-heading);
}

h2 {
  font-size: 2rem;
  margin: 0;
  margin-bottom: 20px;
  color: var(--color-heading);
}

p {
  margin-bottom: 30px;
  color: var(--color-text);
  line-height: 1.6;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--color-heading);
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.home-link:hover {
  opacity: 0.9;
}
</style>
