import { isDuplicateBus } from '@/helpers/validationUtils';
import getModuleSettingsObject from '../../store/helpers/GetModuleSettingsObject';

const busesModule = getModuleSettingsObject('buses', {
  dependencies: [
    {
      module: 'assignments',
      foreignKey: 'busId',
      deleteAction: 'deleteItem'
    }
  ]
});

busesModule.getters = {
  ...busesModule.getters,
  getBuses: (state) => state.buses,
  getBusById: (state) => (id) => state.buses.find(item => item.id === id)
};

const originalActions = busesModule.actions;
busesModule.actions = {
  ...originalActions,
  
  loadBuses({ dispatch }) {
    return dispatch('loadList');
  },
  
  addItem({ dispatch, commit }, itemData) {
    const { id, ...dataWithoutId } = itemData;
    
    if (dataWithoutId.licensePlate && 
        isDuplicateBus(this.state.buses.buses, dataWithoutId)) {
      commit('setError', 'A bus with this license plate already exists.');
      return Promise.reject(new Error('A bus with this license plate already exists.'));
    }
    
    return originalActions.addItem({ dispatch, commit }, dataWithoutId);
  },
  
  updateItem({ dispatch, commit, getters }, { itemId, data }) {
    const { id, ...cleanData } = data;
    const exists = getters.getItemById(itemId);
    
    if (exists && exists.licensePlate !== cleanData.licensePlate && 
        isDuplicateBus(this.state.buses.buses, {...cleanData, id: itemId})) {
      commit('setError', 'A bus with this license plate already exists.');
      return Promise.reject(new Error('A bus with this license plate already exists.'));
    }
    
    return originalActions.updateItem({ dispatch, commit }, { itemId, data: cleanData });
  },
  
  createBus({ dispatch }, itemData) {
    return dispatch('addItem', itemData);
  },
  
  updateBus({ dispatch }, { itemId, data }) {
    return dispatch('updateItem', { itemId, data });
  },
  
  deleteBus({ dispatch }, id) {
    return dispatch('deleteItem', id);
  }
};

export default busesModule;
