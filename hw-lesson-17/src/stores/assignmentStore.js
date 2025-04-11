import { defineStore } from 'pinia';
import { useFriendStore } from './friendStore';
import { useGiftStore } from './giftStore';
import getModuleSettingsObject from './helpers/GetModuleSettingsObject';

const assignmentSettings = getModuleSettingsObject('assignments');

export const useAssignmentStore = defineStore('assignments', {
  state: assignmentSettings.state,

  getters: {
    ...assignmentSettings.getters,
    
    assignmentsWithDetails: (state) => {
      const friendStore = useFriendStore();
      const giftStore = useGiftStore();
      
      return (state.assignments || []).map(assignment => {
        const friend = friendStore.getItemById(assignment.friendId);
        const gift = giftStore.getItemById(assignment.giftId);
        
        return {
          ...assignment,
          friend,
          gift
        };
      });
    },
    
    totalAssignments: (state) => (state.assignments || []).length,
    
    getAssignmentsForFriend: (state) => (friendId) => {
      return (state.assignments || []).filter(assignment => 
        assignment.friendId === friendId
      );
    },

    getAssignmentsForGift: (state) => (giftId) => {
      return (state.assignments || []).filter(assignment => 
        assignment.giftId === giftId
      );
    }
  },

  actions: {
    ...assignmentSettings.actions,
    
    async updateStatus(id, status) {
      return this.updateItem({ itemId: id, data: { status } });
    },
    
    isGiftAvailable(giftId) {
      return !this.assignments.some(assignment => assignment.giftId === giftId);
    },
    
    async deleteAssignmentsByRelation(fieldName, valueId) {
      const assignmentsToDelete = this.assignments.filter(a => a[fieldName] === valueId);
      const deletePromises = [];
      
      for (const assignment of assignmentsToDelete) {
        deletePromises.push(assignmentSettings.actions.deleteItem.call(this, assignment.id));
      }
      
      await Promise.all(deletePromises);
      return assignmentsToDelete.length;
    },
    
    async deleteAssignmentsByFriendId(friendId) {
      return this.deleteAssignmentsByRelation('friendId', friendId);
    },
    
    async deleteAssignmentsByGiftId(giftId) {
      return this.deleteAssignmentsByRelation('giftId', giftId);
    }
  }
});