<template>
    <section class="section card">
        <h2>Останні переглянуті товари</h2>
        <div class="grid-container">
            <product-card
                v-for="product in products"
                :key="product.id"
                :product="product"
                @view-details="$emit('view-details', product)"
                @buy="$emit('buy', product)"
            />
        </div>
    </section>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
    name: 'RecentlyViewed',
    components: { ProductCard },
    props: {
        products: {
            type: Array,
            default: () => []
        }
    },
    emits: ['view-details', 'buy']
}
</script>
