export const createBaseModule = ({ 
  namespace, 
  fetchAction, 
  initialState = {}
}) => {
  return {
    namespaced: true,
    state: {
      data: [],
      loading: false,
      error: null,
      ...initialState
    },
    getters: {
      all: state => state.data,
      getById: state => id => state.data.find(item => item.id === parseInt(id)),
      isLoading: state => state.loading,
      hasError: state => Boolean(state.error),
      error: state => state.error
    },
    mutations: {
      SET_DATA(state, data) {
        state.data = data;
      },
      SET_LOADING(state, status) {
        state.loading = status;
      },
      SET_ERROR(state, error) {
        state.error = error;
      }
    },
    actions: {
      async fetch({ commit }) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        try {
          const response = await fetchAction();
          const data = response.success ? response.data : response;
          commit('SET_DATA', data);
          return data;
        } catch (error) {
          const errorMessage = error.message || `Failed to load ${namespace}`;
          commit('SET_ERROR', errorMessage);
          console.error(`Error loading ${namespace}:`, error);
          return null;
        } finally {
          commit('SET_LOADING', false);
        }
      }
    }
  };
};
