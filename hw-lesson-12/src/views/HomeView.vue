<template>
  <div class="home">
    <h1>Welcome to Lesson Management System</h1>
    <p>This application allows you to select lessons and teachers to create a personalized study plan.</p>
    
    <div class="feature-section">
      <div class="feature">
        <h2>Select Lessons</h2>
        <p>Browse and choose from our catalog of high-quality lessons.</p>
      </div>
      
      <div class="feature">
        <h2>Choose Teachers</h2>
        <p>Find the best teachers for your selected subjects based on experience and expertise.</p>
      </div>
      
      <div class="feature">
        <h2>Generate Reports</h2>
        <p>Create comprehensive study plans that include your lesson and teacher selections.</p>
      </div>
    </div>
    
    <div class="action-buttons">
      <template v-if="isAuthenticated">
        <router-link :to="{ name: 'lessons' }" class="btn-primary">Get Started</router-link>
      </template>
      <template v-else>
        <router-link :to="{ name: 'login' }" class="btn-primary">Log In</router-link>
        <router-link :to="{ name: 'about' }" class="btn-secondary">Learn More</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: var(--color-heading);
}

p {
  margin-bottom: 30px;
  line-height: 1.6;
}

.feature-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
}

.feature {
  flex: 1;
  min-width: 250px;
  background-color: var(--color-background-soft);
  padding: 20px;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
}

.feature h2 {
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.action-buttons a {
  display: inline-block;
  padding: 12px 25px;
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  transition: opacity 0.3s;
}

.btn-primary {
  background-color: var(--color-heading);
  color: white;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: var(--color-text);
}

.btn-primary:hover, .btn-secondary:hover {
  opacity: 0.9;
}
</style>
