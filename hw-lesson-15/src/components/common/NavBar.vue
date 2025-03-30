<template>
  <div>
    <v-app-bar color="primary" app dark>
      <v-app-bar-title>
        <router-link :to="{ name: 'home' }" class="text-white text-decoration-none">
          Bus Management System
        </router-link>
      </v-app-bar-title>
      
      <v-spacer></v-spacer>
      
      <template v-if="!isMobile">
        <v-btn 
          v-for="item in menuItems" 
          :key="item.name"
          :to="item.route"
          variant="text"
          :active="isActive(item.route)"
        >
          {{ item.name }}
        </v-btn>
      </template>
      
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    
    <v-navigation-drawer v-if="isMobile" v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.name" :to="item.route" link>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      drawer: false,
      menuItems: [
        { name: 'Home', route: { name: 'home' } },
        { name: 'Drivers', route: { name: 'drivers' } },
        { name: 'Buses', route: { name: 'buses' } },
        { name: 'Assignments', route: { name: 'assignments' } },
        { name: 'Contact Us', route: { name: 'contacts' } }
      ]
    }
  },
  computed: {
    isMobile() {
      // Add safety check for $vuetify
      return this.$vuetify && this.$vuetify.display ? this.$vuetify.display.mdAndDown : false;
    }
  },
  methods: {
    isActive(route) {
      return this.$route.name === route.name;
    }
  }
}
</script>

<style scoped>
</style>
