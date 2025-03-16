import { isDuplicateBus } from '@/helpers/validationUtils';
import createStoreModule from '../../helpers/createStoreModule';

const customOptions = {
  validateCreate: ({ state, itemData }) => {
    const isBusDuplicate = isDuplicateBus(state.buses, itemData);
    if (isBusDuplicate) {
      throw new Error('A bus with this license plate already exists.');
    }
  },
  validateUpdate: ({ state, itemData, exists }) => {
    if (exists && exists.licensePlate === itemData.licensePlate) {
      return;
    }
    
    const isBusDuplicate = isDuplicateBus(state.buses, itemData);
    if (isBusDuplicate) {
      throw new Error('A bus with this license plate already exists.');
    }
  },
  afterDelete: async ({ dispatch, id }) => {
    try {
      await dispatch('assignments/deleteAssignmentsByBusId', id, { root: true });
    } catch (error) {
      console.error('Error while deleting related assignments:', error);
    }
  }
};

export default createStoreModule('buses', 'Bus', customOptions);
