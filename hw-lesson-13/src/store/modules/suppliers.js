import { api } from '@/services/api'
import { storageService } from '@/services/storage-service'
import { SET_SUPPLIERS } from '../mutation-types'

export default {
  namespaced: true,
  state: () => ({
    suppliers: storageService.getSuppliers()
  }),
  getters: {
    allSuppliers: state => state.suppliers,
    popularSupplier: state => state.suppliers.find(s => s.popular),
    mostPopularName: state => {
      const popular = state.suppliers.find(s => s.popular)
      return popular ? popular.name : 'немає даних'
    }
  },
  mutations: {
    [SET_SUPPLIERS](state, suppliers) {
      state.suppliers = suppliers;
      storageService.saveSuppliers(suppliers);
    }
  },
  actions: {
    async fetchSuppliers({ commit, dispatch }) {
      try {
        dispatch('setLoading', true, { root: true })
        const suppliers = await api.getSuppliers()
        commit(SET_SUPPLIERS, suppliers)
        return suppliers
      } catch (error) {
        throw error
      } finally {
        dispatch('setLoading', false, { root: true })
      }
    }
  }
}
