<template>
    <div class="category-selector">
        <category-item v-for="category in availableCategories" :key="category.id" :category="category"
            :is-active="selectedCategory === category.id" @select="onSelectCategory" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CategoryItem from './CategoryItem.vue';

export default {
    name: 'CategorySelector',
    components: {
        CategoryItem
    },
    computed: {
        ...mapGetters('productsCatalog', ['availableCategories', 'selectedCategory'])
    },
    methods: {
        ...mapActions('productsCatalog', ['selectCategory']),
        onSelectCategory(categoryId) {
            this.selectCategory(categoryId);
        }
    }
}
</script>

<style scoped>
.category-selector {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-bottom: 2rem;
}
</style>
