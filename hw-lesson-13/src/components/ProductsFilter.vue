<template>
  <base-card class="filters">
    <div class="filter-group">
      <label for="price-range">Ціновий діапазон:</label>
      <div class="price-inputs">
        <input 
          type="number" 
          id="min-price" 
          v-model="localFilters.minPrice" 
          placeholder="Від"
        >
        <span>-</span>
        <input 
          type="number" 
          id="max-price" 
          v-model="localFilters.maxPrice" 
          placeholder="До"
        >
      </div>
    </div>
    
    <div class="filter-group">
      <label for="search-input">Пошук товарів:</label>
      <div class="search-input-container">
        <input
          type="text"
          id="search-input"
          v-model="localFilters.searchTerm"
          placeholder="Введіть назву товару"
        >
      </div>
    </div>
    
    <div class="filter-actions">
      <base-button @click="handleApplyFilters">Застосувати фільтри</base-button>
      <base-button variant="secondary" @click="handleResetFilters">Скинути фільтри</base-button>
    </div>
  </base-card>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';

export default {
  name: 'ProductsFilter',
  components: {
    BaseButton,
    BaseCard
  },
  props: {
    filters: {
      type: Object,
      default: () => ({
        minPrice: null,
        maxPrice: null,
        searchTerm: ''
      })
    }
  },
  data() {
    return {
      localFilters: this.getInitialFilters()
    }
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.updateLocalFilters(newFilters);
      },
      deep: true
    }
  },
  methods: {
    getInitialFilters() {
      return { ...this.filters };
    },
    
    updateLocalFilters(newFilters) {
      this.localFilters = { ...newFilters };
    },
    
    handleApplyFilters() {
      this.$emit('apply-filters', { ...this.localFilters });
    },
    
    handleResetFilters() {
      this.localFilters = {
        minPrice: null,
        maxPrice: null,
        searchTerm: ''
      };
      this.$emit('reset-filters');
    }
  }
}
</script>

<style scoped>
.filters {
  margin-bottom: 30px;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-inputs input {
  width: 120px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-input-container {
  width: 100%;
}

.search-input-container input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.filter-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}
</style>
