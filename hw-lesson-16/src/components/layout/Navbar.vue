<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>{{ $t('app.title') }}</v-app-bar-title>
    <v-spacer></v-spacer>
    <div class="d-none d-sm-flex">
      <v-btn :to="{ name: 'home' }" variant="text">
        {{ $t('nav.home') }}
      </v-btn>
      <v-btn :to="{ name: 'products' }" variant="text" v-can="'read:products'">
        {{ $t('nav.products') }}
      </v-btn>
      <v-btn :to="{ name: 'about' }" variant="text">
        {{ $t('nav.about') }}
      </v-btn>
      <v-btn :to="{ name: 'contacts' }" variant="text">
        {{ $t('nav.contacts') }}
      </v-btn>
      <v-btn v-can="{ requireAdmin: true }" :to="{ name: 'admin' }" variant="text">
        {{ $t('nav.admin') }}
      </v-btn>
    </div>
    <language-switcher class="mx-2"></language-switcher>
    <v-btn v-can="'add:to:cart'" :to="{ name: 'cart' }" icon class="mx-2">
      <v-badge :content="cartCount" :value="cartCount" color="red" overlap>
        <v-icon>fas fa-shopping-cart</v-icon>
      </v-badge>
    </v-btn>
    <div v-if="!isAuthenticated">
      <v-btn :to="{ name: 'login' }" color="accent">
        {{ $t('auth.login') }}
      </v-btn>
    </div>
    <div v-else class="d-flex align-center">
      <span class="mx-2 d-none d-md-block">
        {{ user?.email }} 
        <v-chip size="small" class="ml-1" :color="isAdmin ? 'red' : 'green'">
          {{ userRole }}
        </v-chip>
      </span>
      <v-btn @click="handleLogout" color="error" variant="text">
        {{ $t('auth.logout') }}
      </v-btn>
    </div>
    <v-app-bar-nav-icon class="d-flex d-sm-none" @click="toggleDrawer"></v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item :to="{ name: 'home' }">
        <template v-slot:default>
          <v-list-item-title>{{ $t('nav.home') }}</v-list-item-title>
        </template>
      </v-list-item>
      <v-list-item v-can="'read:products'" :to="{ name: 'products' }">
        <template v-slot:default>
          <v-list-item-title>{{ $t('nav.products') }}</v-list-item-title>
        </template>
      </v-list-item>
      <v-list-item v-can="'add:to:cart'" :to="{ name: 'cart' }">
        <template v-slot:default>
          <v-list-item-title>{{ $t('nav.cart') }}</v-list-item-title>
        </template>
      </v-list-item>
      <v-list-item :to="{ name: 'about' }">
        <template v-slot:default>
          <v-list-item-title>{{ $t('nav.about') }}</v-list-item-title>
        </template>
      </v-list-item>
      <v-list-item :to="{ name: 'contacts' }">
        <template v-slot:default>
          <v-list-item-title>{{ $t('nav.contacts') }}</v-list-item-title>
        </template>
      </v-list-item>
      <v-list-item v-can="{ requireAdmin: true }" :to="{ name: 'admin' }">
        <template v-slot:default>
          <v-list-item-title>{{ $t('nav.admin') }}</v-list-item-title>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Navbar',
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      user: 'auth/user',
      userRole: 'auth/userRole',
      hasPermission: 'auth/hasPermission',
      isAdmin: 'auth/isAdmin',
      cartCount: 'cart/cartCount',
      cartItems: 'cart/cartItems'
    })
  },
  methods: {
    ...mapActions('auth', ['logout']),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    closeDrawer() {
      this.drawer = false;
    },
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'home' });
    }
  }
};
</script>
<style scoped>
.v-app-bar-title {
  overflow: visible;
}
</style>