<template>
  <base-product-item 
    :item="product" 
    layout="vertical"
    card-class="product-card"
  >
    <template v-slot:actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-can="'add:to:cart'"
          color="primary"
          @click="handleAddToCart"
          :loading="loading"
          :disabled="inCart"
          block
        >
          <span v-if="inCart">{{ $t('cart.viewCart') }}</span>
          <span v-else>{{ $t('products.addToCart') }}</span>
        </v-btn>
      </v-card-actions>
    </template>
  </base-product-item>
</template>

<script>
import BaseProductItem from '@/components/common/BaseProductItem.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductCard',
  components: {
    BaseProductItem
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters('cart', ['isInCart']),
    ...mapGetters('auth', ['isAuthenticated']),
    inCart() {
      return this.isInCart(this.product.id);
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    async handleAddToCart() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      this.loading = true;
      try {
        await this.addToCart({ 
          product: this.product,
          quantity: 1
        });
      } catch (error) {
        console.error('Error adding product to cart:', error);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>