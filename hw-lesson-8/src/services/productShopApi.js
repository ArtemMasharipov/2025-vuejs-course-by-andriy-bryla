import catalogData from '../data/products.js'

const simulateNetworkDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const apiService = {
    async fetchCategories() {
        await simulateNetworkDelay(1000)
        return catalogData.productGroups
    },

    async fetchCatalogItems(categoryId) {
        await simulateNetworkDelay(500)
        if (!categoryId) return []

        const category = catalogData.productGroups.find((group) => group.id === categoryId)
        if (!category) return []

        return catalogData.products[category.categoryKey] || []
    },
}
