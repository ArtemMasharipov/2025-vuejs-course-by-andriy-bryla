<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="app-container">
        <nav-bar />
      </div>
    </header>
  
    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/layout/NavBar.vue';

export default {
  components: {
    NavBar
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* Removed duplicate navbar styling that was conflicting with NavBar.vue */
</style>
