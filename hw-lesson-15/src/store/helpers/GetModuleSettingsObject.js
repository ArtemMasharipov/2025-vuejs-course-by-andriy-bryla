import DbOperations from './DbOperations';

function getModuleSettingsObject(collectionTitle, options = {}) {
    const collectionDB = new DbOperations(collectionTitle);
    const { dependencies = [] } = options;
    
    return {
        namespaced: true,

        state: () => ({
            [collectionTitle]: [],
            currentItem: null,
            loading: false,
            error: null,
        }),

        getters: {
            isLoading: (state) => state.loading,
            hasError: (state) => state.error !== null,
            getError: (state) => state.error,

            getItemsList: (state) => state[collectionTitle],
            getItemById: (state) => (itemId) =>
                state[collectionTitle].find((item) => item.id == itemId),
            getCurrentItem: ({ currentItem }) => currentItem,
        },

        mutations: {
            setItemsList(state, itemsList) {
                state[collectionTitle] = itemsList;
            },
            setCurrentItem(state, itemData) {
                state.currentItem = itemData;
            },
            addItem(state, item) {
                state[collectionTitle].push(item);
            },
            deleteItem(state, deleteItemId) {
                state[collectionTitle] = state[collectionTitle].filter(
                    (item) => item.id !== deleteItemId
                );
            },
            setLoading(state, value) {
                state.loading = value;
            },
            setError(state, error) {
                state.error = error;
            },
        },

        actions: {
            loadList({ commit }, options) {
                commit('setError', null);
                commit('setLoading', true);

                return collectionDB
                    .loadItemsList(options)
                    .then((list) => {
                        commit('setItemsList', list);
                        return list;
                    })
                    .catch((error) => {
                        commit('setError', error);
                        return [];
                    })
                    .finally(() => {
                        commit('setLoading', false);
                    });
            },
            
            addItem({ commit, dispatch }, item) {
                commit('setError', null);
                commit('setLoading', true);
                
                return collectionDB
                    .addItem(item)
                    .then(() => {
                        return dispatch('loadList');
                    })
                    .catch((error) => {
                        commit('setError', error);
                        throw error;
                    })
                    .finally(() => {
                        commit('setLoading', false);
                    });
            },
            
            deleteItem({ commit, dispatch, rootGetters }, itemId) {
                commit('setError', null);
                commit('setLoading', true);

                return collectionDB
                    .deleteItem(itemId)
                    .then(async () => {
                        if (dependencies.length > 0) {
                            try {
                                for (const dep of dependencies) {
                                    const { module, foreignKey, deleteAction } = dep;
                                    
                                    const dependentGetter = `${module}/getItemsList`;
                                    if (rootGetters[dependentGetter] && 
                                        !rootGetters[dependentGetter].length) {
                                        await dispatch(`${module}/loadList`, null, { root: true });
                                    }
                                    
                                    const dependentItems = rootGetters[dependentGetter].filter(
                                        item => String(item[foreignKey]) === String(itemId)
                                    );
                                    
                                    if (dependentItems.length > 0) {
                                        const deletePromises = dependentItems.map(item => 
                                            dispatch(
                                                `${module}/${deleteAction || 'deleteItem'}`, 
                                                item.id, 
                                                { root: true }
                                            ).catch(err => console.error(
                                                `Error deleting dependent item in ${module}:`, err
                                            ))
                                        );
                                        
                                        await Promise.all(deletePromises);
                                    }
                                }
                            } catch (error) {
                                console.error('Error handling cascading deletes:', error);
                            }
                        }
                        
                        await dispatch('loadList');
                        return itemId;
                    })
                    .catch((error) => {
                        commit('setError', error);
                        throw error;
                    })
                    .finally(() => {
                        commit('setLoading', false);
                    });
            },
            
            updateItem({ commit, dispatch }, { itemId, data }) {
                commit('setError', null);
                commit('setLoading', true);

                return collectionDB
                    .updateItem(itemId, data)
                    .then(() => {
                        return dispatch('loadList');
                    })
                    .catch((error) => {
                        commit('setError', error);
                        throw error;
                    })
                    .finally(() => {
                        commit('setLoading', false);
                    });
            },
            
            loadItemDataById({ commit }, itemId) {
                commit('setError', null);
                commit('setLoading', true);
                commit('setCurrentItem', null);
                
                return collectionDB
                    .loadItemById(itemId)
                    .then((itemData) => {
                        commit('setCurrentItem', itemData);
                        return itemData;
                    })
                    .catch((error) => {
                        commit('setError', error);
                        throw error;
                    })
                    .finally(() => {
                        commit('setLoading', false);
                    });
            },
            
            loadFilteredData({ commit }, { filters, options }) {
                commit('setError', null);
                commit('setLoading', true);
                
                return collectionDB
                    .loadFilteredData({ filters }, options)
                    .then((list) => {
                        commit('setItemsList', list);
                        return list;
                    })
                    .catch((error) => {
                        commit('setError', error);
                        return [];
                    })
                    .finally(() => {
                        commit('setLoading', false);
                    });
            },
        },
    };
}

export default getModuleSettingsObject;
