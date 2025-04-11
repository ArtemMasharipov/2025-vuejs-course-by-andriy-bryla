<script setup>
import { inject, onMounted } from 'vue';
import GiftsList from '@/components/gifts/GiftsList.vue';

const { setPageTitle } = inject('pageTitle');

onMounted(() => {
  setPageTitle('Подарунки');
});
</script>
<template>
  <div class="entity-list-container">
    <GiftsList />
  </div>
</template>