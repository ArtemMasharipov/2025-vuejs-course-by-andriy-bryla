<template>
  <v-card class="product-filters">
    <v-card-title>{{ $t('products.filters') }}</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="productNameSearch"
        :label="$t('products.searchByName')"
        prepend-icon="fas fa-search"
        clearable
        hide-details
        class="mb-4"
      ></v-text-field>

      <v-divider class="my-4"></v-divider>
      
      <div class="text-subtitle-1 mb-2">{{ $t('products.filterByPrice') }}</div>
      
      <v-text-field
        v-model="minPrice"
        type="number"
        :label="$t('products.minPrice')"
        prepend-inner-icon="fas fa-tag"
        hide-details
        density="compact"
        class="mb-3"
        min="0"
        @input="emitPriceFilter"
      ></v-text-field>
      
      <v-text-field
        v-model="maxPrice"
        type="number"
        :label="$t('products.maxPrice')"
        prepend-inner-icon="fas fa-tags"
        hide-details
        density="compact"
        min="0"
        @input="emitPriceFilter"
      ></v-text-field>
      
      <v-btn
        color="primary"
        variant="text"
        block
        class="mt-4"
        @click="resetFilters"
      >
        {{ $t('products.resetFilters') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { debounce } from 'lodash';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductFilters',
  
  data() {
    return {
      productNameSearchInput: '',
      minPrice: '',
      maxPrice: '',
      maxPossiblePrice: 1000
    };
  },
  
  computed: {
    ...mapGetters({
      products: 'products/products'
    }),
    
    productNameSearch: {
      get() {
        return this.productNameSearchInput;
      },
      set(value) {
        this.productNameSearchInput = value;
        this.debouncedNameSearch(value);
      }
    }
  },
  
  created() {
    this.debouncedNameSearch = debounce(this.emitNameFilter, 500);
    
    this.calculatePriceRange();
  },
  
  methods: {
    calculatePriceRange() {
      if (!this.products || this.products.length === 0) {
        return;
      }
      
      const prices = this.products.map(product => parseFloat(product.price) || 0);
      const maxPrice = Math.max(...prices);
      
      this.maxPossiblePrice = Math.ceil(maxPrice * 1.2);
      
      this.minPrice = '';
      this.maxPrice = '';
    },
    
    formatPrice(price) {
      const currencySymbol = this.$t('products.currency');
      return new Intl.NumberFormat(this.$i18n.locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price) + ' ' + currencySymbol;
    },
    
    emitNameFilter(value) {
      this.$emit('name-filter-changed', value);
    },
    
    emitPriceFilter() {
      let min = this.minPrice !== '' ? parseFloat(this.minPrice) : null;
      let max = this.maxPrice !== '' ? parseFloat(this.maxPrice) : null;
      
      if (min !== null && max !== null && min > max) {
        const temp = this.minPrice;
        this.minPrice = this.maxPrice;
        this.maxPrice = temp;
        
        min = parseFloat(this.minPrice);
        max = parseFloat(this.maxPrice);
      }
      
      this.$emit('price-filter-changed', {
        min: min !== null && !isNaN(min) ? min : null,
        max: max !== null && !isNaN(max) ? max : null
      });
    },
    
    resetFilters() {
      this.productNameSearchInput = '';
      this.emitNameFilter('');
      
      this.minPrice = '';
      this.maxPrice = '';
      this.emitPriceFilter();
      
      this.$emit('reset-filters');
    }
  },
  
  watch: {
    products: {
      handler() {
        this.calculatePriceRange();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.product-filters {
  position: sticky;
  top: 80px;
}
</style>