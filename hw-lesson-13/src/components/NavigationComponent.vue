<template>
  <nav class="navigation">
    <div class="container">
      <router-link 
        v-for="route in navigationRoutes" 
        :key="route.name" 
        :to="{ name: route.name }" 
        :class="{ active: isRouteActive(route.name) }"
      >
        {{ route.title }}
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationComponent',
  data() {
    return {
      navigationRoutes: [
        { name: 'Home', title: 'Головна' },
        { name: 'Products', title: 'Продукти' },
        { name: 'Suppliers', title: 'Постачальники' },
        { name: 'Contacts', title: 'Контакти' },
        { name: 'ShoppingRules', title: 'Правила купівлі' }
      ]
    }
  },
  methods: {
    isRouteActive(routeName) {
      return this.$route.name === routeName;
    }
  }
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-background-lighter);
  padding: var(--space-md) 0;
  box-shadow: var(--shadow-sm);
  z-index: 100;
}

.navigation a {
  color: var(--color-text-primary);
  text-decoration: none;
  margin-right: var(--space-lg);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
  position: relative;
}

.navigation a:hover {
  background-color: var(--color-border);
}

.navigation a.active {
  background-color: var(--color-primary);
  color: white;
  font-weight: bold;
  box-shadow: var(--shadow-sm);
}

.navigation a.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--color-primary);
}
</style>
