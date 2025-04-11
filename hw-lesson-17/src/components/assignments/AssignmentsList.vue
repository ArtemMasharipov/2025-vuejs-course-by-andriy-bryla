<script setup>
import BaseEntityList from '@/components/ui/BaseEntityList.vue';
import { useAssignmentStore, useFriendStore, useGiftStore } from '@/stores';
import { statusConfig } from '@/utils/formatters';
import { computed, inject, onMounted, ref } from 'vue';
import AssignmentForm from './AssignmentForm.vue';

const assignmentStore = useAssignmentStore();
const friendStore = useFriendStore();
const giftStore = useGiftStore();
const { isLoading, withLoading } = inject('loading');

const isAddingAssignment = ref(false);
const isEditingAssignment = ref(false);
const currentAssignment = ref(null);
const entityListRef = ref(null);

const assignments = computed(() => assignmentStore.assignments || []);

const getStatusText = (status) => {
  return statusConfig[status]?.text || 'Заплановано';
};

const assignmentsWithDetails = computed(() => {
  return assignments.value.map(assignment => {
    const friend = friendStore.getItemById(assignment.friendId);
    const gift = giftStore.getItemById(assignment.giftId);
    
    return {
      id: assignment.id,
      friendName: friend ? `${friend.firstName} ${friend.lastName}` : 'Невідомий друг',
      giftName: gift ? gift.title || gift.name : 'Невідомий подарунок',
      statusText: getStatusText(assignment.status),
      statusColor: statusConfig[assignment.status]?.color || 'warning',
      statusIcon: statusConfig[assignment.status]?.icon || 'mdi-calendar-clock',
      status: assignment.status,
      raw: assignment
    };
  });
});

const headers = [
  { title: 'Друг', key: 'friendName', align: 'start' },
  { title: 'Подарунок', key: 'giftName', align: 'start' },
  { title: 'Статус', key: 'statusText', align: 'center' },
  { title: 'Дії', key: 'actions', sortable: false, align: 'end' }
];

onMounted(async () => {
  await withLoading(async () => {
    await Promise.all([
      friendStore.fetchItems(),
      giftStore.fetchItems(),
      assignmentStore.fetchItems()
    ]);
  });
});

const handleAddAssignment = (assignment) => {
  currentAssignment.value = { friendId: null, giftId: null, status: 'planned' };
  isAddingAssignment.value = true;
  isEditingAssignment.value = false;
};

const handleEditAssignment = (assignment) => {
  currentAssignment.value = assignment.raw;
  isEditingAssignment.value = true;
  isAddingAssignment.value = false;
};

const handleDeleteAssignment = async (assignment) => {
  await withLoading(async () => {
    await assignmentStore.deleteItem(assignment.id);
  });
};

const saveAssignment = async (assignmentData) => {
  await withLoading(async () => {
    if (isEditingAssignment.value) {
      await assignmentStore.updateItem({ itemId: currentAssignment.value.id, data: assignmentData });
    } else {
      await assignmentStore.addItem(assignmentData);
    }
    
    isAddingAssignment.value = false;
    isEditingAssignment.value = false;
    currentAssignment.value = null;
  });
};

const cancelAssignmentForm = () => {
  isAddingAssignment.value = false;
  isEditingAssignment.value = false;
  currentAssignment.value = null;
};

const updateAssignmentStatus = async (id, status) => {
  await withLoading(async () => {
    await assignmentStore.updateItem({ itemId: id, data: { status } });
  });
};

const generateDeleteConfirmText = (assignment) => {
  return `Ви впевнені, що хочете видалити призначення 
          <strong>${assignment.giftName || 'подарунку'}</strong> 
          для <strong>${assignment.friendName || 'друга'}</strong>?`;
};
</script>

<template>
  <div>
    <div v-if="isAddingAssignment || isEditingAssignment" class="entity-form-container">
      <assignment-form 
        :assignment="currentAssignment"
        :is-editing="isEditingAssignment"
        @save="saveAssignment"
        @cancel="cancelAssignmentForm">
      </assignment-form>
    </div>
    <base-entity-list
      v-else
      ref="entityListRef"
      title="Призначення подарунків"
      entityType="assignment"
      :items="assignmentsWithDetails"
      :headers="headers"
      :empty-item-template="{ friendId: null, giftId: null, status: 'planned' }"
      add-button-icon="mdi-gift-outline"
      add-button-text="Нове призначення"
      empty-list-text="Немає призначень подарунків."
      delete-confirm-title="Видалити призначення подарунку?"
      :delete-confirm-text-generator="generateDeleteConfirmText"
      @add-item="handleAddAssignment"
      @edit-item="handleEditAssignment"
      @delete-item="handleDeleteAssignment"
    >
      <template #table-row="{ item }">
        <tr>
          <td>{{ item.friendName }}</td>
          <td>{{ item.giftName }}</td>
          <td class="text-center">
            <v-chip 
              :color="item.statusColor"
              size="small">
              <v-icon start size="x-small" :icon="item.statusIcon"></v-icon>
              {{ item.statusText }}
            </v-chip>
            <v-menu>
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-dots-vertical"
                  variant="text"
                  size="x-small"
                  density="compact"
                  class="ms-1">
                </v-btn>
              </template>
              <v-list density="compact">
                <v-list-item
                  v-for="(status, key) in statusConfig"
                  :key="key"
                  :disabled="item.status === key"
                  @click="updateAssignmentStatus(item.id, key)">
                  <v-list-item-title>
                    <v-icon :icon="status.icon" :color="status.color" class="mr-2"></v-icon>
                    {{ status.text }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
          <td class="text-end">
            <v-btn
              icon="mdi-pencil"
              variant="text"
              color="primary"
              size="small"
              @click="handleEditAssignment(item)"
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