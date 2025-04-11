<script setup>
import BaseForm from '@/components/ui/BaseForm.vue';
import { useFriendStore, useGiftStore } from '@/stores';
import { computed, onMounted, ref, watchEffect } from 'vue';

const props = defineProps({
  assignment: {
    type: Object,
    default: () => ({ friendId: null, giftId: null, status: 'planned' })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save', 'cancel']);

const friendStore = useFriendStore();
const giftStore = useGiftStore();

const valid = ref(false);
const assignmentData = ref({
  friendId: null,
  giftId: null,
  status: 'planned'
});

const friendIdRules = [v => !!v || "Друг обов'язковий"];
const giftIdRules = [v => !!v || "Подарунок обов'язковий"];

const friends = computed(() => friendStore.friends || []);
const gifts = computed(() => giftStore.gifts || []);

const friendOptions = computed(() => {
  return friends.value.map(friend => ({
    id: friend.id,
    title: `${friend.firstName} ${friend.lastName}`
  }));
});

const giftOptions = computed(() => {
  return gifts.value.map(gift => {
    return {
      id: gift.id,
      title: gift.title || gift.name || 'Подарунок без назви'
    };
  });
});

onMounted(async () => {
  await friendStore.fetchItems();
  await giftStore.fetchItems();
});

watchEffect(() => {
  if (props.assignment) {
    assignmentData.value = { 
      friendId: props.assignment.friendId || null,
      giftId: props.assignment.giftId || null,
      status: props.assignment.status || 'planned'
    };
  }
});

const save = () => {
  if (valid.value) {
    emit('save', { ...assignmentData.value });
  }
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <base-form 
    title="призначення" 
    :is-editing="isEditing"
    @save="save"
    @cancel="cancel">
    <template #form-fields>
      <v-form v-model="valid" @submit.prevent>
        <v-select
          v-model="assignmentData.friendId"
          :items="friendOptions"
          item-value="id"
          item-title="title"
          label="Друг"
          :rules="friendIdRules"
          required>
        </v-select>
        
        <v-select
          v-model="assignmentData.giftId"
          :items="giftOptions"
          item-title="title"
          item-value="id"
          label="Подарунок"
          :rules="giftIdRules"
          required>
        </v-select>
      </v-form>
    </template>
  </base-form>
</template>