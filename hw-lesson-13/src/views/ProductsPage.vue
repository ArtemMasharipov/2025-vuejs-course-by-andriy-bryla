<template>
  <div class="products-page">
    <page-title title="Оберіть продукти" />
    
    <div class="products-actions">
      <router-link :to="{ name: 'ProductsSelector' }" class="action-link">
        Підбір товарів
      </router-link>
      <router-link :to="{ name: 'ProductsEditor' }" class="action-link">
        Редагування товарів
      </router-link>
    </div>
    
    <router-view v-if="!isExactProductsRoute"></router-view>
    
    <template v-else>
      <loading-spinner v-if="isLoading" />
      <div v-else class="products-grid">
        <product-card 
          v-for="product in allProducts" 
          :key="product.id" 
          :product="product"
        >
        </product-card>
      </div>
    </template>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import LoadingSpinner from '@/components/base/LoadingSpinner.vue';
import PageTitle from '@/components/base/PageTitle.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsPage',
  components: {
    ProductCard,
    LoadingSpinner,
    PageTitle
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('products', ['allProducts']),
    
    isExactProductsRoute() {
      return this.$route.path === '/products';
    }
  },
  methods: {
    ...mapActions('products', ['fetchProducts'])
  },
  created() {
    this.fetchProducts();
  }
}
</script>

<style scoped>
.products-page {
  text-align: center;
}

.products-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.products-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.action-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.action-link:hover {
  background-color: #45a049;
}
</style>
