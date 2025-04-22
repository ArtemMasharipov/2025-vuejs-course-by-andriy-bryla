<template>
  <v-card class="cart-summary">
    <v-card-title>{{ $t('cart.summary') }}</v-card-title>
    
    <v-card-text>
      <div class="d-flex justify-space-between mb-2">
        <span>{{ $t('cart.itemsCount') }}</span>
        <span class="font-weight-bold">{{ cartCount }}</span>
      </div>
      
      <div class="d-flex justify-space-between">
        <span class="text-h6">{{ $t('cart.total') }}</span>
        <span class="text-h6 font-weight-bold">{{ formatCurrency(cartTotal, this.$i18n.locale) }}</span>
      </div>
      
      <v-divider class="my-4"></v-divider>
      
      <v-btn 
        color="success" 
        block
        size="large"
        :disabled="!cartCount"
        @click="checkout"
      >
        {{ $t('cart.checkout') }}
      </v-btn>
      
      <v-btn 
        color="error" 
        variant="text"
        block
        class="mt-2"
        :disabled="!cartCount"
        @click="confirmClearCart"
      >
        {{ $t('cart.clear') }}
      </v-btn>
    </v-card-text>
    
    <v-dialog v-model="showClearCartDialog" max-width="400">
      <v-card>
        <v-card-title>{{ $t('cart.confirmClear') }}</v-card-title>
        <v-card-text>{{ $t('cart.clearConfirmMessage') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showClearCartDialog = false">
            {{ $t('common.cancel') }}
          </v-btn>
          <v-btn color="error" @click="clearCart">
            {{ $t('cart.clear') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { formatCurrency } from '@/services/utils/formatters';
import { showInfo } from '@/services/utils/toast';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartSummary',
  
  data() {
    return {
      showClearCartDialog: false
    };
  },
  
  computed: {
    ...mapGetters('cart', [
      'cartTotal',
      'cartCount',
      'cartItems'
    ]),
    
    isEmpty() {
      return this.cartItems.length === 0;
    }
  },
  
  methods: {
    ...mapActions('cart', ['clearCart']),
    
    confirmClearCart() {
      this.showClearCartDialog = true;
    },
    
    checkout() {
      showInfo(this.$t('cart.checkoutMessage'));
    }
  }
};
</script>

<style scoped>
.cart-summary {
  position: sticky;
  top: 80px;
}
</style>