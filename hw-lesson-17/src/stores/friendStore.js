import { defineStore } from 'pinia';
import { useAssignmentStore } from './assignmentStore';
import getModuleSettingsObject from './helpers/GetModuleSettingsObject';

const friendSettings = getModuleSettingsObject('friends');

export const useFriendStore = defineStore('friends', {
  state: friendSettings.state,
  
  getters: {
    ...friendSettings.getters,
    totalFriends: (state) => (state.friends || []).length
  },

  actions: {
    ...friendSettings.actions,
    
    async deleteItem(itemId) {
      const assignmentStore = useAssignmentStore();
      await assignmentStore.deleteAssignmentsByFriendId(itemId);
      return friendSettings.actions.deleteItem.call(this, itemId);
    }
  }
});