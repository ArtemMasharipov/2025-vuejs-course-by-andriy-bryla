<template>
  <v-container>
    <product-list />
  </v-container>
</template>

<script>
import ProductList from '@/components/features/products/ProductList.vue';

export default {
  name: 'ProductsView',
  components: {
    ProductList
  }
};
</script>

<style scoped>
.products-view {
  padding: 20px 0;
}
</style>