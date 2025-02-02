<template>
  <div v-if="!loading" class="dark-container">
    <div class="product-grid">
      <product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
  <loading-spinner v-else />
</template>

<script>
import ProductCard from './ProductCard.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import { getProducts } from '../services/productService'

export default {
  name: 'ProductGrid',
  components: {
    ProductCard,
    LoadingSpinner
  },
  data() {
    return {
      products: [],
      loading: true
    }
  },
  async created() {
    try {
      this.products = await getProducts()
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.dark-container {
  background-color: #1a1a1a;
  padding: 15px;
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-grid {
  display: grid;
  gap: 15px;
  padding: 10px;
  justify-items: center;
  position: relative;
  min-height: 200px;
  width: 100%;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
}
</style>
