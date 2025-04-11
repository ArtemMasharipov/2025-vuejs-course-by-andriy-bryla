import DbOperations from './DbOperations';

function getModuleSettingsObject(collectionTitle) {
    const collectionDB = new DbOperations(collectionTitle);
    
    return {
        state: () => ({
            [collectionTitle]: [],
            items: [],
            currentItem: null,
            loading: false,
            error: null,
            filters: {}
        }),

        getters: {
            isLoading: (state) => state.loading,
            hasError: (state) => state.error,
            getErrorMessage: (state) => state.error ? state.error.message : null,
            [`all${collectionTitle.charAt(0).toUpperCase() + collectionTitle.slice(1)}`]: (state) => state[collectionTitle],
            getItemById: (state) => (itemId) =>
                state[collectionTitle].find((item) => item.id === itemId),
            getCurrentItem: (state) => state.currentItem
        },

        actions: {
            async fetchItems() {
                this.loading = true;
                this.error = null;
                
                try {
                    const items = await collectionDB.loadItemsList();
                    this.$patch((state) => {
                        state[collectionTitle] = items;
                        state.items = items;
                    });
                    return items;
                } catch (error) {
                    this.error = error;
                    console.error(`Error fetching ${collectionTitle}:`, error);
                    return [];
                } finally {
                    this.loading = false;
                }
            },
            
            async addItem(item) {
                this.loading = true;
                this.error = null;
                
                try {
                    const id = await collectionDB.addItem(item);
                    
                    const newItem = { ...item, id };
                    this.$patch((state) => {
                        state[collectionTitle] = [...state[collectionTitle], newItem];
                        state.items = [...state.items, newItem];
                    });
                    
                    return id;
                } catch (error) {
                    this.error = error;
                    console.error(`Error adding ${collectionTitle.slice(0, -1)}:`, error);
                    return null;
                } finally {
                    this.loading = false;
                }
            },
            
            async updateItem({ itemId, data }) {
                this.loading = true;
                this.error = null;
                
                try {
                    await collectionDB.updateItem(itemId, data);
                    
                    this.$patch((state) => {
                        const index = state[collectionTitle].findIndex(item => item.id === itemId);
                        if (index !== -1) {
                            const updatedItem = { ...state[collectionTitle][index], ...data };
                            const updatedList = [...state[collectionTitle]];
                            updatedList[index] = updatedItem;
                            state[collectionTitle] = updatedList;
                            state.items = updatedList;
                        }
                    });
                    
                    return true;
                } catch (error) {
                    this.error = error;
                    console.error(`Error updating ${collectionTitle.slice(0, -1)}:`, error);
                    return false;
                } finally {
                    this.loading = false;
                }
            },
            
            async deleteItem(itemId) {
                this.loading = true;
                this.error = null;
                
                try {
                    await collectionDB.deleteItem(itemId);
                    
                    this.$patch((state) => {
                        const filteredItems = state[collectionTitle].filter(item => item.id !== itemId);
                        state[collectionTitle] = filteredItems;
                        state.items = filteredItems;
                    });
                    
                    return true;
                } catch (error) {
                    this.error = error;
                    console.error(`Error deleting ${collectionTitle.slice(0, -1)}:`, error);
                    return false;
                } finally {
                    this.loading = false;
                }
            },
            
            async fetchItemById(itemId) {
                this.loading = true;
                this.error = null;
                this.currentItem = null;
                
                try {
                    const item = await collectionDB.loadItemById(itemId);
                    this.currentItem = item;
                    return item;
                } catch (error) {
                    this.error = error;
                    console.error(`Error fetching ${collectionTitle.slice(0, -1)} by ID:`, error);
                    return null;
                } finally {
                    this.loading = false;
                }
            },
            
            async applyFilters(filters = []) {
                this.loading = true;
                this.error = null;
                
                try {
                    const items = await collectionDB.loadFilteredData({ filters });
                    this.$patch((state) => {
                        state[collectionTitle] = items;
                        state.items = items;
                    });
                    return items;
                } catch (error) {
                    this.error = error;
                    console.error(`Error applying filters to ${collectionTitle}:`, error);
                    return [];
                } finally {
                    this.loading = false;
                }
            },
            
            clearError() {
                this.error = null;
            }
        }
    };
}

export default getModuleSettingsObject;
