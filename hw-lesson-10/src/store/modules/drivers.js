import { debounce } from '@/helpers/debounceUtils';
import { isDuplicateDriver } from '@/helpers/validationUtils';
import createStoreModule from '../../helpers/createStoreModule';

const customOptions = {
  state: {
    filters: {
      name: '',
      experienceMin: null,
      experienceMax: null
    }
  },
  getters: {
    getFilteredDrivers: (state, getters) => {
      let drivers = getters.getDrivers || [];

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
  },
  mutations: {
    setFilters: (state, filters) => {
      state.filters = filters;
    }
  },
  actions: {
    setFilters({ commit }, filters) {
      commit('setFilters', filters);
    },
    setFiltersDebounced({ commit }, filters) {
      debouncedSetFilters(commit, filters);
    }
  },
  validateCreate: ({ state, itemData }) => {
    const isDriverDuplicate = isDuplicateDriver(state.drivers, itemData);
    if (isDriverDuplicate) {
      throw new Error('A driver with this license number already exists.');
    }
  },
  validateUpdate: ({ state, itemData }) => {
    const isDriverDuplicate = isDuplicateDriver(state.drivers, itemData);
    if (isDriverDuplicate) {
      throw new Error('A driver with this license number already exists.');
    }
  },
  afterDelete: async ({ dispatch, id }) => {
    try {
      await dispatch('assignments/deleteAssignmentsByDriverId', id, { root: true });
    } catch (error) {
      console.error('Error while deleting related assignments:', error);
    }
  }
};

const debouncedSetFilters = debounce((commit, filters) => {
  commit('setFilters', filters);
}, 300);

export default createStoreModule('drivers', 'Driver', customOptions);
