import api from '@/api';
import storage from '@/utils/storage';

export default {
  namespaced: true,
  state: {
    isAuthenticated: Boolean(storage.get('isAuthenticated', false)),
    user: storage.get('user') || null,
    loading: false,
    error: null
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    isLoading: state => state.loading,
    hasError: state => Boolean(state.error),
    errorMessage: state => state.error
  },
  mutations: {
    SET_AUTH(state, { isAuthenticated, user }) {
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      
      if (isAuthenticated) {
        storage.set('isAuthenticated', true);
        storage.set('user', user);
      } else {
        storage.remove('isAuthenticated');
        storage.remove('user');
      }
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      try {
        const response = await api.login(credentials);
        
        if (response.success) {
          commit('SET_AUTH', { isAuthenticated: true, user: response.data });
          return true;
        }
        
        commit('SET_ERROR', 'Invalid credentials');
        return false;
      } catch (error) {
        commit('SET_ERROR', error.message || 'Login failed');
        console.error('Login error:', error);
        return false;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    logout({ commit }, router) {
      commit('SET_AUTH', { isAuthenticated: false, user: null });
      if (router) {
        router.push('/login');
      }
    }
  }
};
