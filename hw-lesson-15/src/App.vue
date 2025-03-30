<template>
  <v-app class="app-container">
    <nav-bar />
    <v-main>
      <v-container fluid class="main-content">
        <router-view />
      </v-container>
    </v-main>
    <footer-component />
  </v-app>
</template>

<script>
import NavBar from './components/common/NavBar.vue';
import FooterComponent from './components/common/FooterComponent.vue';

export default {
  name: 'app',
  components: {
    NavBar,
    FooterComponent
  }
}
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding-bottom: 60px;
}
</style>
