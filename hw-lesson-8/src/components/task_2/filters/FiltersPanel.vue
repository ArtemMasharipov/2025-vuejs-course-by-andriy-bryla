<template>
    <div class="filters-panel">
        <div class="filters-header">
            <h3>Фільтри пошуку</h3>
            <button class="reset-button" @click="resetFilters" :disabled="!hasActiveFilters"
                :class="{ 'reset-button--disabled': !hasActiveFilters }">
                Скинути фільтри
            </button>
        </div>
        <div class="filters-content">
            <transport-type-selector />
            <car-body-type-selector />
            <div class="filters-row">
                <brand-selector />
                <model-selector />
            </div>
            <year-selector />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BrandSelector from './BrandSelector.vue'
import CarBodyTypeSelector from './CarBodyTypeSelector.vue'
import ModelSelector from './ModelSelector.vue'
import TransportTypeSelector from './TransportTypeSelector.vue'
import YearSelector from './YearSelector.vue'

export default {
    name: 'FiltersPanel',
    components: {
        TransportTypeSelector,
        CarBodyTypeSelector,
        BrandSelector,
        ModelSelector,
        YearSelector
    },
    computed: {
        ...mapGetters('carsShop', ['hasActiveFilters'])
    },
    methods: {
        ...mapActions('carsShop', ['resetFilters'])
    }
}
</script>

<style scoped>
.filters-panel {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.filters-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
}

.filters-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.filters-row {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.reset-button {
    padding: 8px 16px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.reset-button:hover {
    background: #ff2222;
}

.reset-button--disabled {
    background-color: #888;
    color: #eee;
    cursor: not-allowed;
}

.reset-button--disabled:hover {
    background-color: #888;
}

@media (max-width: 768px) {
    .filters-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
</style>
