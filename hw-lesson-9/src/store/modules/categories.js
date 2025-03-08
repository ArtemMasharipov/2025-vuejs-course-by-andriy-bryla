import { fetchData } from '@/helpers/api';

const state = { 
  categories: [],
  currentCategoryId: null
};

const getters = {
  getCategories: state => state.categories,
  getCurrentCategoryName: state => {
    const current = state.categories.find(c => c.id === state.currentCategoryId);
    return current ? current.name : '';
  },
  getCurrentCategoryId: state => state.currentCategoryId,
  getCategoryById: state => id => state.categories.find(c => c.id === Number(id))
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_CURRENT_CATEGORY_ID(state, categoryId) {
    state.currentCategoryId = Number(categoryId);
  }
};

const actions = {
  async fetchCategories({ commit }) {
    try {
      const categories = await fetchData('categories.json');
      commit('SET_CATEGORIES', categories);
    } catch (error) {
      commit('SET_CATEGORIES', []);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
