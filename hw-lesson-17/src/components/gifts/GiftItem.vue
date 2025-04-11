<script setup>
import ItemCard from '@/components/ui/ItemCard.vue';

const props = defineProps({
  gift: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <item-card :item="gift" @edit="$emit('edit', gift)" @delete="$emit('delete', gift)">
    <template #title>{{ gift.title }}</template>
    
    <p v-if="gift.description">{{ gift.description }}</p>
  </item-card>
</template>