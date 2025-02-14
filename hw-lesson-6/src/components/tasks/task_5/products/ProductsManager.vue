<template>
    <div class="task">
        <div class="products-container">
            <products-filters
                v-model:shops.check="filters.shops"
                v-model:brands.check="filters.brands"
                :products-data="productsData"
                :disabled="isLoading"
                :class="{ 'disabled-sidebar': isLoading }"
            />
            <products-list :products="filteredProducts" :is-loading="isLoading" />
        </div>
    </div>
</template>

<script>
import ProductsFilters from '@/components/tasks/task_5/products/filters/ProductsFilters.vue'
import ProductsList from '@/components/tasks/task_5/products/ProductsList.vue'

export default {
    name: 'ProductsManager',
    components: {
        ProductsFilters,
        ProductsList,
    },
    props: {
        productsData: {
            type: Array,
            required: true,
            default: () => [],
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            filters: {
                shops: [],
                brands: [],
            },
        }
    },
    computed: {
        hasActiveShopFilter() {
            return this.filters.shops.length > 0
        },
        hasActiveBrandFilter() {
            return this.filters.brands.length > 0
        },
        filteredProducts() {
            return this.productsData.filter(this.isProductMatchingFilters)
        },
    },
    methods: {
        isProductMatchingFilters(product) {
            return this.isMatchingShopFilter(product) && this.isMatchingBrandFilter(product)
        },
        isMatchingShopFilter(product) {
            return !this.hasActiveShopFilter || this.filters.shops.includes(product.shop)
        },
        isMatchingBrandFilter(product) {
            const brand = product.title.split(' ')[0]
            return !this.hasActiveBrandFilter || this.filters.brands.includes(brand)
        },
    },
}
</script>

<style scoped>
.products-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 20px;
}

.disabled-sidebar {
    opacity: 0.5;
    pointer-events: none;
    filter: grayscale(50%);
}
</style>
