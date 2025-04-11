import { defineStore } from 'pinia';
import { useAssignmentStore } from './assignmentStore';
import getModuleSettingsObject from './helpers/GetModuleSettingsObject';

const giftSettings = getModuleSettingsObject('gifts');

export const useGiftStore = defineStore('gifts', {
  state: giftSettings.state,
  
  getters: {
    ...giftSettings.getters,
    totalGifts: (state) => (state.gifts || []).length
  },

  actions: {
    ...giftSettings.actions,
    
    async deleteItem(itemId) {
      const assignmentStore = useAssignmentStore();
      await assignmentStore.deleteAssignmentsByGiftId(itemId);
      return giftSettings.actions.deleteItem.call(this, itemId);
    }
  }
});