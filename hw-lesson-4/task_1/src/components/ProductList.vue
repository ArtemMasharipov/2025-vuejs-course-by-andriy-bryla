<template>
    <section class="section card">
        <div class="list-header">
            <h2>Каталог товарів</h2>
            <product-filters @filter-change="handleFiltersUpdate" />
        </div>

        <div v-if="filteredProducts.length" class="grid-container">
            <product-card
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                @view-details="$emit('view-details', product)"
                @buy="$emit('buy', product)"
            />
        </div>
        <div v-else class="no-results">
            <span class="no-results-emoji">🔍</span>
            <p>Товарів не знайдено</p>
        </div>

        <div class="products-count">
            Знайдено товарів: {{ filteredProducts.length }}
        </div>
    </section>
</template>

<script>
import ProductCard from './ProductCard.vue'
import ProductFilters from './ProductFilters.vue'

export default {
    name: 'ProductList',
    components: { 
        ProductCard,
        ProductFilters
    },
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    emits: ['view-details', 'buy'],
    data() {
        return {
            activeFilters: {
                searchQuery: '',
                availability: 'all',
                sortBy: 'name'
            }
        }
    },
    computed: {
        searchFilteredProducts() {
            return this.products.filter(product => 
                product.name.toLowerCase()
                    .includes(this.activeFilters.searchQuery.toLowerCase())
            )
        },
        availabilityFilteredProducts() {
            return this.searchFilteredProducts.filter(product => {
                if (this.activeFilters.availability === 'all') return true
                return this.activeFilters.availability === 'available' 
                    ? product.available 
                    : !product.available
            })
        },
        filteredProducts() {
            return this.sortProducts(this.availabilityFilteredProducts)
        }
    },
    methods: {
        handleFiltersUpdate(filters) {
            this.activeFilters = filters
        },
        sortProducts(products) {
            return [...products].sort((a, b) => {
                switch(this.activeFilters.sortBy) {
                    case 'priceAsc':
                        return a.price - b.price
                    case 'priceDesc':
                        return b.price - a.price
                    default:
                        return a.name.localeCompare(b.name)
                }
            })
        }
    }
}
</script>

<style scoped>
.list-header {
    margin-bottom: calc(var(--spacing-unit) * 3);
}

.no-results {
    text-align: center;
    padding: calc(var(--spacing-unit) * 4);
    color: #666;
}

.no-results-emoji {
    font-size: 3em;
    display: block;
    margin-bottom: var(--spacing-unit);
}

.products-count {
    margin-top: calc(var(--spacing-unit) * 3);
    text-align: right;
    color: #666;
    font-size: 0.9em;
}
</style>
