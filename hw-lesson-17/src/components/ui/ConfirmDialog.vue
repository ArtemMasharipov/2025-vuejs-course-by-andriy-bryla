<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Видалити'
  },
  cancelText: {
    type: String,
    default: 'Скасувати'
  },
  warningText: {
    type: String,
    default: 'Це неможливо скасувати.'
  },
  item: {
    type: Object,
    default: null
  },
  visible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['confirm', 'cancel', 'update:visible']);

const confirmDelete = () => {
  emit('confirm', props.item);
};

const cancelDelete = () => {
  emit('cancel');
  closeDialog();
};

const closeDialog = () => {
  emit('update:visible', false);
};
</script>

<template>
  <v-dialog 
    :model-value="visible" 
    @update:model-value="newValue => emit('update:visible', newValue)"
    max-width="500">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text v-if="item">
        <slot name="message" :item="item"></slot>
        <p v-if="warningText" class="mt-2 text-red">{{ warningText }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="cancelDelete">{{ cancelText }}</v-btn>
        <v-btn color="error" @click="confirmDelete">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>