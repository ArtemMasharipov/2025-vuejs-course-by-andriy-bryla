<script setup>
import ItemCard from '@/components/ui/ItemCard.vue';
import { statusConfig } from '@/utils/formatters';
import { computed } from 'vue';

const props = defineProps({
  assignment: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete', 'updateStatus']);

const statusDetails = computed(() => {
  return statusConfig[props.assignment.status] || statusConfig.planned;
});
</script>

<template>
  <item-card 
    :item="assignment" 
    :color="statusDetails.color + '-lighten-5'"
    :avatar-color="statusDetails.color"
    :avatar-icon="statusDetails.icon"
    @edit="$emit('edit', assignment)" 
    @delete="$emit('delete', assignment)">
    <template #title>{{ assignment.gift?.name || 'Невідомий подарунок' }}</template>
    
    <v-chip :color="statusDetails.color" class="mb-2">
      <v-icon start :icon="statusDetails.icon"></v-icon>
      {{ statusDetails.text }}
    </v-chip>
    
    <div class="d-flex align-center mb-2 mt-3">
      <v-avatar color="primary" class="mr-3">
        {{ assignment.friend?.firstName?.charAt(0).toUpperCase() || '?' }}
      </v-avatar>
      <div>
        <div class="font-weight-medium">{{ assignment.friend?.firstName || 'Невідомий друг' }} {{ assignment.friend?.lastName || '' }}</div>
      </div>
    </div>
  </item-card>
</template>