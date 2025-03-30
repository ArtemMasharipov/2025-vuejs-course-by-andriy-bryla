import { debounce } from '@/helpers/debounceUtils';
import { isDuplicateDriver } from '@/helpers/validationUtils';
import getModuleSettingsObject from '../../store/helpers/GetModuleSettingsObject';

const driversModule = getModuleSettingsObject('drivers', {
  dependencies: [
    {
      module: 'assignments',
      foreignKey: 'driverId',
      deleteAction: 'deleteItem'
    }
  ]
});

const originalState = driversModule.state;
driversModule.state = () => ({
  ...originalState(),
  filters: {
    name: '',
    experienceMin: null,
    experienceMax: null
  }
});

driversModule.getters = {
  ...driversModule.getters,
  getDrivers: (state) => state.drivers,
  getDriverById: (state) => (id) => state.drivers.find(item => item.id === id),
  getFilteredDrivers: (state) => {
    let drivers = state.drivers || [];

    if (state.filters.name) {
      drivers = drivers.filter(d =>
        d.name.toLowerCase().includes(state.filters.name.toLowerCase())
      );
    }

    if (state.filters.experienceMin !== null && state.filters.experienceMin !== undefined) {
      drivers = drivers.filter(d => d.experience >= state.filters.experienceMin);
    }

    if (state.filters.experienceMax !== null && state.filters.experienceMax !== undefined) {
      drivers = drivers.filter(d => d.experience <= state.filters.experienceMax);
    }

    return drivers;
  },
  getFilters: state => state.filters
};

driversModule.mutations = {
  ...driversModule.mutations,
  setFilters: (state, filters) => {
    state.filters = filters;
  }
};

const originalActions = driversModule.actions;
driversModule.actions = {
  ...originalActions,
  
  loadDrivers({ dispatch }) {
    return dispatch('loadList');
  },
  
  setFilters({ commit }, filters) {
    commit('setFilters', filters);
  },
  setFiltersDebounced({ commit }, filters) {
    debouncedSetFilters(commit, filters);
  },
  
  addItem({ dispatch, commit }, itemData) {
    const { id, ...dataWithoutId } = itemData;
    
    if (dataWithoutId.licenseNumber && 
        isDuplicateDriver(this.state.drivers.drivers, dataWithoutId)) {
      commit('setError', 'A driver with this license number already exists.');
      return Promise.reject(new Error('A driver with this license number already exists.'));
    }
    
    return originalActions.addItem({ dispatch, commit }, dataWithoutId);
  },
  
  updateItem({ dispatch, commit, getters }, { itemId, data }) {
    const { id, ...cleanData } = data;
    const exists = getters.getItemById(itemId);
    
    if (exists && exists.licenseNumber !== cleanData.licenseNumber && 
        isDuplicateDriver(this.state.drivers.drivers, {...cleanData, id: itemId})) {
      commit('setError', 'A driver with this license number already exists.');
      return Promise.reject(new Error('A driver with this license number already exists.'));
    }
    
    return originalActions.updateItem({ dispatch, commit }, { itemId, data: cleanData });
  },
  
  createDriver({ dispatch }, itemData) {
    return dispatch('addItem', itemData);
  },
  
  updateDriver({ dispatch }, { itemId, data }) {
    return dispatch('updateItem', { itemId, data });
  },
  
  deleteDriver({ dispatch }, id) {
    return dispatch('deleteItem', id);
  }
};

const debouncedSetFilters = debounce((commit, filters) => {
  commit('setFilters', filters);
}, 300);

export default driversModule;
