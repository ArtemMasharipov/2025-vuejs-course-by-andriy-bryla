<script setup>
import BaseEntityList from '@/components/ui/BaseEntityList.vue';
import { useAssignmentStore, useFriendStore } from '@/stores';
import { computed, inject, onMounted, ref } from 'vue';
import FriendForm from './FriendForm.vue';

const friendStore = useFriendStore();
const assignmentStore = useAssignmentStore();
const { isLoading, withLoading } = inject('loading');

const isAddingFriend = ref(false);
const isEditingFriend = ref(false);
const currentFriend = ref(null);
const entityListRef = ref(null);

const friends = computed(() => friendStore.allFriends);
const friendsForTable = computed(() => friends.value.map(friend => ({
  id: friend.id,
  name: `${friend.firstName} ${friend.lastName}`,
  raw: friend
})));

const headers = [
  { title: 'Ім\'я та прізвище', key: 'name', align: 'start' },
  { title: 'Дії', key: 'actions', sortable: false, align: 'end' }
];

onMounted(async () => {
  await withLoading(async () => {
    await friendStore.fetchItems();
  });
});

const handleAddFriend = (friend) => {
  currentFriend.value = friend;
  isAddingFriend.value = true;
  isEditingFriend.value = false;
};

const handleEditFriend = (friend) => {
  currentFriend.value = friend.raw;
  isEditingFriend.value = true;
  isAddingFriend.value = false;
};

const handleDeleteFriend = async (friend) => {
  await withLoading(async () => {
    await friendStore.deleteItem(friend.id);
  });
};

const saveFriend = async (friendData) => {
  await withLoading(async () => {
    if (isEditingFriend.value) {
      await friendStore.updateItem({ itemId: currentFriend.value.id, data: friendData });
    } else {
      await friendStore.addItem(friendData);
    }
    
    isAddingFriend.value = false;
    isEditingFriend.value = false;
    currentFriend.value = null;
  });
};

const cancelFriendForm = () => {
  isAddingFriend.value = false;
  isEditingFriend.value = false;
  currentFriend.value = null;
};

const generateDeleteConfirmText = (friend) => {
  return `Ви впевнені, що хочете видалити <strong>${friend.name}</strong>?`;
};
</script>

<template>
  <div>
    <div v-if="isAddingFriend || isEditingFriend" class="entity-form-container">
      <friend-form 
        :friend="currentFriend"
        :is-editing="isEditingFriend"
        @save="saveFriend"
        @cancel="cancelFriendForm">
      </friend-form>
    </div>
    <base-entity-list
      v-else
      ref="entityListRef"
      title="Друзі"
      entityType="friend"
      :items="friendsForTable"
      :headers="headers"
      :empty-item-template="{ firstName: '', lastName: '' }"
      add-button-icon="mdi-account-plus"
      add-button-text="Додати друга"
      empty-list-text="Немає друзів для відображення"
      delete-confirm-title="Видалити друга?"
      :delete-confirm-text-generator="generateDeleteConfirmText"
      @add-item="handleAddFriend"
      @edit-item="handleEditFriend"
      @delete-item="handleDeleteFriend"
    >
      <template #table-row="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td class="text-end">
            <v-btn
              icon="mdi-pencil"
              variant="text"
              color="primary"
              size="small"
              @click="handleEditFriend(item)"
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

<style scoped>
/* Удаляем дублирующие стили, так как они уже есть в entity-list.css */
</style>