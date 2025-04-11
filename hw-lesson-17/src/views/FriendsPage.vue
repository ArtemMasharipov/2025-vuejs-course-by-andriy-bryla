<script setup>
import { inject, onMounted } from 'vue';
import FriendsList from '@/components/friends/FriendsList.vue';

const { setPageTitle } = inject('pageTitle');

onMounted(() => {
  setPageTitle('Друзі');
});
</script>

<template>
  <div class="entity-list-container">
    <friends-list />
  </div>
</template>