<template>
  <div class="product-list">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-4">{{ $t('products.title') }}</h1>
      </v-col>
    </v-row>

    <div v-if="loading" class="d-flex justify-center my-5">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>

    <v-row v-else>
      <v-col cols="12" sm="3">
        <product-filters
          @name-filter-changed="applyNameFilter"
          @price-filter-changed="applyPriceFilter"
        />
      </v-col>

      <v-col cols="12" sm="9">
        <v-row v-if="!filteredProducts.length">
          <v-col cols="12" class="text-center">
            <p class="text-h5">{{ $t('products.noProducts') }}</p>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col 
            v-for="product in filteredProducts" 
            :key="product.id"
            cols="12" 
            sm="6" 
            md="4"
            class="mb-4"
          >
            <product-card :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { formatCurrency } from '@/services/utils/formatters';
import { mapActions, mapGetters } from 'vuex';
import ProductCard from './ProductCard.vue';
import ProductFilters from './ProductFilters.vue';

export default {
  name: 'ProductList',
  
  components: {
    ProductCard,
    ProductFilters
  },
  
  data() {
    return {
      nameFilter: '',
      priceFilter: {
        min: null,
        max: null
      }
    };
  },
  
  computed: {
    ...mapGetters({
      products: 'products/products',
      loading: 'products/loading',
      error: 'products/error'
    }),
    
    filteredProducts() {
      let result = [...this.products];
      
      if (this.nameFilter) {
        const nameQuery = this.nameFilter.toLowerCase();
        result = result.filter(product => 
          product.title && product.title.toLowerCase().includes(nameQuery)
        );
      }
      
      if (this.priceFilter.min !== null) {
        result = result.filter(product => {
          const price = parseFloat(product.price) || 0;
          return price >= this.priceFilter.min;
        });
      }
      
      if (this.priceFilter.max !== null) {
        result = result.filter(product => {
          const price = parseFloat(product.price) || 0;
          return price <= this.priceFilter.max;
        });
      }
      
      return result;
    }
  },
  
  created() {
    this.fetchProducts();
  },
  
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts'
    }),
    
    formatPrice(price) {
      return formatCurrency(price, this.$i18n.locale);
    },
    
    applyNameFilter(name) {
      this.nameFilter = name;
    },
    
    applyPriceFilter(priceRange) {
      this.priceFilter = priceRange;
    }
  }
};
</script>

<style scoped>
.product-list {
  padding: 20px 0;
}
</style>