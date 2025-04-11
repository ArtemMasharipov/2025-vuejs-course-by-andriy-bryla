<script setup>
import BaseEntityList from '@/components/ui/BaseEntityList.vue';
import { useGiftStore } from '@/stores';
import { computed, inject, onMounted, ref } from 'vue';
import GiftForm from './GiftForm.vue';

const giftStore = useGiftStore();
const { isLoading, withLoading } = inject('loading');

const isAddingGift = ref(false);
const isEditingGift = ref(false);
const currentGift = ref(null);
const entityListRef = ref(null);

const gifts = computed(() => giftStore.allGifts || []);
const giftsForTable = computed(() => gifts.value.map(gift => ({
  id: gift.id,
  name: gift.title,
  description: gift.description || '-',
  raw: gift
})));

const headers = [
  { title: 'Назва', key: 'name', align: 'start' },
  { title: 'Опис', key: 'description', align: 'start' },
  { title: 'Дії', key: 'actions', sortable: false, align: 'end' }
];

onMounted(async () => {
  await withLoading(async () => {
    await giftStore.fetchItems();
  });
});

const handleAddGift = (gift) => {
  currentGift.value = gift;
  isAddingGift.value = true;
  isEditingGift.value = false;
};

const handleEditGift = (gift) => {
  currentGift.value = gift.raw;
  isEditingGift.value = true;
  isAddingGift.value = false;
};

const handleDeleteGift = async (gift) => {
  await withLoading(async () => {
    await giftStore.deleteItem(gift.id);
  });
};

const saveGift = async (giftData) => {
  await withLoading(async () => {
    if (isEditingGift.value) {
      await giftStore.updateItem({ itemId: currentGift.value.id, data: giftData });
    } else {
      await giftStore.addItem(giftData);
    }
    
    isAddingGift.value = false;
    isEditingGift.value = false;
    currentGift.value = null;
  });
};

const cancelGiftForm = () => {
  isAddingGift.value = false;
  isEditingGift.value = false;
  currentGift.value = null;
};

const generateDeleteConfirmText = (gift) => {
  return `Ви впевнені, що хочете видалити подарунок <strong>"${gift.name}"</strong>?`;
};
</script>

<template>
  <div>
    <div v-if="isAddingGift || isEditingGift" class="entity-form-container">
      <gift-form 
        :gift="currentGift"
        :is-editing="isEditingGift"
        @save="saveGift"
        @cancel="cancelGiftForm">
      </gift-form>
    </div>
    <base-entity-list
      v-else
      ref="entityListRef"
      title="Подарунки"
      entityType="gift"
      :items="giftsForTable"
      :headers="headers"
      :empty-item-template="{ title: '', description: '' }"
      add-button-icon="mdi-gift"
      add-button-text="Додати подарунок"
      empty-list-text="Немає подарунків для відображення"
      delete-confirm-title="Видалити подарунок?"
      :delete-confirm-text-generator="generateDeleteConfirmText"
      @add-item="handleAddGift"
      @edit-item="handleEditGift"
      @delete-item="handleDeleteGift"
    >
      <template #table-row="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td class="text-end">
            <v-btn
              icon="mdi-pencil"
              variant="text"
              color="primary"
              size="small"
              @click="handleEditGift(item)"
              title="Редагувати">
            </v-btn>
            <v-btn
              icon="mdi-delete"
              variant="text"
              color="error"
              size="small"
              @click="entityListRef.showDeleteConfirmation(item)"
              title="Видалити">
            </v-btn>
          </td>
        </tr>
      </template>
    </base-entity-list>
  </div>
</template>