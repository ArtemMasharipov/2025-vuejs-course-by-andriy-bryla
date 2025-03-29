<template>
  <div class="products-selector">
    <page-title title="Підбір товарів" />
    
    <div class="back-link">
      <router-link :to="{ name: 'Products' }">&larr; Назад до продуктів</router-link>
    </div>
    
    <products-filter 
      :filters="currentFilters" 
      @apply-filters="applyFilters"
      @reset-filters="resetFilteredProducts"
    />
    
    <div class="results">
      <h3>Результати підбору</h3>
      <loading-spinner v-if="isLoading" />
      <template v-else>
        <div v-if="hasProducts" class="products-grid">
          <product-card 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product"
          >
          </product-card>
        </div>
        <div v-if="showNoResultsMessage" class="no-results">
          Товарів за вашими критеріями не знайдено
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/base/LoadingSpinner.vue';
import PageTitle from '@/components/base/PageTitle.vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductsFilter from '@/components/ProductsFilter.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsSelectorPage',
  components: {
    LoadingSpinner,
    PageTitle,
    ProductCard,
    ProductsFilter
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      filteredProducts: 'products/filteredProducts',
      currentFilters: 'products/currentFilters',
      filtersApplied: 'products/filtersApplied'
    }),
    
    hasProducts() {
      return this.filteredProducts.length > 0;
    },
    
    showNoResultsMessage() {
      return this.filtersApplied && this.filteredProducts.length === 0;
    }
  },
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      applyFilters: 'products/applyFilters',
      resetFilteredProducts: 'products/resetFilteredProducts'
    }),
    
    initializeProducts() {
      this.fetchProducts().then(() => {
        this.resetFilteredProducts();
      });
    }
  },
  created() {
    this.initializeProducts();
  }
}
</script>

<style scoped>
.products-selector {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.results h3 {
  margin-bottom: 20px;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.no-results {
  text-align: center;
  padding: 30px;
  font-size: 18px;
  color: #999;
}

.back-link {
  margin-bottom: 20px;
  text-align: left;
}

.back-link a {
  color: #4CAF50;
  text-decoration: none;
  display: inline-block;
}

.back-link a:hover {
  text-decoration: underline;
}
</style>
