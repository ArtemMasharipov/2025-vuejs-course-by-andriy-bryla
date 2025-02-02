<template>
  <div class="laptop-shop">
    <laptop-shop-navbar 
      :current-view="currentView"
      :items-count="cartItemsCount"
      @change-view="changeView"
    />
    <keep-alive>
      <component 
        :is="currentView"
        :cart-items="cartItems"
        :total-price="totalPrice"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @update-quantity="updateQuantity"
        @clear-cart="clearCart"
        @checkout="checkout"
      />
    </keep-alive>
    <toast-notification 
      :show="showToast"
      :message="toastMessage"
      :type="toastType"
    />
  </div>
</template>

<script>
import { storage } from '@/services/storage'
import LaptopShopNavbar from '@/components/LaptopShop/LaptopShopNavbar.vue'
import LaptopList from '@/components/LaptopShop/LaptopList.vue'
import ShoppingCart from '@/components/LaptopShop/ShoppingCart.vue'
import ToastNotification from '@/components/common/ToastNotification.vue'

export default {
  name: 'LaptopShop',
  components: {
    LaptopShopNavbar,
    LaptopList,
    ShoppingCart,
    ToastNotification
  },
  data() {
    return {
      currentView: 'laptop-list',
      cartItems: storage.getCart(),
      totalPrice: 0,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      toastTimeout: null
    }
  },
  computed: {
    cartItemsCount() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  watch: {
    cartItems: {
      handler(newItems) {
        storage.saveCart(newItems)
        this.updateTotalPrice()
      },
      deep: true
    }
  },
  methods: {
    changeView(view) {
      this.currentView = view
    },
    addToCart(laptop) {
      const existingItem = this.cartItems.find(item => item.id === laptop.id)
      if (existingItem) {
        existingItem.quantity++
        this.showNotification(`Додано ще один ${laptop.name}`)
      } else {
        this.cartItems.push({ ...laptop, quantity: 1 })
        this.showNotification(`${laptop.name} додано до кошика`)
      }
      this.updateTotalPrice()
    },
    removeFromCart(itemId) {
      const item = this.cartItems.find(item => item.id === itemId)
      if (item) {
        this.showNotification(`${item.name} видалено з кошика`, 'info')
      }
      this.cartItems = this.cartItems.filter(item => item.id !== itemId)
      this.updateTotalPrice()
    },
    updateQuantity(itemId, quantity) {
      const item = this.cartItems.find(item => item.id === itemId)
      if (item) {
        item.quantity = quantity
        this.updateTotalPrice()
      }
    },
    clearCart() {
      this.cartItems = []
      storage.clearCart()
      this.updateTotalPrice()
      this.showNotification('Кошик очищено', 'info')
    },
    updateTotalPrice() {
      this.totalPrice = this.cartItems.reduce((sum, item) => 
        sum + item.currentPrice * item.quantity, 0)
    },
    checkout() {
      alert('Замовлення оформлено!')
      this.clearCart()
    },
    showNotification(message, type = 'success') {
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout)
      }
      this.toastMessage = message
      this.toastType = type
      this.showToast = true
      this.toastTimeout = setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.laptop-shop {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 0 20px 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.laptop-shop > :deep(.component-wrapper) {
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
}

@media (max-width: 768px) {
  .laptop-shop {
    padding: 0 10px 10px;
    width: 100%;
  }
}
</style>
