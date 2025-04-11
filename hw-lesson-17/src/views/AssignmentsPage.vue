<script setup>
import { inject, onMounted } from 'vue';
import AssignmentsList from '@/components/assignments/AssignmentsList.vue';

const { setPageTitle } = inject('pageTitle');

onMounted(() => {
  setPageTitle('Призначення подарунків');
});
</script>

<template>
  <div class="entity-list-container">
    <assignments-list />
  </div>
</template>