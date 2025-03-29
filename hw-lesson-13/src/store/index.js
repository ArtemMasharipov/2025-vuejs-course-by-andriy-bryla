import { createStore } from 'vuex'
import products from './modules/products'
import suppliers from './modules/suppliers'
import { SET_LOADING } from './mutation-types'

export default createStore({
  state: () => ({
    storeInfo: {
      rating: 54449,
      status: 'відкрито',
      owner: 'Баба Галя'
    },
    loading: false
  }),
  getters: {
    storeRating: state => state.storeInfo.rating,
    storeStatus: state => state.storeInfo.status,
    storeOwner: state => state.storeInfo.owner,
    isLoading: state => state.loading
  },
  mutations: {
    [SET_LOADING](state, isLoading) {
      state.loading = isLoading;
    }
  },
  actions: {
    setLoading({ commit }, isLoading) {
      commit(SET_LOADING, isLoading);
    }
  },
  modules: {
    products,
    suppliers
  }
})
