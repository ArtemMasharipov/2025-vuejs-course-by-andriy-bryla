<template>
    <div class="products-content">
        <loading-spinner v-if="isLoading" />
        <div v-else-if="!products.length" class="no-products">Немає товарів для відображення</div>
        <div v-else class="products-grid">
            <product-card v-for="product in products" :key="product.id" :product="product" />
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/tasks/task_5/products/ProductCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

export default {
    name: 'ProductsList',
    components: {
        ProductCard,
        LoadingSpinner,
    },
    props: {
        products: {
            type: Array,
            required: true,
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style scoped>
.products-content {
    position: relative;
    min-height: 600px;
    width: 100%;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    width: 100%;
}

.no-products {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
    width: 100%;
}
</style>
