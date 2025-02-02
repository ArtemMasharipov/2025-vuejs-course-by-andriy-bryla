<template>
  <div class="shopping-cart-page">
    <h2>Кошик</h2>
    <div class="cart-items">
      <div v-if="cartItems.length === 0" class="empty-cart">
        Кошик порожній
      </div>
      <div v-for="item in cartItems" v-else :key="item.id" class="cart-item">
        <span>{{ item.name }}</span>
        <input 
          v-model.number="item.quantity" 
          type="number" 
          min="1"
          @change="$emit('update-quantity', item.id, item.quantity)" 
        />
        <span>{{ item.currentPrice }} ₴</span>
        <span>{{ item.currentPrice * item.quantity }} ₴</span>
        <button @click="$emit('remove-from-cart', item.id)">Видалити</button>
      </div>
    </div>
    <div v-if="cartItems.length > 0" class="cart-footer">
      <div class="cart-summary">
        <div class="total-label">Загальна сума:</div>
        <div class="total-price">{{ totalPrice }} ₴</div>
      </div>
      <div class="cart-actions">
        <button class="clear-cart-btn" @click="$emit('clear-cart')">
          <i class="fas fa-trash-alt"></i>
          Очистити кошик
        </button>
        <button class="checkout-btn" @click="$emit('checkout')">
          <i class="fas fa-check"></i>
          Оформити замовлення
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: {
    cartItems: {
      type: Array,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  emits: ['update-quantity', 'remove-from-cart', 'clear-cart', 'checkout']
}
</script>

<style scoped>
.shopping-cart-page {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.2rem;
}

.cart-footer {
  margin-top: auto;
  padding: 20px;
  border-top: 2px solid #eee;
  background: #f8f9fa;
  border-radius: 0 0 8px 8px;
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.total-label {
  font-size: 16px;
  color: #666;
}

.total-price {
  font-size: 24px;
  font-weight: 700;
  color: #28a745;
}

.cart-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.cart-items {
  flex-grow: 1;
  overflow-y: auto;
}

.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.cart-item input {
  width: 60px;
  padding: 5px;
  text-align: center;
}

.clear-cart-btn, .checkout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-cart-btn {
  background-color: #ffffff;
  color: #dc3545;
  border: 1px solid #dc3545;
}

.clear-cart-btn:hover {
  background-color: #dc3545;
  color: #ffffff;
}

.checkout-btn {
  background-color: #28a745;
  color: #ffffff;
}

.checkout-btn:hover {
  background-color: #218838;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .cart-footer {
    padding: 15px;
  }

  .cart-actions {
    flex-direction: column;
  }

  .clear-cart-btn, .checkout-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
