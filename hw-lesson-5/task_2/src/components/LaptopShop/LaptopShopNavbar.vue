<template>
  <nav class="navbar">
    <div class="nav-brand">TechShop</div>
    <div class="nav-items">
      <button 
        class="nav-btn" 
        :class="{ active: currentView === 'laptop-list' }"
        @click="$emit('change-view', 'laptop-list')"
      >
        Магазин
      </button>
      <button 
        class="nav-btn cart-btn" 
        :class="{ active: currentView === 'shopping-cart' }"
        @click="$emit('change-view', 'shopping-cart')"
      >
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-text">Кошик</span>
        <span v-if="itemsCount" class="cart-badge">{{ itemsCount }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'LaptopShopNavbar',
  props: {
    currentView: {
      type: String,
      required: true
    },
    itemsCount: {
      type: Number,
      default: 0
    }
  },
  emits: ['change-view']
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 600;
  color: #28a745;
}

.nav-items {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  color: #666;
  transition: color 0.3s;
}

.nav-btn.active {
  color: #28a745;
  font-weight: 600;
}

.cart-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding: 8px 16px;
}

.cart-text {
  margin-left: 4px;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.nav-btn.active .fa-shopping-cart {
  color: #28a745;
}
</style>
