<template>
    <div class="catalog-list">
        <div v-if="isCatalogLoading" class="loading-indicator">Loading...</div>
        <template v-else>
            <div v-if="!filteredCatalogItems || filteredCatalogItems.length === 0" class="empty-selection">
                Please select a category
            </div>
            <div v-else class="catalog-grid">
                <product-item v-for="item in filteredCatalogItems" :key="item.id" :product="item" />
            </div>
        </template>
    </div>
</template>

<script>
import ProductItem from '@/components/task_1/productComponents/ProductItem.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'CatalogList',
    components: {
        ProductItem
    },
    computed: {
        ...mapGetters('productsCatalog', [
            'filteredCatalogItems',
            'isCatalogLoading'
        ]),
    }
}
</script>

<style scoped>
.catalog-list {
    margin-top: 2rem;
}

.catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
}

.empty-selection {
    text-align: center;
    color: #555;
    /* Darker color for better readability */
    padding: 2rem;
    font-size: 1.3rem;
    /* Increased font size */
    background: #f8f9fa;
    border-radius: 8px;
    margin: 1rem;
}

.loading-indicator {
    text-align: center;
    padding: 2rem;
    font-size: 1.3rem;
    /* Increased font size */
    color: #555;
    /* Darker color for better readability */
}
</style>
