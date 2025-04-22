import { executeApiAction } from '@/services/api/apiActions';
import { authService, rbacService } from '@/services/firebase';
import { usersDb } from '@/services/firebase/firestore';
import StorageService from '@/services/storageService';
import { showToast } from '@/services/utils/toast';

const CURRENT_USER_KEY = 'currentUser';
const USER_ROLE_KEY = 'userRole';

export default {
  namespaced: true,
  
  state: () => ({
    user: StorageService.get(CURRENT_USER_KEY, null),
    userRole: StorageService.get(USER_ROLE_KEY, 'guest'),
    rbacConfig: null,
    loading: false,
    error: null
  }),
  
  getters: {
    user: state => state.user,
    isAuthenticated: state => !!state.user,
    loading: state => state.loading,
    error: state => state.error,
    getUser: state => state.user,
    
    userRole: state => state.userRole,
    isAdmin: state => state.userRole === 'admin',
    rbacConfig: state => state.rbacConfig,
    
    hasPermission: () => async (permission) => {
      return await rbacService.hasPermission(permission);
    }
  },
  
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        StorageService.set(CURRENT_USER_KEY, user);
      } else {
        StorageService.remove(CURRENT_USER_KEY);
      }
    },
    
    setLoading(state, loading) {
      state.loading = loading;
    },
    
    setError(state, error) {
      state.error = error;
    },
    
    setUserRole(state, role) {
      state.userRole = role || 'guest';
      rbacService.setUserRole(role || 'guest');
    },
    
    setRbacConfig(state, config) {
      state.rbacConfig = config;
    }
  },
  
  actions: {
    async saveUserData({ commit, dispatch }, user) {
      if (!user) {
        commit('setUser', null);
        commit('setUserRole', 'guest');
        
        dispatch('cart/resetCart', null, { root: true });
        return;
      }
      
      commit('setUser', user);
      
      return executeApiAction({
        commit,
        useLoading: false,
        actionFunction: async () => {
          const existingUser = await usersDb.getById(user.uid);
          
          const userData = await usersDb.createIfNotExists(user.uid, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: 'admin' 
          });
          
            commit('setUserRole', 'admin'); 
            
          dispatch('cart/initCart', user.uid, { root: true });
          
          return userData.user;
        }
      });
    },
    
    async loadRbacConfig({ commit }) {
      return executeApiAction({
        commit,
        useLoading: false,
        actionFunction: async () => {
          const config = await rbacService.getRbacConfig();
          commit('setRbacConfig', config);
          return config;
        },
        onError: (error) => {
          const defaultConfig = new RbacModel();
          commit('setRbacConfig', defaultConfig);
          return defaultConfig;
        }
      });
    },
    
    async setUserRole({ commit }, role) {
      try {
        await rbacService.setUserRole(role);
        commit('setUserRole', role);
      } catch (error) {
        commit('setUserRole', role);
      }
    },
    
    setRbacConfig({ commit }, config) {
      commit('setRbacConfig', config);
    },
    
    async loginWithGoogle({ commit, dispatch }) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          const result = await authService.loginWithGoogle();
          await dispatch('saveUserData', result.user);
          showToast('welcome', 'success', { name: result.user.displayName || 'user' });
          return result;
        },
        onError: (error) => {
          showToast('login', 'error');
          throw error;
        }
      });
    },
    
    async logout({ commit, dispatch }) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          await authService.logout();
          
          commit('setUser', null);
          rbacService.clearUserRole();
          commit('setUserRole', 'guest');
          
          dispatch('cart/resetCart', null, { root: true });
          
          showToast('loggedOut', 'info');
          return true;
        },
        onError: (error) => {
          showToast('default', 'error');
          return false;
        }
      });
    }
  }
};
