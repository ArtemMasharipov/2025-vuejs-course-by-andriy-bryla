<script setup>
import BaseForm from '@/components/ui/BaseForm.vue';
import { ref, watchEffect } from 'vue';

const props = defineProps({
  gift: {
    type: Object,
    default: () => ({ title: '', description: '' })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save', 'cancel']);

const valid = ref(false);
const giftData = ref({
  title: '',
  description: ''
});

const titleRules = [
  v => !!v || 'Назва подарунку обов\'язкова',
  v => v.length <= 100 || 'Назва не може бути довшою за 100 символів'
];

watchEffect(() => {
  if (props.gift) {
    giftData.value = { 
      title: props.gift.title || '',
      description: props.gift.description || ''
    };
  }
});

const save = () => {
  if (valid.value) {
    emit('save', { ...giftData.value });
  }
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <base-form 
    title="подарунок" 
    :is-editing="isEditing"
    @save="save"
    @cancel="cancel">
    <template #form-fields>
      <v-form v-model="valid" @submit.prevent>
        <v-text-field
          v-model="giftData.title"
          :rules="titleRules"
          label="Назва подарунку"
          required
          autofocus>
        </v-text-field>
        
        <v-textarea
          v-model="giftData.description"
          label="Опис"
          rows="3"
          auto-grow>
        </v-textarea>
      </v-form>
    </template>
  </base-form>
</template>