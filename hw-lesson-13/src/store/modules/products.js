import { api } from '@/services/api';
import { storageService } from '@/services/storage-service';
import { ADD_PRODUCT, REMOVE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../mutation-types';

export default {
  namespaced: true,
  state: () => ({
    products: storageService.getProducts(),
    filteredProducts: [],
    filtersApplied: false,
    filters: {
      minPrice: null,
      maxPrice: null,
      searchTerm: ''
    }
  }),
  getters: {
    allProducts: state => state.products,
    filteredProducts: state => state.filtersApplied ? state.filteredProducts : state.products,
    productsByPriceRange: state => (min, max) => {
      let result = [...state.products];
      if (min) result = result.filter(p => p.price >= Number(min));
      if (max) result = result.filter(p => p.price <= Number(max));
      return result;
    },
    getEmptyProductTemplate: () => () => ({
      id: null,
      name: '',
      price: '',
      image: 'default.jpg',
      imageData: null
    }),
    currentFilters: state => state.filters,
    filtersApplied: state => state.filtersApplied
  },
  mutations: {
    [SET_PRODUCTS](state, products) {
      state.products = products;
      storageService.saveProducts(products);
    },
    [ADD_PRODUCT](state, product) {
      state.products.push(product);
      storageService.saveProducts(state.products);
    },
    [REMOVE_PRODUCT](state, productId) {
      state.products = state.products.filter(p => p.id !== productId);
      storageService.saveProducts(state.products);
    },
    [UPDATE_PRODUCT](state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
        storageService.saveProducts(state.products);
      }
    },
    SET_FILTERED_PRODUCTS(state, filteredProducts) {
      state.filteredProducts = filteredProducts;
    },
    SET_FILTERS(state, filters) {
      state.filters = { ...filters };
    },
    SET_FILTERS_APPLIED(state, applied) {
      state.filtersApplied = applied;
    }
  },
  actions: {
    async fetchProducts({ commit, dispatch, state }) {
      if (state.products.length === 0) {
        dispatch('setLoading', true, { root: true });
        try {
          const products = await api.getProducts();
          commit(SET_PRODUCTS, products);
          return products;
        } catch (error) {
          throw error;
        } finally {
          dispatch('setLoading', false, { root: true });
        }
      }
      return state.products;
    },
    async addProduct({ commit }, product) {
      try {
        const newProduct = {
          ...product,
          id: product.id || Date.now()
        };
        const savedProduct = await api.addProduct(newProduct);
        commit(ADD_PRODUCT, savedProduct);
        return savedProduct;
      } catch (error) {
        throw error;
      }
    },
    async removeProduct({ commit }, productId) {
      try {
        await api.deleteProduct(productId);
        commit(REMOVE_PRODUCT, productId);
      } catch (error) {
        throw error;
      }
    },
    async updateProduct({ commit }, product) {
      try {
        const updatedProduct = await api.updateProduct(product);
        commit(UPDATE_PRODUCT, updatedProduct);
        return updatedProduct;
      } catch (error) {
        throw error;
      }
    },
    resetFilteredProducts({ commit }) {
      commit('SET_FILTERED_PRODUCTS', []);
      commit('SET_FILTERS', {
        minPrice: null,
        maxPrice: null,
        searchTerm: ''
      });
      commit('SET_FILTERS_APPLIED', false);
    },
    applyFilters({ commit, state }, filters) {
      commit('SET_FILTERS', filters);
      
      const { minPrice, maxPrice, searchTerm } = filters;
      let result = [...state.products];
      
      const hasFilters = Boolean(
        (minPrice && minPrice !== '') || 
        (maxPrice && maxPrice !== '') || 
        (searchTerm && searchTerm.trim() !== '')
      );
      
      if (hasFilters) {
        if (minPrice || maxPrice) {
          result = result.filter(product => {
            let matches = true;
            if (minPrice) matches = matches && product.price >= Number(minPrice);
            if (maxPrice) matches = matches && product.price <= Number(maxPrice);
            return matches;
          });
        }
        
        if (searchTerm && searchTerm.trim() !== '') {
          const searchLower = searchTerm.toLowerCase().trim();
          result = result.filter(product => 
            product.name.toLowerCase().includes(searchLower)
          );
        }
      }
      
      commit('SET_FILTERS_APPLIED', hasFilters);
      commit('SET_FILTERED_PRODUCTS', result);
      return result;
    }
  }
}
