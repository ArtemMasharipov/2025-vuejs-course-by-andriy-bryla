<template>
  <div id="app">
    <header class="app-header">
      <h1>ДЗ. Урок №7. Vuex</h1>
      <h2>Задача 1. Система оцінювання студентів</h2>
    </header>
    <main class="app-main">
      <student-list />
    </main>
  </div>
</template>

<script>
import StudentList from "./components/StudentList.vue";

export default {
  name: "App",
  components: {
    StudentList
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.app-header h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

h2 {
  text-align: center;
  color: #2c3e50;
  font-size: 1.25rem;
}
.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
