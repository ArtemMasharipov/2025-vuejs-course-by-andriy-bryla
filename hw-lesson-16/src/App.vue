<template>
  <v-app>
    <Navbar />
    
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import firebaseService from '@/services/firebase';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar
  },
  
  data() {
    return {};
  },
  
  computed: {
    ...mapGetters({
      rbacConfig: 'auth/rbacConfig',
      user: 'auth/user'
    })
  },
  
  created() {
    this.loadRbacSystem();
    this.initializeCart();
  },
  
  methods: {
    ...mapActions('auth', ['saveUserData', 'loadRbacConfig', 'setUserRole', 'setRbacConfig']),
    ...mapActions('cart', ['loadCartFromFirestore']),
    
    async loadRbacSystem() {
      try {
        const config = await this.loadRbacConfig().catch(error => {
          return firebaseService.getDefaultRbacConfig();
        });
        
        if (!this.rbacConfig && config) {
          this.setRbacConfig(config);
        }
      } catch (error) {
      }
    },
    
    async initializeCart() {
      await this.loadCartFromFirestore();
      
      this.$watch('user', (newUser) => {
        if (newUser) {
          this.loadCartFromFirestore();
        }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
