<template>
    <div class="catalog-manager">
        <category-selector />
        <product-list />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import CategorySelector from './productCategoryComponents/ProductCategorySelector.vue';
import ProductList from './productComponents/ProductList.vue';

export default {
    name: 'CatalogManager',
    components: {
        CategorySelector,
        ProductList,
    },
    methods: {
        ...mapActions('productsCatalog', ['initializeCatalog']),
    },
    created() {
        this.initializeCatalog()
    },
}
</script>

<style scoped>
.catalog-manager {
    width: 100%;
}
</style>
