<template>
  <div class="suppliers-page">
    <page-title title="Оберіть постачальника" />
    
    <loading-spinner v-if="isLoading" />
    
    <div v-else class="suppliers-list">
      <product-card 
        v-for="supplier in allSuppliers" 
        :key="supplier.id"
        :product="supplier"
        class="supplier-card"
      >
        <template v-if="supplier.popular" #badge>
          <div class="popular-badge">Популярний</div>
        </template>
        
        <template #title>
          <h3>{{ supplier.name }}</h3>
        </template>
        
        <template #price>
          <p class="price">Рейтинг: {{ supplier.rating }}/5</p>
        </template>
      </product-card>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import LoadingSpinner from '@/components/base/LoadingSpinner.vue';
import PageTitle from '@/components/base/PageTitle.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SuppliersPage',
  components: {
    ProductCard,
    PageTitle,
    LoadingSpinner
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('suppliers', ['allSuppliers'])
  },
  methods: {
    ...mapActions('suppliers', ['fetchSuppliers'])
  },
  created() {
    this.fetchSuppliers();
  }
}
</script>

<style scoped>
.suppliers-page {
  text-align: center;
}

.suppliers-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.supplier-card {
  position: relative;
}

.popular-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #FF9800;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
