<template>
  <section class="category-section">
    <div class="section-header">
      <h2 class="section-title">Категорії товарів</h2>
    </div>
    <div class="category-tabs">
      <div 
        v-for="category in getCategories" 
        :key="category.id"
        :class="['category-tab', { 'active': category.id === getCurrentCategoryId }]"
        @click="selectCategory(category.id)"
      >
        <span class="category-icon">{{ category.itemImg }}</span>
        <span class="category-name">{{ category.name }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CategoryTabs',
  
  computed: {
    ...mapGetters('categories', ['getCategories', 'getCurrentCategoryId'])
  },
  
  methods: {
    ...mapActions('categories', ['setCurrentCategory']),
    
    selectCategory(categoryId) {
      this.$router.push({
        name: 'CategoryProducts', 
        params: { categoryId: String(categoryId) }
      });
    }
  }
};
</script>

<style scoped>
.category-section {
  margin-bottom: var(--space-xl);
  text-align: center;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  overflow-x: auto;
  padding-bottom: var(--space-sm);
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray) var(--color-light);
}

.category-tabs::-webkit-scrollbar {
  height: 6px;
}

.category-tabs::-webkit-scrollbar-track {
  background: var(--color-light);
  border-radius: 4px;
}

.category-tabs::-webkit-scrollbar-thumb {
  background-color: var(--color-gray);
  border-radius: 4px;
}

.category-tab {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-gray-light);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  background-color: var(--color-light);
}

.category-tab:hover {
  background-color: var(--color-gray-light);
}

.category-tab.active {
  background-color: var(--color-dark);
  color: var(--color-light);
  border-color: var(--color-dark);
}

.category-icon {
  margin-right: var(--space-xs);
  font-size: 1.2em;
}
</style>
