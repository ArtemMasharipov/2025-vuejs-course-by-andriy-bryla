<template>
  <component :is="currentLayout">
    <router-view #default="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>

<script>
export default {
  name: 'App',
  computed: {
    currentLayout() {
      return this.determineLayout(this.$route);
    }
  },
  methods: {
    determineLayout(route) {
      const layout = route.meta.layout || 'main';
      return layout === 'empty' ? 'EmptyLayout' : 'MainLayout';
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
