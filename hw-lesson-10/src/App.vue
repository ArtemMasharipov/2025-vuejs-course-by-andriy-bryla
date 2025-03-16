<template>
  <div class="app-container">
    <nav-bar />
    <main class="main-content">
      <router-view />
    </main>
    <footer>
      <p>&copy; {{ currentYear }} Bus Management System. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import NavBar from './components/common/NavBar.vue';

export default {
  name: 'app',
  components: {
    NavBar
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
@import '@/assets/main.css';

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
  flex: 1;
}

footer {
  margin-top: 2rem;
  padding: 1rem 0;
  text-align: center;
  color: #6c757d;
  border-top: 1px solid #dee2e6;
}
</style>
