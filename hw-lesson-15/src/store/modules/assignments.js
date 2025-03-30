import { isDuplicateAssignment } from '@/helpers/validationUtils';
import getModuleSettingsObject from '../../store/helpers/GetModuleSettingsObject';

const assignmentsModule = getModuleSettingsObject('assignments');

assignmentsModule.getters = {
  ...assignmentsModule.getters,
  getAssignments: (state) => state.assignments,
  getAssignmentById: (state) => (id) => state.assignments.find(item => item.id === id),
  getAssignmentsWithDetails: (state, getters, rootState, rootGetters) => {
    return state.assignments.map(assignment => {
      const driver = rootGetters['drivers/getItemById'](assignment.driverId) || {};
      const bus = rootGetters['buses/getItemById'](assignment.busId) || {};
      
      return {
        ...assignment,
        driverName: driver.name || 'Unknown Driver',
        busModel: bus.model || 'Unknown Bus',
        busLicensePlate: bus.licensePlate || 'N/A'
      };
    });
  }
};

const originalActions = assignmentsModule.actions;
assignmentsModule.actions = {
  ...originalActions,
  
  loadAssignments({ dispatch }) {
    return dispatch('loadList');
  },
  
  addItem({ dispatch, commit }, itemData) {
    const { id, ...dataWithoutId } = itemData;
    
    if (dataWithoutId.driverId && dataWithoutId.busId && 
        isDuplicateAssignment(this.state.assignments.assignments, dataWithoutId)) {
      commit('setError', 'This driver is already assigned to this bus.');
      return Promise.reject(new Error('This driver is already assigned to this bus.'));
    }
    
    return originalActions.addItem({ dispatch, commit }, dataWithoutId);
  },
  
  updateItem({ dispatch, commit, getters }, { itemId, data }) {
    const { id, ...cleanData } = data;
    
    if (isDuplicateAssignment(this.state.assignments.assignments, {...cleanData, id: itemId})) {
      commit('setError', 'This driver is already assigned to this bus.');
      return Promise.reject(new Error('This driver is already assigned to this bus.'));
    }
    
    return originalActions.updateItem({ dispatch, commit }, { itemId, data: cleanData });
  },
  
  deleteAssignmentsByDriverId({ dispatch, state }, driverId) {
    const assignmentsToDelete = state.assignments.filter(
      assignment => assignment.driverId === driverId
    );
    
    const deletePromises = assignmentsToDelete.map(assignment => 
      dispatch('deleteItem', assignment.id).catch(() => {})
    );
    
    return Promise.all(deletePromises).then(() => assignmentsToDelete.length);
  },
  
  deleteAssignmentsByBusId({ dispatch, state }, busId) {
    const assignmentsToDelete = state.assignments.filter(
      assignment => assignment.busId === busId
    );
    
    const deletePromises = assignmentsToDelete.map(assignment => 
      dispatch('deleteItem', assignment.id).catch(() => {})
    );
    
    return Promise.all(deletePromises).then(() => assignmentsToDelete.length);
  },
  
  createAssignment({ dispatch }, itemData) {
    return dispatch('addItem', itemData);
  },
  
  updateAssignment({ dispatch }, { itemId, data }) {
    return dispatch('updateItem', { itemId, data });
  },
  
  deleteAssignment({ dispatch }, id) {
    return dispatch('deleteItem', id);
  }
};

export default assignmentsModule;