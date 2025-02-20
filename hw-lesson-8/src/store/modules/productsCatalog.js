import { apiService } from '@/services/productShopApi'

export default {
    namespaced: true,
    state: {
        activeCategory: null,
        categories: [],
        categoryProducts: {},
        isLoadingData: false,
    },
    getters: {
        isCatalogLoading: (state) => state.isLoadingData,
        availableCategories: (state) => state.categories,
        selectedCategory: (state) => state.activeCategory,
        filteredCatalogItems: (state) => {
            if (!state.activeCategory) return []
            return state.categoryProducts[state.activeCategory] || []
        },
    },
    mutations: {
        updateActiveCategory(state, categoryId) {
            state.activeCategory = categoryId
        },
        updateCategories(state, categories) {
            state.categories = categories
        },
        setCategoryProducts(state, { categoryId, products }) {
            state.categoryProducts = {
                ...state.categoryProducts,
                [categoryId]: products,
            }
        },
        updateLoadingState(state, isLoading) {
            state.isLoadingData = isLoading
        },
    },
    actions: {
        async initializeCatalog({ commit }) {
            commit('updateLoadingState', true)
            try {
                const categories = await apiService.fetchCategories()
                commit('updateCategories', categories)
            } finally {
                commit('updateLoadingState', false)
            }
        },
        async selectCategory({ commit, state }, categoryId) {
            commit('updateActiveCategory', categoryId)

            if (!state.categoryProducts[categoryId]) {
                commit('updateLoadingState', true)
                try {
                    const products = await apiService.fetchCatalogItems(categoryId)
                    commit('setCategoryProducts', { categoryId, products })
                } finally {
                    commit('updateLoadingState', false)
                }
            }
        },
    },
}
