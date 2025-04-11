<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  saveButtonText: {
    type: String,
    default: 'Зберегти'
  },
  cancelButtonText: {
    type: String,
    default: 'Скасувати'
  }
});

const emit = defineEmits(['save', 'cancel']);

const onSubmit = (form) => {
  emit('save', form);
};

const onCancel = () => {
  emit('cancel');
};
</script>

<template>
  <v-card class="form-card w-100">
    <v-card-title class="bg-primary text-white">
      <span>{{ props.isEditing ? 'Редагувати' : 'Додати' }} {{ title }}</span>
    </v-card-title>

    <v-card-text class="pa-4">
      <v-form @submit.prevent>
        <slot name="form-fields"></slot>
        
        <div class="d-flex justify-end mt-4">
          <v-btn 
            color="grey"
            variant="text"
            class="mr-2"
            @click="onCancel">
            {{ cancelButtonText }}
          </v-btn>
          <v-btn 
            color="primary"
            @click="onSubmit">
            {{ saveButtonText }}
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.form-card {
  margin-bottom: 1rem;
  width: 100% !important;
  max-width: 100% !important;
}

.v-form {
  width: 100%;
  max-width: 100%;
  padding: 1rem 0;
}

/* Фикс для текстовых полей чтобы они были видны полностью */
.v-text-field, .v-textarea, .v-select {
  width: 100%;
  margin-bottom: 1rem;
}
</style>