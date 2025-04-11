<script setup>
import { useLoading } from '@/composables/useLoading';
import { computed, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';

const title = "Подарунки Миколая";
const drawer = ref(false);
const route = useRoute();
const { mdAndUp } = useDisplay();
const { isLoading, startLoading, stopLoading, withLoading } = useLoading();
const pageTitle = ref('');
const pageSubtitle = ref('');

const navItems = [
  { title: 'Головна', icon: 'mdi-home', to: '/' },
  { title: 'Друзі', icon: 'mdi-account-group', to: '/friends' },
  { title: 'Подарунки', icon: 'mdi-gift', to: '/gifts' },
  { title: 'Призначення', icon: 'mdi-gift-outline', to: '/assignments' },
  { title: 'Про додаток', icon: 'mdi-information', to: '/about' }
];

const showNavIcon = computed(() => !mdAndUp.value);

watch(() => route.path, () => {
  drawer.value = false;
});

const setPageTitle = (title, subtitle = '') => {
  pageTitle.value = title;
  pageSubtitle.value = subtitle;
};

provide('loading', {
  isLoading,
  startLoading,
  stopLoading,
  withLoading
});

provide('pageTitle', {
  title: pageTitle,
  subtitle: pageSubtitle,
  setPageTitle
});
</script>

<template>
  <div>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon v-if="showNavIcon" @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="me-4">{{ title }}</v-toolbar-title>
      
      <template v-if="mdAndUp">
        <v-btn
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          variant="text"
          color="white"
          class="mx-1">
          {{ item.title }}
        </v-btn>
      </template>
      
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          :title="title"
          prepend-icon="mdi-gift"
          class="text-h6">
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          :title="item.title"
          :prepend-icon="item.icon"
          color="primary">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <div class="master-page-layout">
      <div v-if="isLoading" class="loading-overlay">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate>
        </v-progress-circular>
      </div>
      
      <div v-show="!isLoading" class="page-content-wrapper">
        <div v-if="pageTitle" class="page-header">
          <h1 class="text-h4 mb-2">{{ pageTitle }}</h1>
          <p v-if="pageSubtitle" class="text-subtitle-1 text-medium-emphasis">
            {{ pageSubtitle }}
          </p>
          <v-divider class="my-4"></v-divider>
        </div>
        
        <div class="page-content">
          <slot></slot>
        </div>
      </div>
    </div>

    <v-footer app color="primary" class="text-center text-white">
      <span>© {{ new Date().getFullYear() }} Подарунки Миколая</span>
    </v-footer>
  </div>
</template>

<style scoped>
.master-page-layout {
  position: relative;
  width: 100%;
  min-height: 200px;
  padding-bottom: 24px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  border-radius: 8px;
}

.v-theme--dark .loading-overlay {
  background-color: rgba(30, 30, 30, 0.7);
}

.page-content-wrapper {
  width: 100%;
  height: 100%;
}

.page-header {
  margin-bottom: 24px;
}

@media (min-width: 960px) {
  .v-toolbar-title {
    margin-right: 16px;
  }
}
</style>