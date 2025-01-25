<template>
  <div class="container">
    <h1>Система бронювання готелю</h1>
    <booking-container />
  </div>
</template>

<script>
import BookingContainer from "./components/BookingContainer.vue";

export default {
  name: "App",
  components: {
    BookingContainer
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  color: #42b983;
  margin-bottom: 30px;
}
</style>
