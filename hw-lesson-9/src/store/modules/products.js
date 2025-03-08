import { fetchData } from '@/helpers/api';

const state = {
  products: []
};

const getters = {
  getProducts: state => state.products,
  getProductById: state => id => state.products.find(p => p.id === Number(id))
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product);
  },
  EDIT_PRODUCT(state, updatedProduct) {
    const idx = state.products.findIndex(p => p.id === updatedProduct.id);
    if (idx > -1) state.products.splice(idx, 1, updatedProduct);
  },
  DELETE_PRODUCT(state, id) {
    state.products = state.products.filter(p => p.id !== Number(id));
  }
};

const actions = {
  async fetchProductsByCategory({ commit, rootGetters }, categoryId) {
    if (!categoryId) return;
    
    const category = rootGetters['categories/getCategoryById'](categoryId);
    if (!category) return;
    
    try {
      const products = await fetchData(category.file);
      commit('SET_PRODUCTS', products);
      commit('categories/SET_CURRENT_CATEGORY_ID', categoryId, { root: true });
    } catch (error) {
      commit('SET_PRODUCTS', []);
    }
  },
  
  addOrUpdateProduct({ commit }, product) {
    const newProduct = product.id ? product : {
      ...product,
      id: Date.now(),
      itemImg: product.itemImg || '📦'
    };
    commit(product.id ? 'EDIT_PRODUCT' : 'ADD_PRODUCT', newProduct);
  },
  
  deleteProduct({ commit }, id) {
    commit('DELETE_PRODUCT', id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
