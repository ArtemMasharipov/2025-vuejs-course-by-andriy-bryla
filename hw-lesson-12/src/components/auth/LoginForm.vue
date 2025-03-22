<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div v-if="hasError" class="error-container">{{ errorMessage }}</div>
    
    <div class="form-group">
      <label for="username">Username:</label>
      <input 
        id="username" 
        v-model="username" 
        type="text" 
        placeholder="Enter username"
        :disabled="isLoading"
        required
      >
    </div>
    
    <div class="form-group">
      <label for="password">Password:</label>
      <input 
        id="password" 
        v-model="password" 
        type="password" 
        placeholder="Enter password"
        :disabled="isLoading"
        required
      >
    </div>
    
    <button type="submit" :disabled="isLoading || !username || !password" class="btn-primary">
      <span v-if="isLoading" class="button-spinner"></span>
      <span v-if="isLoading">Logging in...</span>
      <span v-else>Login</span>
    </button>
  </form>
  <div class="hint">
    <p>Use username: "user" and password: "password" for testing</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoading', 'hasError', 'errorMessage'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    async handleSubmit() {
      const success = await this.login({
        username: this.username,
        password: this.password
      });
      
      if (success) {
        const redirectPath = this.$route.query.redirect || '/lessons';
        this.$router.push(redirectPath);
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: var(--color-heading);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  opacity: 0.9;
}

.error-container {
  color: red;
  margin-bottom: 15px;
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 4px;
}

.hint {
  margin-top: var(--section-spacing);
  font-size: 0.8em;
  color: #666;
  text-align: center;
}

.button-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
