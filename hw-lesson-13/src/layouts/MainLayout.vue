<template>
  <div class="app-layout">
    <header class="app-header">
      <slot name="header">
        <navigation-component />
      </slot>
    </header>
    
    <div class="main-content-area">
      <div class="container">
        <div class="content-wrapper">
          <main class="main-content">
            <slot></slot>
          </main>
        </div>
      </div>
    </div>
    
    <footer class="app-footer" v-if="showDefaultFooter || $slots.footer">
      <div class="container">
        <slot name="footer">
          <store-info />
        </slot>
      </div>
    </footer>
  </div>
</template>

<script>
import NavigationComponent from '@/components/NavigationComponent.vue';
import StoreInfo from '@/components/StoreInfo.vue';

export default {
  name: 'MainLayout',
  components: {
    NavigationComponent,
    StoreInfo
  },
  props: {
    showDefaultFooter: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.main-content-area {
  flex: 1;
  padding: var(--space-lg) 0;
  margin-top: 60px;
}

.content-wrapper {
  display: flex;
  gap: var(--space-xl);
}

.main-content {
  flex: 1;
}

.app-footer {
  margin-top: auto;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }
}
</style>
