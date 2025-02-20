<template>
    <div class="selector">
        <label>Марка:</label>
        <select v-model="selectedBrand" :disabled="!filters.transportType">
            <option value="">Оберіть марку</option>
            <option v-for="brand in availableBrands" :key="brand" :value="brand">
                {{ brand }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'BrandSelector',
    computed: {
        ...mapGetters('carsShop', ['availableBrands', 'filters']),
        selectedBrand: {
            get() {
                return this.filters.brand
            },
            set(value) {
                this.updateFilters({ brand: value })
            }
        }
    },
    methods: {
        ...mapActions('carsShop', ['updateFilters'])
    }
}
</script>

<style scoped>
.selector {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

select:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

label {
    font-weight: 500;
    color: #666;
}
</style>
