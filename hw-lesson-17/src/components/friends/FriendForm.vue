<script setup>
import BaseForm from '@/components/ui/BaseForm.vue';
import { ref, watchEffect } from 'vue';

const props = defineProps({
  friend: {
    type: Object,
    default: () => ({ firstName: '', lastName: '' })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save', 'cancel']);

const valid = ref(false);
const friendData = ref({
  firstName: '',
  lastName: ''
});

const firstNameRules = [
  v => !!v || "Ім'я обов'язкове",
  v => v.length <= 50 || "Ім'я не може бути довшим за 50 символів"
];

const lastNameRules = [
  v => !!v || "Прізвище обов'язкове",
  v => v.length <= 50 || "Прізвище не може бути довшим за 50 символів"
];

watchEffect(() => {
  if (props.friend) {
    friendData.value = { 
      firstName: props.friend.firstName || '',
      lastName: props.friend.lastName || ''
    };
  }
});

const save = () => {
  if (valid.value) {
    emit('save', { ...friendData.value });
  }
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <base-form 
    title="друга" 
    :is-editing="isEditing"
    @save="save"
    @cancel="cancel">
    <template #form-fields>
      <v-form v-model="valid" @submit.prevent>
        <v-text-field
          v-model="friendData.firstName"
          :rules="firstNameRules"
          label="Ім'я"
          required
          autofocus>
        </v-text-field>
        
        <v-text-field
          v-model="friendData.lastName"
          :rules="lastNameRules"
          label="Прізвище"
          required>
        </v-text-field>
      </v-form>
    </template>
  </base-form>
</template>