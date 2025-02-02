<template>
  <div id="app">
    <laptop-shop />
  </div>
</template>

<script>
import LaptopShop from '@/components/LaptopShop/LaptopShop';

export default {
  name: 'App',
  components: {
    LaptopShop
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 60px;
  min-height: 100vh;
}
</style>
