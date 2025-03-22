<template>
  <div class="header-content">
    <h1 class="app-title">Lesson Management System</h1>

    <nav class="main-nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link v-if="isAuthenticated" :to="{ name: 'lessons' }">Lessons</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      
      <div class="auth-controls">
        <template v-if="isAuthenticated && user">
          <span class="user-info">Hello, {{ user.username }}</span>
          <button @click="logout" class="logout-btn">Logout</button>
        </template>
        <router-link v-else :to="{ name: 'login' }" class="login-btn">Login</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions('auth', {
      performLogout: 'logout'
    }),
    
    logout() {
      this.performLogout(this.$router);
    }
  }
}
</script>

<style scoped>
.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: var(--header-height);
}

.app-title {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin: 0;
  white-space: nowrap;
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.main-nav a {
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.main-nav a.router-link-active {
  background-color: hsla(160, 100%, 37%, 0.2);
  color: var(--color-heading);
}

.auth-controls {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  font-size: 0.9rem;
}

.logout-btn, .login-btn {
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
}

.logout-btn:hover {
  background-color: #ee5253;
}

.login-btn {
  background-color: var(--color-heading);
  color: white !important; /* Принудительно переопределяем цвет текста */
  text-decoration: none;
  display: inline-block; /* Обеспечивает правильное отображение кнопки */
}

.login-btn:hover {
  opacity: 0.9;
}

@media (min-width: 768px) {
  .header-content {
    flex-direction: row;
    justify-content: flex-start;
  }
  
  .app-title {
    margin-right: 2rem;
  }
  
  .main-nav {
    flex-grow: 1;
  }
}
</style>
