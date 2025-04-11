<template>
  <div class="welcome-container entity-list-container">
    <h1 class="text-h4 mb-4">Вітаємо у резиденції Миколая!</h1>
    <p class="text-subtitle-1">Тут Ви зможете обрати подарунки для своїх друзів.</p>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';

const { setPageTitle } = inject('pageTitle');

onMounted(() => {
  setPageTitle('Головна');
});
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding: 2rem 0;
  height: 70vh;
}
</style>