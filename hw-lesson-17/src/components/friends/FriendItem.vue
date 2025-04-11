<script setup>
import ItemCard from '@/components/ui/ItemCard.vue';

const props = defineProps({
  friend: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <item-card 
    :item="friend" 
    avatar-color="primary"
    :avatar-content="friend.firstName.charAt(0).toUpperCase()"
    @edit="$emit('edit', friend)" 
    @delete="$emit('delete', friend)">
    <template #title>{{ friend.firstName }} {{ friend.lastName }}</template>
    
    <v-list-item v-if="friend.email">
      <template #prepend>
        <v-icon icon="mdi-email"></v-icon>
      </template>
      <v-list-item-title>{{ friend.email }}</v-list-item-title>
    </v-list-item>
    
    <v-list-item v-if="friend.phone">
      <template #prepend>
        <v-icon icon="mdi-phone"></v-icon>
      </template>
      <v-list-item-title>{{ friend.phone }}</v-list-item-title>
    </v-list-item>
  </item-card>
</template>