<script setup>
import { computed, inject, ref } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  entityType: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    required: true
  },
  emptyItemTemplate: {
    type: Object,
    required: true
  },
  addButtonIcon: {
    type: String,
    default: 'mdi-plus'
  },
  addButtonText: {
    type: String,
    required: true
  },
  emptyListText: {
    type: String,
    default: 'Немає елементів для відображення'
  },
  deleteConfirmTitle: {
    type: String,
    required: true
  },
  deleteConfirmTextGenerator: {
    type: Function,
    required: true
  }
});

const emit = defineEmits([
  'add-item', 
  'edit-item', 
  'delete-item'
]);

const { isLoading, startLoading, stopLoading } = inject('loading');

const isAddingItem = ref(false);
const isEditingItem = ref(false);
const currentItem = ref(null);
const deleteDialogVisible = ref(false);
const itemToDelete = ref(null);

const itemCount = computed(() => props.items.length);

const startAddItem = () => {
  currentItem.value = { ...props.emptyItemTemplate };
  isAddingItem.value = true;
  isEditingItem.value = false;
  emit('add-item', currentItem.value);
};

const startEditItem = (item) => {
  currentItem.value = { ...item };
  isEditingItem.value = true;
  isAddingItem.value = false;
  emit('edit-item', currentItem.value);
};

const showDeleteConfirmation = (item) => {
  itemToDelete.value = item;
  deleteDialogVisible.value = true;
};

const confirmDeleteItem = (item) => {
  emit('delete-item', item);
  deleteDialogVisible.value = false;
  itemToDelete.value = null;
};

const cancelDelete = () => {
  deleteDialogVisible.value = false;
  itemToDelete.value = null;
};

defineExpose({
  isAddingItem,
  isEditingItem,
  currentItem,
  showDeleteConfirmation,
  setIsAdding(value) {
    isAddingItem.value = value;
  },
  setIsEditing(value) {
    isEditingItem.value = value;
  },
  setCurrentItem(item) {
    currentItem.value = item;
  }
});
</script>

<template>
  <div class="entity-list-container">    
    <v-card class="list-header-card w-100">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ title }} ({{ itemCount }})</span>
        <v-btn 
          color="primary" 
          :prepend-icon="addButtonIcon" 
          @click="startAddItem">
          {{ addButtonText }}
        </v-btn>
      </v-card-title>
    </v-card>
    
    <v-card v-if="items.length > 0" class="w-100">
      <v-data-table-virtual
        :headers="headers"
        :items="items"
        item-value="id"
        class="elevation-1"
        fixed-header
        disable-sort
        height="400">
        <template #item="slotProps">
          <slot name="table-row" v-bind="slotProps"></slot>
        </template>
      </v-data-table-virtual>
    </v-card>
    
    <v-card v-else class="pa-4 text-center w-100">
      <v-card-text>
        <p class="text-body-1">{{ emptyListText }}</p>
      </v-card-text>
    </v-card>
    
    <confirm-dialog
      :title="deleteConfirmTitle"
      :visible="deleteDialogVisible"
      @update:visible="deleteDialogVisible = $event"
      :item="itemToDelete"
      @confirm="confirmDeleteItem"
      @cancel="cancelDelete"
    >
      <template #message="{ item }">
        <p v-html="deleteConfirmTextGenerator(item)"></p>
      </template>
    </confirm-dialog>
    
    <slot name="form"></slot>
  </div>
</template>

<style scoped></style>