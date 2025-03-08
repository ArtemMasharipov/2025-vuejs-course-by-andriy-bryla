<template>
    <div class="shop-view">
        <category-tabs />
        <router-view />
    </div>
</template>

<script>
import CategoryTabs from '@/components/categories/CategoryTabs.vue';

export default {
    name: 'shop-view',
    components: { CategoryTabs },
};
</script>

<style scoped>
.shop-view {
    padding: 20px;
}
</style>
