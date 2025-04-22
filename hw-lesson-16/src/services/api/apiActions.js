import { showToast } from '@/services/utils/toast';

export const executeApiAction = async ({ commit, actionFunction, onError, useLoading = true }) => {
  if (useLoading) {
    commit('setLoading', true);
  }
  
  commit('setError', null);
  
  try {
    const result = await actionFunction();
    return result;
  } catch (error) {
    commit('setError', error);
    console.error('API request failed:', error);
    
    if (onError && typeof onError === 'function') {
      return onError(error);
    }
    
    throw error;
  } finally {
    if (useLoading) {
      commit('setLoading', false);
    }
  }
};

export const createFirestoreAction = ({ operation, commitType, toast }) => {
  return async function({ commit }, payload) {
    return executeApiAction({
      commit,
      actionFunction: async () => {
        const result = await operation(payload);
        if (commitType) {
          commit(commitType, result);
        }
        
        if (toast?.success) {
          showToast(toast.success, 'success');
        }
        
        return result;
      },
      onError: (error) => {
        console.error(`Firestore operation failed:`, error);
        
        if (toast?.error) {
          showToast(toast.error, 'error');
        }
      }
    });
  };
};

export const createCrudActions = ({ firestoreService, collectionName, mutations }) => {
  return {
    fetchAll: createFirestoreAction({
      operation: () => firestoreService.getAll(collectionName),
      commitType: mutations.setAll,
      toast: {
        error: 'fetchFailed'
      }
    }),
    
    fetchById: createFirestoreAction({
      operation: (id) => firestoreService.getById(collectionName, id),
      commitType: mutations.setSelected,
      toast: {
        error: 'fetchFailed'
      }
    }),
    
    create: createFirestoreAction({
      operation: (data) => firestoreService.add(collectionName, data),
      commitType: mutations.add,
      toast: {
        success: 'createSuccess',
        error: 'createFailed'
      }
    }),
    
    update: createFirestoreAction({
      operation: ({ id, data }) => firestoreService.update(collectionName, id, data),
      commitType: mutations.update,
      toast: {
        success: 'updateSuccess',
        error: 'updateFailed'
      }
    }),
    
    remove: createFirestoreAction({
      operation: (id) => firestoreService.delete(collectionName, id),
      commitType: mutations.remove,
      toast: {
        success: 'deleteSuccess',
        error: 'deleteFailed'
      }
    })
  };
};