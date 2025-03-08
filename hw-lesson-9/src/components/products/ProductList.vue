<template>
  <div class="product-list">
    <div class="product-list-header">
      <h2>{{ getCurrentCategoryName }} - Товари</h2>
      <button 
        class="add-button"
        @click="navigateToAddProduct"
      >
        Додати новий товар
      </button>
    </div>

    <div v-if="getProducts.length === 0" class="no-products">
      У цій категорії ще немає товарів.
    </div>
    <div v-else class="products-grid">
      <product-card 
        v-for="product in getProducts" 
        :key="product.id" 
        :product="product" 
        @delete="deleteProduct" 
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/products/ProductCard.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'product-list',
  components: { ProductCard },
  
  computed: {
    ...mapGetters('products', ['getProducts']),
    ...mapGetters('categories', ['getCurrentCategoryName']),
  },
  
  methods: {
    ...mapActions('products', ['deleteProduct']),
    
    navigateToAddProduct() {
      this.$router.push({
        name: 'ProductForm',
        query: { categoryId: this.$route.params.categoryId }
      });
    }
  }
};
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.product-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.add-button:hover {
  background-color: #45a049;
}

.no-products {
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: 20px 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>
