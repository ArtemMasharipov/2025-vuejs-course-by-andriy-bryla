<template>
  <v-container>
    <h1 class="text-h3 mb-6">{{ $t('admin.title') }}</h1>

    <products-management-view />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductsManagementView from './ProductsManagementView.vue';

export default {
  name: 'AdminView',
  components: {
    ProductsManagementView
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      userRole: 'auth/userRole'
    }),

    isAdmin() {
      return this.userRole === 'admin';
    }
  },

  created() {
    if (!this.isAuthenticated || !this.isAdmin) {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.admin-view {
  padding-top: 20px;
  padding-bottom: 40px;
}
</style>