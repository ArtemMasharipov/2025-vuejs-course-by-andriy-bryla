<template>
  <div id="app">
    <product-grid />
  </div>
</template>

<script>
import ProductGrid from './components/ProductGrid.vue';

export default {
  name: 'App',
  components: {
    ProductGrid
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
}
</style>
