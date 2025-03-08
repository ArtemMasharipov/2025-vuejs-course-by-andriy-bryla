<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Сторінку не знайдено</h2>
    <p>Сторінка, яку ви шукаєте, не існує або була переміщена.</p>
    <router-link :to="{ name: 'Home' }" class="home-link">
      Повернутися на головну
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'not-found-view'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 60px 20px;
}

h1 {
  font-size: 6em;
  margin: 0;
  color: #333;
}

h2 {
  font-size: 2em;
  margin: 0;
  margin-bottom: 20px;
}

p {
  color: #666;
  margin-bottom: 30px;
}

.home-link {
  display: inline-block;
  background-color: #4c8bf5;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.home-link:hover {
  opacity: 0.9;
}
</style>
