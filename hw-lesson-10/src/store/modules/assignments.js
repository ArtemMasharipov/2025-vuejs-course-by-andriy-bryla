import { isDuplicateAssignment } from '@/helpers/validationUtils';
import createStoreModule from '../../helpers/createStoreModule';

const customOptions = {
  getters: {
    getAssignmentsWithDetails: (state, getters, rootState, rootGetters) => {
      return state.assignments.map(assignment => {
        const driver = rootGetters['drivers/getDriverById'](assignment.driverId) || {};
        const bus = rootGetters['buses/getBusById'](assignment.busId) || {};
        
        return {
          ...assignment,
          driverName: driver.name || 'Unknown Driver',
          busModel: bus.model || 'Unknown Bus',
          busLicensePlate: bus.licensePlate || 'N/A'
        };
      });
    }
  },
  actions: {
    deleteAssignmentsByDriverId({ state, commit, dispatch }, driverId) {
      try {
        const assignmentsToDelete = state.assignments.filter(
          assignment => assignment.driverId === driverId
        );
        
        assignmentsToDelete.forEach(assignment => {
          commit('deleteAssignment', assignment.id);
        });
        
        if (assignmentsToDelete.length > 0) {
          dispatch('saveAssignments');
        }
        
        return assignmentsToDelete.length;
      } catch (error) {
        console.error(`Error deleting assignments for driver ${driverId}:`, error);
        throw error;
      }
    },
    
    deleteAssignmentsByBusId({ state, commit, dispatch }, busId) {
      try {
        const assignmentsToDelete = state.assignments.filter(
          assignment => assignment.busId === busId
        );
        
        assignmentsToDelete.forEach(assignment => {
          commit('deleteAssignment', assignment.id);
        });
        
        if (assignmentsToDelete.length > 0) {
          dispatch('saveAssignments');
        }
        
        return assignmentsToDelete.length;
      } catch (error) {
        console.error(`Error deleting assignments for bus ${busId}:`, error);
        throw error;
      }
    }
  },
  validateCreate: ({ state, itemData }) => {
    const isAssignmentDuplicate = isDuplicateAssignment(state.assignments, itemData);
    if (isAssignmentDuplicate) {
      throw new Error('This driver is already assigned to this bus.');
    }
  },
  validateUpdate: ({ state, itemData }) => {
    const isAssignmentDuplicate = isDuplicateAssignment(state.assignments, itemData);
    if (isAssignmentDuplicate) {
      throw new Error('This driver is already assigned to this bus.');
    }
  }
};

export default createStoreModule('assignments', 'Assignment', customOptions);