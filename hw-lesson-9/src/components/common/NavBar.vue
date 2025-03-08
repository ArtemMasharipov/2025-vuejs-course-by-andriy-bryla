<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <div class="logo">
          <router-link to="/" class="logo-link">Electronics Shop</router-link>
        </div>
        <ul class="nav-links">
          <li>
            <router-link :to="{ name: 'Home' }">Головна</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Shop' }">Магазин</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'PaymentRules' }">Правила оплати</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Contacts' }">Контакти</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style scoped>
.header {
  background-color: var(--color-dark);
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  /* Ensure consistent width calculation */
  box-sizing: border-box;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
}

.logo-link {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  text-decoration: none;
}

.logo-link:hover {
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: var(--space-lg);
}

.nav-links a {
  color: var(--color-white);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  padding: var(--space-xs) 0;
  transition: color 0.2s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.3s;
}

.nav-links a:hover {
  color: var(--color-primary);
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.nav-links a.router-link-active {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    height: auto;
    padding: var(--space-sm) 0;
  }

  .logo {
    margin-bottom: var(--space-sm);
  }

  .nav-links {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-md);
  }
}
</style>
