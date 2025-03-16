import { v4 as uuidv4 } from 'uuid';
import localStorageService from './localStorageService';

const pluralize = (word) => {
    const specials = { Bus: 'Buses' };
    if (specials[word]) return specials[word];

    return /(s|x|z|ch|sh)$/i.test(word) ? `${word}es` : `${word}s`;
};

export default function createStoreModule(
    storageKey,
    entityName,
    customOptions = {}
) {
    const entityNameLower = entityName.toLowerCase();
    const entityPlural = pluralize(entityName);
    const entityNamePlural = pluralize(entityNameLower);

    const defaultState = {
        loading: false,
        error: null,
        [entityNamePlural]: [],
    };

    const defaultGetters = {
        [`get${entityPlural}`]: (state) => state[entityNamePlural],
        [`get${entityName}ById`]: (state) => (id) =>
            state[entityNamePlural].find((item) => item.id === id),
        isLoading: (state) => state.loading,
        hasError: (state) => !!state.error,
        getError: (state) => state.error,
    };

    const defaultMutations = {
        [`set${entityPlural}`]: (state, items) =>
            (state[entityNamePlural] = items),
        setLoading: (state, status) => (state.loading = status),
        setError: (state, error) => (state.error = error),
        [`add${entityName}`]: (state, item) =>
            state[entityNamePlural].push(item),
        [`update${entityName}`]: (state, updatedItem) => {
            const index = state[entityNamePlural].findIndex(
                (item) => item.id === updatedItem.id
            );
            if (index !== -1) {
                state[entityNamePlural].splice(index, 1, updatedItem);
            } else {
                state[entityNamePlural].push(updatedItem);
            }
        },
        [`delete${entityName}`]: (state, id) => {
            state[entityNamePlural] = state[entityNamePlural].filter(
                (item) => item.id !== id
            );
        },
    };

    const defaultActions = {
        [`load${entityPlural}`]: async ({ commit }) => {
            commit('setLoading', true);
            commit('setError', null);
            try {
                const items =
                    (await localStorageService.getItem(storageKey)) || [];
                commit(`set${entityPlural}`, items);
                return items;
            } catch (error) {
                commit(
                    'setError',
                    error.message || `Failed to load ${entityNamePlural}`
                );
                console.error(error);
                return [];
            } finally {
                commit('setLoading', false);
            }
        },

        [`save${entityPlural}`]: async ({ state }) => {
            try {
                await localStorageService.setItem(
                    storageKey,
                    state[entityNamePlural]
                );
                return true;
            } catch (error) {
                console.error(`Error saving ${entityNamePlural}:`, error);
                return false;
            }
        },

        [`create${entityName}`]: async (
            { commit, dispatch, state },
            itemData
        ) => {
            if (customOptions.validateCreate) {
                await customOptions.validateCreate({ state, itemData });
            }

            const item = { ...itemData, id: uuidv4() };
            commit(`add${entityName}`, item);
            await dispatch(`save${entityPlural}`);
            return item;
        },

        [`update${entityName}`]: async (
            { commit, dispatch, getters, state },
            itemData
        ) => {
            const exists = getters[`get${entityName}ById`](itemData.id);
            if (!exists) throw new Error(`${entityName} not found`);

            if (customOptions.validateUpdate) {
                await customOptions.validateUpdate({ state, itemData, exists });
            }

            commit(`update${entityName}`, itemData);
            await dispatch(`save${entityPlural}`);
            return itemData;
        },

        [`delete${entityName}`]: async ({ commit, dispatch, getters }, id) => {
            const exists = getters[`get${entityName}ById`](id);
            if (!exists) throw new Error(`${entityName} not found`);

            try {
                if (customOptions.afterDelete) {
                    await customOptions.afterDelete({ dispatch, id });
                }

                commit(`delete${entityName}`, id);
                await dispatch(`save${entityPlural}`);
                
                return id;
            } catch (error) {
                console.error(`Error during ${entityName.toLowerCase()} deletion:`, error);
                throw new Error(`Failed to delete ${entityNameLower}: ${error.message}`);
            }
        },
    };

    const mergedState = { ...defaultState, ...(customOptions.state || {}) };

    return {
        namespaced: true,
        state: mergedState,
        getters: { ...defaultGetters, ...(customOptions.getters || {}) },
        mutations: { ...defaultMutations, ...(customOptions.mutations || {}) },
        actions: { ...defaultActions, ...(customOptions.actions || {}) },
    };
}
