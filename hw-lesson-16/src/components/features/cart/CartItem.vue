<template>
  <base-product-item 
    :item="itemWithLocalQuantity" 
    layout="horizontal" 
    card-class="cart-item mb-4"
  >
    <template v-slot:price>
      <div class="d-flex align-center">
        <span class="text-subtitle-1 font-weight-bold">{{ formatPrice(item.price) }}</span>
        <span class="text-caption ms-1">× {{ localQuantity }}</span>
        <span class="text-subtitle-1 font-weight-bold ms-2">= {{ formatPrice(item.price * localQuantity) }}</span>
      </div>
    </template>
    
    <template v-slot:actions>
      <div class="ms-3">
        <div class="d-flex align-center mb-2">
          <v-btn 
            icon 
            size="small" 
            density="comfortable"
            @click="decreaseQuantity"
            :disabled="localQuantity <= 1 || isUpdating"
          >
            <v-icon>fas fa-minus</v-icon>
          </v-btn>
          
          <span class="mx-2">{{ localQuantity }}</span>
          
          <v-btn 
            icon 
            size="small" 
            density="comfortable"
            @click="increaseQuantity"
            :disabled="localQuantity >= 99 || isUpdating"
          >
            <v-icon>fas fa-plus</v-icon>
          </v-btn>
        </div>
        
        <v-btn 
          icon 
          color="error" 
          size="small"
          @click="handleRemove"
          :disabled="isUpdating"
        >
          <v-icon>fas fa-trash</v-icon>
        </v-btn>
      </div>
    </template>
  </base-product-item>
</template>

<script>
import BaseProductItem from '@/components/common/BaseProductItem.vue';
import { formatPrice } from '@/services/utils/formatters';
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  
  components: {
    BaseProductItem
  },
  
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      localQuantity: this.item.quantity,
      isUpdating: false,
      updateTimeout: null
    };
  },

  watch: {
    'item.quantity': {
      handler(newValue) {
        if (newValue !== this.localQuantity) {
          this.localQuantity = newValue;
        }
      },
      immediate: true
    }
  },
  
  computed: {
    subtotal() {
      return this.item.price * this.localQuantity;
    },
    itemWithLocalQuantity() {
      return {
        ...this.item,
        quantity: this.localQuantity
      };
    }
  },
  
  methods: {
    ...mapActions('cart', [
      'updateQuantity',
      'removeFromCart'
    ]),
    
    formatPrice(price) {
      return formatPrice(price);
    },
    
    decreaseQuantity() {
      if (this.localQuantity > 1 && !this.isUpdating) {
        this.updateQuantityWithDebounce(this.localQuantity - 1);
      }
    },
    
    increaseQuantity() {
      if (this.localQuantity < 99 && !this.isUpdating) {
        this.updateQuantityWithDebounce(this.localQuantity + 1);
      }
    },
    
    updateQuantityWithDebounce(newQuantity) {
      this.localQuantity = newQuantity;
      
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      
      this.isUpdating = true;
      
      this.updateTimeout = setTimeout(async () => {
        try {
          await this.$store.dispatch('cart/updateQuantityOptimistic', {
            productId: this.item.productId,
            quantity: newQuantity
          });
        } catch (error) {
          this.localQuantity = this.item.quantity;
          console.error('Failed to update quantity:', error);
        } finally {
          this.isUpdating = false;
        }
      }, 500);
    },
    
    handleQuantityChange() {
      const quantity = parseInt(this.localQuantity);
      if (isNaN(quantity) || quantity < 1) {
        this.updateQuantityWithDebounce(1);
      } else if (quantity > 99) {
        this.updateQuantityWithDebounce(99);
      }
    },
    
    handleRemove() {
      if (!this.isUpdating) {
        this.removeFromCart(this.item.productId);
      }
    }
  }
};
</script>

<style scoped>
.cart-item:hover {
  background-color: #f5f5f5;
}
</style>