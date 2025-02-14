<template>
    <aside class="products-filter-sidebar">
        <filter-section
            v-model="selectedShops"
            title="Продавець"
            :items="shops"
            :class="shopsClasses"
            :disabled="disabled"
        />
        <filter-section
            v-model="selectedBrands"
            title="Бренд"
            :items="brands"
            :class="brandsClasses"
            :disabled="disabled"
        />
    </aside>
</template>

<script>
import FilterSection from '@/components/tasks/task_5/products/filters/FilterSection.vue'
import { getUniqueShops, getUniqueBrands } from '@/components/tasks/task_5/data/productCards'

export default {
    name: 'ProductsFilters',
    components: { FilterSection },
    props: {
        productsData: {
            type: Array,
            required: true,
        },
        shopsModifiers: {
            type: Object,
            default: () => ({}),
        },
        brandsModifiers: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:shops', 'update:brands'],
    data() {
        return {
            selectedShops: [],
            selectedBrands: [],
        }
    },
    computed: {
        shops() {
            return getUniqueShops(this.productsData)
        },
        brands() {
            return getUniqueBrands(this.productsData)
        },
        shopsClasses() {
            return {
                'filter-section-highlight': this.shopsModifiers.check && !this.selectedShops.length,
            }
        },
        brandsClasses() {
            return {
                'filter-section-highlight': this.brandsModifiers.check && !this.selectedBrands.length,
            }
        },
    },
    watch: {
        selectedShops(val) {
            this.$emit('update:shops', val)
        },
        selectedBrands(val) {
            this.$emit('update:brands', val)
        },
    },
}
</script>

<style scoped>
.products-filter-sidebar {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.filter-section {
    min-height: 100px;
    transition: all 0.3s ease;
    outline: 3px solid transparent;
    outline-offset: 0;
    padding: 12px;
    margin: 15px 0; 
}

.filter-section-highlight {
    border-radius: 5px;
    outline-color: green;
    outline-offset: 3px;
}
</style>
