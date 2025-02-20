<template>
    <div class="selector">
        <label>Модель:</label>
        <select v-model="selectedModel" :disabled="!filters.brand">
            <option value="">Оберіть модель</option>
            <option v-for="model in availableModels" :key="model" :value="model">
                {{ model }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ModelSelector',
    computed: {
        ...mapGetters('carsShop', ['availableModels', 'filters']),
        selectedModel: {
            get() {
                return this.filters.model
            },
            set(value) {
                this.updateFilters({ model: value })
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
