<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <nav-bar />
    
    <main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
@import './assets/styles/variables.css';
@import './assets/styles/buttons.css';
@import './assets/styles/forms.css';
@import './assets/styles/cards.css';
@import './assets/styles/layout.css';

/* Reset styles */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

html {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  /* Force scrollbar to always be visible to prevent layout shifts */
  overflow-y: scroll;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  line-height: var(--line-height);
  color: var(--color-text);
  background-color: var(--color-gray-lighter);
  margin: 0;
  padding: 0;
  width: 100%;
  /* Prevent horizontal overflow */
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%; /* Changed from 100vw to prevent scrollbar-related shifts */
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
}

.main-content {
  flex: 1;
  padding-top: calc(var(--header-height) + var(--space-lg));
  padding-bottom: var(--space-lg);
  width: 100%;
  /* Ensure content doesn't cause horizontal scrolling */
  overflow-x: hidden;
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: var(--space-md);
  font-weight: var(--font-weight-medium);
  line-height: 1.2;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .container {
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }
}
</style>
