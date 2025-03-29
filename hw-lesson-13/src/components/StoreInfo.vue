<template>
  <footer v-if="shouldShowFooter" class="store-info">
    <div class="container">
      <template v-if="isHomePage">
        <div class="footer-row">
          <div>Рейтинг магазину: {{ storeRating }}</div>
          <div>Власник: {{ storeOwner }}</div>
        </div>
      </template>
      
      <template v-else-if="isProductsPage">
        <div class="footer-row">
          <div>Рейтинг магазину: {{ storeRating }}</div>
          <div>Статус: <span class="status">{{ storeStatus }}</span></div>
        </div>
      </template>
      
      <template v-else-if="isSuppliersPage">
        <div class="footer-row">
          <div>Найбільш популярний: {{ mostPopularName }}</div>
          <div>Статус: <span class="status">{{ storeStatus }}</span></div>
        </div>
      </template>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StoreInfo',
  computed: {
    ...mapGetters([
      'storeRating',
      'storeStatus',
      'storeOwner'
    ]), 
    ...mapGetters('suppliers', [
      'mostPopularName'
    ]),
    
    isHomePage() {
      return this.$route.name === 'Home';
    },
    
    isProductsPage() {
      return this.$route.path.includes('/products');
    },
    
    isSuppliersPage() {
      return this.$route.name === 'Suppliers';
    },
    
    shouldShowFooter() {
      const excludedRoutes = ['Contacts', 'ShoppingRules', 'ProductsSelector', 'ProductsEditor'];
      return !excludedRoutes.includes(this.$route.name);
    }
  }
}
</script>

<style scoped>
.store-info {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-background-light);
  padding: var(--space-md) 0;
  border-top: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  z-index: 100;
}

.footer-row {
  display: flex;
  justify-content: space-between;
}

.status {
  color: var(--color-primary);
  font-weight: bold;
}
</style>
